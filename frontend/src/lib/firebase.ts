// Firebase initialization (client-side only)
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyD9NjTI1Z_QvvL0pqTtL7xdoP6uEb5HiE0',
  authDomain: 'sitecdl.firebaseapp.com',
  projectId: 'sitecdl',
  storageBucket: 'sitecdl.firebasestorage.app',
  messagingSenderId: '979171003984',
  appId: '1:979171003984:web:fde513bd1438a935c04b55',
  measurementId: 'G-M6RM53BBES',
};

export function initFirebase() {
  if (typeof window === 'undefined') return null;
  try {
    if (!getApps().length) {
      const app = initializeApp(firebaseConfig);
      try {
        // Analytics can throw in some environments; guard it
        getAnalytics(app);
      } catch (e) {
        // ignore analytics errors
        // console.warn('Firebase analytics init failed', e);
      }
      return app;
    }
    return getApp();
  } catch (e) {
    console.warn('Firebase init error', e);
    return null;
  }
}

