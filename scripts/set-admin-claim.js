#!/usr/bin/env node
/**
 * One-time script to set custom claim `admin: true` for a Firebase Auth user.
 *
 * Usage:
 * 1) Place your Firebase service account JSON in a secure location (do NOT commit it).
 * 2) Run:
 *    node scripts/set-admin-claim.js --serviceAccount=./service-account.json user@example.com
 *
 * You can also set the environment variable GOOGLE_APPLICATION_CREDENTIALS pointing to the service account file
 * and then run:
 *    node scripts/set-admin-claim.js user@example.com
 *
 * This script will:
 *  - initialize firebase-admin with the provided service account
 *  - find the user by email
 *  - set custom user claims { admin: true }
 */

const path = require('path');
const fs = require('fs');

async function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0) {
    console.error('Usage: node scripts/set-admin-claim.js [--serviceAccount=./service-account.json] user@example.com');
    process.exit(1);
  }

  let serviceAccountPath;
  const emailArg = argv.find((a) => !a.startsWith('--'));
  const email = emailArg;
  for (const a of argv) {
    if (a.startsWith('--serviceAccount=')) {
      serviceAccountPath = a.split('=')[1];
    }
  }

  if (!email) {
    console.error('Missing email parameter.');
    process.exit(1);
  }

  // If env var provided, prefer it
  if (!serviceAccountPath && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  }

  if (!serviceAccountPath) {
    console.error('No service account provided. Use --serviceAccount=path or set GOOGLE_APPLICATION_CREDENTIALS env var.');
    process.exit(1);
  }

  const fullPath = path.resolve(serviceAccountPath);
  if (!fs.existsSync(fullPath)) {
    console.error('Service account file not found at:', fullPath);
    process.exit(1);
  }

  const admin = require('firebase-admin');
  try {
    const serviceAccount = require(fullPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (err) {
    console.error('Failed to initialize firebase-admin:', err);
    process.exit(1);
  }

  try {
    console.log('Looking up user by email:', email);
    const user = await admin.auth().getUserByEmail(email);
    console.log('Found user uid:', user.uid);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Custom claim "admin: true" set for ${email} (uid: ${user.uid})`);
    process.exit(0);
  } catch (err) {
    console.error('Error setting admin claim:', err);
    process.exit(1);
  }
}

main();

