import type { Request } from 'express';
import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';
import { optionalAuth } from '../middleware/optionalAuth.js';

const router = Router();

router.get('/', optionalAuth, async (req, res) => {
  const isAdmin = !!(req as Request & { user?: { userId: string } }).user;
  const pages = await prisma.page.findMany({
    where: isAdmin ? undefined : { published: true },
    orderBy: { title: 'asc' },
  });
  res.json(pages);
});

router.get('/by-id/:id', authMiddleware, async (req, res) => {
  const page = await prisma.page.findUnique({
    where: { id: req.params.id },
  });
  if (!page) {
    res.status(404).json({ error: 'Página não encontrada' });
    return;
  }
  res.json(page);
});

router.get('/:slug', async (req, res) => {
  const page = await prisma.page.findUnique({
    where: { slug: req.params.slug, published: true },
  });
  if (!page) {
    res.status(404).json({ error: 'Página não encontrada' });
    return;
  }
  res.json(page);
});

router.post('/', authMiddleware, async (req, res) => {
  const { slug, title, content, excerpt, published } = req.body;
  const page = await prisma.page.create({
    data: { slug, title, content, excerpt: excerpt ?? null, published: published ?? true },
  });
  res.status(201).json(page);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { title, content, excerpt, published } = req.body;
  const page = await prisma.page.update({
    where: { id: req.params.id },
    data: { title, content, excerpt, published },
  });
  res.json(page);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await prisma.page.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
