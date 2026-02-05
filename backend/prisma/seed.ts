import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@cdlpauloafonso.com.br' },
    create: {
      email: 'admin@cdlpauloafonso.com.br',
      password: hashed,
      name: 'Administrador',
    },
    update: {},
  });

  const defaultPages = [
    {
      slug: 'diretoria',
      title: 'Diretoria',
      content: '<p>Conheça nossa diretoria.</p>',
      excerpt: 'Diretoria da CDL Paulo Afonso.',
      published: true,
    },
    {
      slug: 'nossa-cidade',
      title: 'Nossa Cidade',
      content: '<p>Paulo Afonso e o comércio local.</p>',
      excerpt: 'Nossa cidade e o panorama econômico.',
      published: true,
    },
    {
      slug: 'area-associado',
      title: 'Área do Associado',
      content: '<p>Benefícios e serviços para associados.</p>',
      excerpt: 'Área exclusiva do associado.',
      published: true,
    },
  ];

  for (const p of defaultPages) {
    await prisma.page.upsert({
      where: { slug: p.slug },
      create: p,
      update: { title: p.title, content: p.content, excerpt: p.excerpt },
    });
  }

  const defaultSettings = [
    { key: 'hero_title', value: 'A CDL que faz sua empresa vender mais, gastar menos e crescer mais rápido' },
    { key: 'hero_subtitle', value: 'Comunidade empresarial de Paulo Afonso. Serviços, networking e apoio ao comércio local.' },
    { key: 'phone', value: '(75) 3281-0000' },
    { key: 'email', value: 'contato@cdlpauloafonso.com.br' },
    { key: 'address', value: 'Paulo Afonso - BA' },
    { key: 'whatsapp_number', value: '' },
  ];

  for (const s of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      create: s,
      update: { value: s.value },
    });
  }

  console.log('Seed concluído.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
