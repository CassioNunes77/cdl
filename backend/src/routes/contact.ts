import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Nome, email e mensagem são obrigatórios' });
    return;
  }
  const contact = await prisma.contactMessage.create({
    data: {
      name,
      email,
      phone: phone ?? null,
      subject: subject ?? null,
      message,
    },
  });
  res.status(201).json({ id: contact.id, message: 'Mensagem enviada com sucesso' });
});

router.get('/', authMiddleware, async (_req, res) => {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(messages);
});

router.patch('/:id/read', authMiddleware, async (req, res) => {
  const message = await prisma.contactMessage.update({
    where: { id: req.params.id },
    data: { read: true },
  });
  res.json(message);
});

export default router;
