import type { Request } from 'express';
import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';
import { optionalAuth } from '../middleware/optionalAuth.js';

const router = Router();

router.get('/', optionalAuth, async (req, res) => {
  const isAdmin = !!(req as Request & { user?: { userId: string } }).user;
  const services = await prisma.service.findMany({
    where: isAdmin ? undefined : { published: true },
    orderBy: { order: 'asc' },
  });
  res.json(services);
});

router.get('/by-id/:id', authMiddleware, async (req, res) => {
  const service = await prisma.service.findUnique({
    where: { id: req.params.id },
  });
  if (!service) {
    res.status(404).json({ error: 'Serviço não encontrado' });
    return;
  }
  res.json(service);
});

router.get('/:slug', async (req, res) => {
  const service = await prisma.service.findUnique({
    where: { slug: req.params.slug, published: true },
  });
  if (!service) {
    res.status(404).json({ error: 'Serviço não encontrado' });
    return;
  }
  res.json(service);
});

router.post('/', authMiddleware, async (req, res) => {
  const { title, slug, description, icon, order, published } = req.body;
  const service = await prisma.service.create({
    data: {
      title,
      slug,
      description,
      icon: icon ?? null,
      order: order ?? 0,
      published: published ?? true,
    },
  });
  res.status(201).json(service);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { title, slug, description, icon, order, published } = req.body;
  const service = await prisma.service.update({
    where: { id: req.params.id },
    data: { title, slug, description, icon, order, published },
  });
  res.json(service);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await prisma.service.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
