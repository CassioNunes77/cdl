# Criar usuário administrador no Firebase (one-time)

Este documento explica como cadastrar manualmente um usuário no Firebase Auth e atribuir a ele a claim `admin: true` usando um script fornecido no repositório.

IMPORTANTE: Nunca comite o arquivo da service account (`service-account.json`) no repositório. Use upload temporário no Cloud Shell ou variáveis de ambiente no CI.

## Passo 1 — Criar usuário no Console do Firebase

1. Abra o Firebase Console do seu projeto.
2. Acesse "Authentication" → "Users".
3. Clique em "Add user".
4. Preencha:
   - Email: `cdlpauloafonsoba@gmail.com`
   - Password: escolha uma senha forte (ex.: `cdl49426@cdl`) ou outra de sua preferência.
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

## Observação de segurança

- Após usar o `service-account.json`, remova-o do ambiente (Cloud Shell) ou guarde em local seguro.
- Use custom claims para permitir acesso ao backend; no frontend apenas confiar no ID token é insuficiente para autorização crítica.

## Próximos passos

- Se quiser, posso:
  - Implementar um middleware no backend para validar o ID token e a claim `admin`.
  - Criar instruções de CI (GitHub Actions) para executar esse script de forma segura, se necessário.

