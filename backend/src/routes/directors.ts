import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res) => {
  const directors = await prisma.director.findMany({ orderBy: { order: 'asc' } });
  res.json(directors);
});

router.get('/:id', async (req, res) => {
  const director = await prisma.director.findUnique({
    where: { id: req.params.id },
  });
  if (!director) {
    res.status(404).json({ error: 'Não encontrado' });
    return;
  }
  res.json(director);
});

router.post('/', authMiddleware, async (req, res) => {
  const { name, role, photo, order, bio } = req.body;
  const director = await prisma.director.create({
    data: { name, role, photo: photo ?? null, order: order ?? 0, bio: bio ?? null },
  });
  res.status(201).json(director);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { name, role, photo, order, bio } = req.body;
  const director = await prisma.director.update({
    where: { id: req.params.id },
    data: { name, role, photo, order, bio },
  });
  res.json(director);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await prisma.director.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
