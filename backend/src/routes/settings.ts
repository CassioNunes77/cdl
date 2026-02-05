import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res) => {
  const rows = await prisma.siteSetting.findMany();
  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  res.json(settings);
});

router.get('/:key', async (req, res) => {
  const row = await prisma.siteSetting.findUnique({
    where: { key: req.params.key },
  });
  if (!row) {
    res.status(404).json({ error: 'Configuração não encontrada' });
    return;
  }
  res.json({ key: row.key, value: row.value });
});

router.put('/', authMiddleware, async (req, res) => {
  const body = req.body as Record<string, string>;
  for (const [key, value] of Object.entries(body)) {
    await prisma.siteSetting.upsert({
      where: { key },
      create: { key, value: String(value) },
      update: { value: String(value) },
    });
  }
  const rows = await prisma.siteSetting.findMany();
  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  res.json(settings);
});

export default router;
