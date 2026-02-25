# Criar usuário administrador no Firebase (one-time)

Este documento explica como cadastrar manualmente um usuário no Firebase Auth e atribuir a ele a claim `admin: true` usando um script fornecido no repositório.

IMPORTANTE: Nunca comite o arquivo da service account (`service-account.json`) no repositório. Use upload temporário no Cloud Shell ou variáveis de ambiente no CI.

## Passo 1 — Criar usuário no Console do Firebase

1. Abra o Firebase Console do seu projeto.
2. Acesse "Authentication" → "Users".
3. Clique em "Add user".
4. Preencha:
  - Email: `cdlpauloafonsoba@gmail.com`
  - Password: escolha uma senha forte e única; não inclua senhas de exemplo neste repositório.
  - (Opcional) marque "Email verified".
5. Salve.

## Passo 2 — Atribuir claim `admin: true` (recomendado)

Você pode usar o script `scripts/set-admin-claim.js` que já está neste repositório. Ele usa o Firebase Admin SDK e precisa de uma Service Account JSON.

Opções para executar o script:

- **Cloud Shell (recomendado se você não quer instalar Node localmente)**:
  1. Abra https://shell.cloud.google.com
  2. Faça upload do `service-account.json` (Project Settings → Service accounts → Generate new private key).
  3. Faça upload do script (já existe em /scripts/set-admin-claim.js — você também pode editá-lo se necessário).
  4. Execute:
     ```bash
     node scripts/set-admin-claim.js --serviceAccount=./service-account.json cdlpauloafonsoba@gmail.com
     ```

- **Executar localmente (se você tiver Node)**:
  1. Baixe `service-account.json` do Firebase Console.
  2. Salve na pasta segura (ex.: `./service-account.json`).
  3. Execute:
     ```bash
     npm install firebase-admin
     node scripts/set-admin-claim.js --serviceAccount=./service-account.json cdlpauloafonsoba@gmail.com
     ```

O script retornará confirmação ao terminar.

## Regras de segurança do Firestore (recomendado)

Incluí um conjunto de regras de segurança de exemplo em `firebase/firestore.rules` no repositório. Essas regras fazem o seguinte:
- Permitem leitura pública da coleção `campaigns` (página pública).
- Permitem criação/atualização/exclusão em `campaigns` somente para administradores.
- Consideram um usuário administrador quando:
  - o token do Firebase Authentication contém `admin: true` (custom claim), ou
  - existe um documento em `/admins/{uid}` para o `uid` autenticado.

Essas regras protegem seu conteúdo quando o frontend usa o SDK do Firestore diretamente.

### Como aplicar as regras no seu projeto Firebase

1. Instale a CLI do Firebase (se necessário) ou use Cloud Shell:
   - Localmente: `npm install -g firebase-tools`
   - Cloud Shell: já possui `firebase` disponível
2. Faça login: `firebase login`
3. Inicialize/prepare (se ainda não tiver):
   - `firebase init firestore` (siga as instruções e selecione o arquivo `firebase/firestore.rules` quando solicitado)
4. Ou apenas faça deploy das regras:
   - `firebase deploy --only firestore:rules --project YOUR_PROJECT_ID`

> Observação: substitua YOUR_PROJECT_ID pelo ID do seu projeto Firebase (ex.: `sitecdl`).

## Observação de segurança

- Após usar o `service-account.json`, remova-o do ambiente (Cloud Shell) ou guarde em local seguro.
- Use custom claims para permitir acesso ao backend; no frontend apenas confiar no ID token é insuficiente para autorização crítica.

## Próximos passos

- Se quiser, posso:
  - Implementar um middleware no backend para validar o ID token e a claim `admin`.
  - Criar instruções de CI (GitHub Actions) para executar esse script de forma segura, se necessário.

