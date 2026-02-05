# CDL Paulo Afonso - Site Institucional

Site da CDL Paulo Afonso com área administrativa gerenciável. Visual moderno, foco em resultado e comunidade local.

## Stack

- **Frontend:** Next.js 15 + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript
- **Banco:** PostgreSQL (Prisma ORM)

## Pré-requisitos

- Node.js 18+
- PostgreSQL
- npm ou yarn

## Configuração

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edite .env com DATABASE_URL, JWT_SECRET, etc.
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

A API roda em `http://localhost:4000`.

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local
# Opcional: NEXT_PUBLIC_API_URL=http://localhost:4000 (já é o padrão)
npm install
npm run dev
```

O site roda em `http://localhost:3000`.

### 3. Acesso admin

Após o seed, use:

- **Email:** admin@cdlpauloafonso.com.br  
- **Senha:** admin123  

Altere a senha em produção.

## Estrutura

- **Menu público:** Home, Institucional (Diretoria, Nossa Cidade), Serviços, Notícias, Atendimento, Área do Associado, Associe-se
- **Admin:** `/admin` — login em `/admin/login`. Gerenciamento de páginas, diretoria, serviços, notícias, mensagens de contato e configurações do site (hero, telefone, email, endereço).

## Deploy no Netlify

O frontend está configurado para deploy no Netlify via `netlify.toml`:

1. Conecte o repositório ao Netlify
2. O build usa automaticamente `base = "frontend"` (monorepo)
3. Configure a variável de ambiente **NEXT_PUBLIC_API_URL** com a URL da API em produção (ex: `https://sua-api.railway.app` ou Render)

O backend deve ser hospedado separadamente (Railway, Render, Fly.io, etc.) com PostgreSQL.

## Scripts

| Pasta     | Comando       | Descrição              |
|----------|---------------|------------------------|
| backend  | `npm run dev` | API em modo desenvolvimento |
| backend  | `npm run db:seed` | Cria usuário admin e dados iniciais |
| frontend | `npm run dev` | Site em desenvolvimento |
| frontend | `npm run build` | Build de produção       |

## Licença

Uso interno CDL Paulo Afonso.
