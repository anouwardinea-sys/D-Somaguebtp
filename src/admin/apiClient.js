/**
 * apiClient.js — Connexion à l'API PHP + MySQL (Hostinger).
 *
 * Ce module est le client HTTP unique de l'admin. Il parle à
 * `api/index.php` (même domaine que le site) avec des requêtes classiques.
 *
 * ── CONFIGURATION ────────────────────────────────────────────────────────────
 * Le site et l'API sont hébergés au MÊME endroit (Hostinger). L'URL par défaut
 * est donc le chemin relatif « /api » : aucune variable d'environnement n'est
 * nécessaire pour le déploiement final.
 *
 *   • En local (npm run dev) : /api n'existe pas → l'admin bascule
 *     automatiquement en mode démonstration (localStorage).
 *   • En ligne (Hostinger)   : /api répond → l'admin utilise MySQL.
 *
 * Pour pointer vers une API ailleurs (test), définir dans .env :
 *   VITE_API_URL=https://mon-domaine.com/api
 */

const BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');

const TOKEN_KEY = 'dsomague-admin-token';

/* ============================ Jeton de session ============================ */

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || '';
  } catch {
    return '';
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* stockage indisponible */
  }
}

/* ============================ Requête générique ============================ */

/**
 * Appelle l'API et renvoie le champ `data`.
 * Lève une Error avec un message lisible en cas d'échec.
 *
 * @param {string} action  ex. 'properties', 'property.create', 'login'
 * @param {object} options { method, body, form }
 */
export async function callApi(action, { method = 'POST', body = null, form = null } = {}) {
  const url = `${BASE}/index.php?action=${encodeURIComponent(action)}`;
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let payload;
  if (form) {
    // FormData : le navigateur définit lui-même le Content-Type (multipart).
    payload = form;
  } else if (body) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(url, { method, headers, body: payload });
  } catch {
    throw new Error("Impossible de joindre le serveur. Vérifiez votre connexion.");
  }

  // Réponse non-JSON (page 404 de l'hébergeur, erreur PHP…) → message clair.
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(
      "L'API ne répond pas correctement. Vérifiez que le dossier /api est bien " +
      "installé sur l'hébergement (api/index.php et api/config.php)."
    );
  }

  if (!res.ok || json.ok === false) {
    throw new Error(json.error || `Erreur serveur (${res.status}).`);
  }
  return json.data;
}

/* ============================ Vérification de disponibilité ============================ */

/**
 * Détecte si l'API PHP est installée et répond (mode en ligne).
 * Renvoie true/false sans lever d'exception.
 */
export async function isApiAvailable() {
  try {
    const res = await fetch(`${BASE}/index.php?action=ping`, { method: 'GET' });
    if (!res.ok) return false;
    const json = await res.json();
    return json && json.ok === true && json.data && json.data.pong === true;
  } catch {
    return false;
  }
}

/* ============================ Constantes ============================ */

/** Nom logique du dossier des images téléversées (servi par le serveur). */
export const STORAGE_BUCKET = 'uploads';
