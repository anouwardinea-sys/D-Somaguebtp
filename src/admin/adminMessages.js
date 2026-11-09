import { callApi, isApiAvailable } from './apiClient';

/* ============================ Messagerie (boîte de réception admin) ============================ */
/*
 * Modèle : chaque message reçu (formulaire de contact OU abonnement newsletter)
 * atterrit dans la boîte de réception de l'admin, qui peut le lire et répondre.
 *
 *   status : 'unread' (non lu) → 'read' (lu) → 'replied' (répondu)
 *   reply  : texte de la réponse de l'admin (optionnellement envoyée par WhatsApp/e-mail)
 *
 * En mode API → table MySQL `messages` (api/index.php). En mode local → localStorage.
 */

const LOCAL_KEY = 'dsomague-messages-v1';

// Détection de l'API, mise en cache (comme dans adminAuth.js / adminData.js).
let apiAvailable = null;
async function useApi() {
  if (apiAvailable === null) apiAvailable = await isApiAvailable();
  return apiAvailable;
}

/** Normalise un objet message (champs absents → valeurs par défaut). */
function normalize(m = {}) {
  return {
    id: m.id,
    name: m.name || '',
    email: m.email || '',
    phone: m.phone || '',
    branch: m.branch || '',
    message: m.message || '',
    status: m.status || 'unread',
    reply: m.reply || '',
    replied_at: m.replied_at || null,
    created_at: m.created_at || new Date().toISOString(),
  };
}

/** Lecture locale (localStorage) du tableau de messages. */
function readLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Écriture locale + notification des abonnés (mêmes listeners que le store public). */
function writeLocal(list) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  } catch {
    /* stockage indisponible : on garde en mémoire seulement */
  }
}

/* ---------------------------- Public : création ---------------------------- */

/**
 * Enregistre un message reçu sur le site (contact ou newsletter).
 * Accessible SANS authentification (le visiteur est anonyme).
 */
export async function createMessage(input) {
  const payload = normalize(input);
  delete payload.id;
  delete payload.created_at;

  if (await useApi()) {
    // `message.create` est PUBLIC : le visiteur n'a pas de session.
    return await callApi('message.create', { body: payload });
  }

  // Mode local.
  const list = readLocal();
  const item = { ...payload, id: `m-${Date.now()}`, created_at: new Date().toISOString() };
  list.unshift(item);
  writeLocal(list);
  return item;
}

/* ---------------------------- Admin : lecture / édition ---------------------------- */

/** Liste tous les messages, du plus récent au plus ancien. */
export async function listMessages() {
  if (await useApi()) {
    const data = await callApi('messages', { method: 'GET' });
    return (data ?? []).map(normalize);
  }
  return readLocal().sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
}

/**
 * Marque un message comme lu / répondu, ou enregistre la réponse de l'admin.
 * @param {string} id
 * @param {object} patch — ex. { status:'read' } ou { status:'replied', reply:'…' }
 */
export async function updateMessage(id, patch) {
  const clean = { ...patch };
  if (patch.reply && !patch.replied_at) clean.replied_at = new Date().toISOString();

  if (await useApi()) {
    const data = await callApi('message.update', { body: { ...clean, id } });
    return normalize(data);
  }

  const list = readLocal();
  const i = list.findIndex((m) => m.id === id);
  if (i >= 0) {
    list[i] = { ...list[i], ...clean };
    if (clean.reply && !list[i].replied_at) list[i].replied_at = new Date().toISOString();
    writeLocal(list);
    return list[i];
  }
  throw new Error('Message introuvable.');
}

/** Supprime un message. */
export async function removeMessage(id) {
  if (await useApi()) {
    await callApi('message.delete', { body: { id } });
    return;
  }
  writeLocal(readLocal().filter((m) => m.id !== id));
}