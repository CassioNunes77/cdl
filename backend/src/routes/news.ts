import type { Request } from 'express';
import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';
import { optionalAuth } from '../middleware/optionalAuth.js';

const router = Router();

router.get('/', optionalAuth, async (req, res) => {
  const isAdmin = !!(req as Request & { user?: { userId: string } }).user;
  const limit = Math.min(Number(req.query.limit) || 20, 50);
  const cursor = req.query.cursor as string | undefined;
  const items = await prisma.news.findMany({
    where: isAdmin ? undefined : { published: true },
    orderBy: { publishedAt: 'desc' },
    take: limit + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  });
  const hasMore = items.length > limit;
  const list = hasMore ? items.slice(0, limit) : items;
  const nextCursor = hasMore ? list[list.length - 1]?.id : null;
  res.json({ items: list, nextCursor });
});

router.get('/by-id/:id', authMiddleware, async (req, res) => {
  const news = await prisma.news.findUnique({
    where: { id: req.params.id },
  });
  if (!news) {
    res.status(404).json({ error: 'Notícia não encontrada' });
    return;
  }
  res.json(news);
});

router.get('/:slug', async (req, res) => {
  const news = await prisma.news.findUnique({
    where: { slug: req.params.slug, published: true },
  });
  if (!news) {
    res.status(404).json({ error: 'Notícia não encontrada' });
    return;
  }
  res.json(news);
});

router.post('/', authMiddleware, async (req, res) => {
  const { title, slug, excerpt, content, image, links, published, publishedAt } = req.body;
  const news = await prisma.news.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      image: image ?? null,
      links: links ? JSON.parse(JSON.stringify(links)) : null,
      published: published ?? true,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
    },
  });
  res.status(201).json(news);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { title, slug, excerpt, content, image, links, published, publishedAt } = req.body;
  const news = await prisma.news.update({
    where: { id: req.params.id },
    data: {
      title,
      slug,
      excerpt,
      content,
      image,
      links: links !== undefined ? (links ? JSON.parse(JSON.stringify(links)) : null) : undefined,
      published,
      publishedAt: publishedAt ? new Date(publishedAt) : undefined,
    },
  });
  res.json(news);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await prisma.news.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
