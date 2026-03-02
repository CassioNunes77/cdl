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

### 3. Acesso admin (sem banco)

O admin funciona **sem backend** com credenciais locais:

- **Usuário:** `admin` ou `admin@cdlpauloafonso.com.br`
- **Senha:** `admin123`

Acesse `/admin/login`. O frontend está pronto; ao conectar o banco e a API, os dados serão carregados.

## Estrutura

- **Menu público:** Home, Institucional (Diretoria, Nossa Cidade), Serviços, Notícias, Atendimento, Área do Associado, Associe-se
- **Admin:** `/admin` — login em `/admin/login`. Gerenciamento de páginas, diretoria, serviços, notícias, mensagens de contato e configurações do site (hero, telefone, email, endereço).

## Deploy no Netlify

O site está pronto para abrir via Netlify. **Não é obrigatório configurar banco ou API agora** — o site funciona com conteúdo estático e mensagens amigáveis até a API estar disponível.

### Passo a passo

1. Acesse [netlify.com](https://www.netlify.com) e faça login
2. **Add new site** → **Import an existing project** → conecte o GitHub
3. Selecione o repositório `cdl` (ou o nome do seu repo)
4. **Importante:** em Build settings, confira:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
5. Clique em **Deploy site**

O site será publicado em `https://nome-do-projeto.netlify.app`.

O frontend usa **static export** (`output: 'export'`) — gera HTML estático em `out/`, sem depender do plugin Next.js.

### Variáveis de ambiente

- **NEXT_PUBLIC_API_URL** (opcional): URL da API em produção (ex: `https://sua-api.railway.app`). Enquanto não configurar, o site usa conteúdo padrão e exibe mensagens como "em breve" onde há dados dinâmicos.

### Depois: backend e banco

Quando quiser ativar o backend:
1. Crie um banco PostgreSQL (Neon, Supabase, Railway, etc.)
2. Faça deploy do backend em Railway ou Render
3. Configure **NEXT_PUBLIC_API_URL** no Netlify com a URL da API

## Scripts

| Pasta     | Comando       | Descrição              |
|----------|---------------|------------------------|
| backend  | `npm run dev` | API em modo desenvolvimento |
| backend  | `npm run db:seed` | Cria usuário admin e dados iniciais |
| frontend | `npm run dev` | Site em desenvolvimento |
| frontend | `npm run build` | Build de produção       |

## Licença

Uso interno CDL Paulo Afonso.
