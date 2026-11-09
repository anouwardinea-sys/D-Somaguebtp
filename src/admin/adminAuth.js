/**
 * adminAuth.js — Authentification de l'espace admin.
 *
 * Deux modes, choisis AUTOMATIQUEMENT :
 *
 *  • 'api'   → l'API PHP + MySQL (dossier /api sur l'hébergement) répond.
 *              Connexion réelle : le mot de passe est vérifié côté serveur
 *              (hachage BCRYPT) et un jeton signé est conservé dans localStorage.
 *
 *  • 'local' → /api n'est pas joignable (typiquement en développement local).
 *              Connexion de DÉMONSTRATION, session dans localStorage.
 *              Pratique pour tester l'interface tout de suite.
 *
 * Le reste de l'admin n'a pas besoin de savoir lequel est actif : il appelle
 * `signIn`, `signOut`, `getSession`, `onAuthChange`.
 */
import { callApi, isApiAvailable, getToken, setToken } from './apiClient';

const LOCAL_KEY = 'dsomague-admin-session';
// Identifiants de DÉMONSTRATION (mode local uniquement).
const DEMO = { email: 'admin@dsomague.tg', password: 'admin' };

// Résultat de la détection de l'API, mis en cache pour éviter un ping à chaque appel.
let apiAvailable = null;

/** Détecte (une seule fois) si l'API PHP répond. */
async function detectApi() {
  if (apiAvailable === null) {
    apiAvailable = await isApiAvailable();
  }
  return apiAvailable;
}

/**
 * Mode courant, tel que connu au dernier appel à l'API (ou 'local' au départ).
 * Sert uniquement à l'affichage d'indices dans l'interface.
 */
export function authMode() {
  return apiAvailable ? 'api' : 'local';
}

/** Connexion. Lève une Error avec un message lisible en cas d'échec. */
export async function signIn(email, password) {
  if (await detectApi()) {
    // --- Mode API : vérification côté serveur (api/index.php?action=login) ---
    const data = await callApi('login', { body: { email, password } });
    if (data && data.token) setToken(data.token);
    return { email: (data && data.user && data.user.email) || email, mode: 'api' };
  }

  // --- Mode local (démo) ---
  if (email.trim().toLowerCase() === DEMO.email && password === DEMO.password) {
    const session = { email: DEMO.email, mode: 'local', at: Date.now() };
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(session));
    } catch {
      /* ignore */
    }
    return session;
  }
  throw new Error('E-mail ou mot de passe incorrect.');
}

export async function signOut() {
  if (await detectApi()) {
    // Le jeton est sans état : on prévient le serveur (best-effort) puis on l'efface.
    try {
      await callApi('logout', { body: {} });
    } catch {
      /* sans importance */
    }
    setToken('');
    return;
  }
  try {
    localStorage.removeItem(LOCAL_KEY);
  } catch {
    /* ignore */
  }
}

/** Session courante (ou null). */
export async function getSession() {
  if (await detectApi()) {
    const token = getToken();
    if (!token) return null;
    try {
      const data = await callApi('session', { method: 'GET' });
      return { email: (data && data.user && data.user.email) || '', mode: 'api' };
    } catch {
      // Jeton expiré ou invalide : on nettoie et on considère non connecté.
      setToken('');
      return null;
    }
  }
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** S'abonne aux changements de session. Renvoie une fonction de désabonnement. */
export function onAuthChange(cb) {
  // Il n'y a pas d'événement externe : la session est vérifiée par getSession().
  // On notifie une fois avec null pour rester compatible avec l'appelant.
  cb(null);
  return () => {};
}
