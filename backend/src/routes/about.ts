import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET - Buscar informações sobre CDL Paulo Afonso (público)
router.get('/', async (req, res) => {
  const about = await prisma.about.findFirst({
    orderBy: { updatedAt: 'desc' },
  });
  if (!about) {
    res.json({ title: '', description: '', photo: null });
    return;
  }
  res.json(about);
});

// GET - Buscar por ID (admin)
router.get('/:id', authMiddleware, async (req, res) => {
  const about = await prisma.about.findUnique({
    where: { id: req.params.id },
  });
  if (!about) {
    res.status(404).json({ error: 'Registro não encontrado' });
    return;
  }
  res.json(about);
});

// POST - Criar novo registro (admin)
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, photo } = req.body;
  const about = await prisma.about.create({
    data: {
      title: title || '',
      description: description || '',
      photo: photo || null,
    },
  });
  res.status(201).json(about);
});

// PUT - Atualizar registro (admin) - atualiza o primeiro registro ou cria se não existir
router.put('/', authMiddleware, async (req, res) => {
  const { title, description, photo } = req.body;
  const existing = await prisma.about.findFirst({
    orderBy: { updatedAt: 'desc' },
  });

  if (existing) {
    const updated = await prisma.about.update({
      where: { id: existing.id },
      data: {
        title: title ?? existing.title,
        description: description ?? existing.description,
        photo: photo !== undefined ? photo : existing.photo,
      },
    });
    res.json(updated);
  } else {
    const created = await prisma.about.create({
      data: {
        title: title || '',
        description: description || '',
        photo: photo || null,
      },
    });
    res.status(201).json(created);
  }
});

// DELETE - Deletar registro (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  await prisma.about.delete({
    where: { id: req.params.id },
  });
  res.status(204).send();
});

export default router;
