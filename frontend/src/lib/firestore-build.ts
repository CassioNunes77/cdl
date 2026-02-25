/**
 * Server-side Firestore access for build time (generateStaticParams).
 * Requires GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT_JSON env var.
 */
export async function listCampaignIdsAtBuild(): Promise<string[]> {
  if (typeof window !== 'undefined') return [];
  try {
    const admin = await import('firebase-admin');
    if (!admin.apps.length) {
      const creds = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
      if (creds) {
        const parsed = JSON.parse(creds) as Record<string, unknown>;
        admin.initializeApp({ credential: admin.credential.cert(parsed) });
      } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        admin.initializeApp();
      } else {
        return [];
      }
    }
    const db = admin.firestore();
    const snap = await db.collection('campaigns').get();
    return snap.docs.map((d) => d.id);
  } catch {
    return [];
  }
}
