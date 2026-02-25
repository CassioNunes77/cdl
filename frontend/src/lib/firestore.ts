import { getApps } from 'firebase/app';
import { initFirebase } from './firebase';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';

function getDb() {
  if (typeof window === 'undefined') throw new Error('Firestore is client-side only');
  initFirebase();
  return getFirestore();
}

export type Campaign = {
  id?: string;
  title: string;
  description: string;
  fullDescription?: string;
  date?: string;
  category?: string;
  highlights?: string[];
  benefits?: string[];
  howToParticipate?: string;
  contact?: string;
};

export async function listCampaigns(): Promise<Campaign[]> {
  const db = getDb();
  const col = collection(db, 'campaigns');
  const q = query(col, orderBy('title'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

export async function getCampaign(id: string): Promise<Campaign | null> {
  const db = getDb();
  const ref = doc(db, 'campaigns', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as any) };
}

export async function createCampaign(data: Campaign) {
  const db = getDb();
  const col = collection(db, 'campaigns');
  const ref = await addDoc(col, data);
  return ref.id;
}

export async function updateCampaign(id: string, data: Partial<Campaign>) {
  const db = getDb();
  const ref = doc(db, 'campaigns', id);
  await updateDoc(ref, data as any);
}

export async function setCampaign(id: string, data: Campaign) {
  const db = getDb();
  const ref = doc(db, 'campaigns', id);
  await setDoc(ref, data as any);
}

export async function deleteCampaignById(id: string) {
  const db = getDb();
  const ref = doc(db, 'campaigns', id);
  await deleteDoc(ref);
}

