/**
 * store.js — Couche de données du site (biens immobiliers + actualités).
 *
 * ⚠️ ARCHITECTURE — À LIRE AVANT TOUTE MODIFICATION
 * ------------------------------------------------------------------
 * Le site public lit ses données de DEUX façons, choisies AUTOMATIQUEMENT :
 *
 *   1. API PHP + MySQL (dossier /api sur l'hébergement)
 *      → les biens et actualités publiés depuis l'admin apparaissent pour
 *        TOUT LE MONDE (pas seulement dans le navigateur de l'admin).
 *
 *   2. LOCAL (si /api n'est pas joignable — typiquement en développement) :
 *      → valeurs par défaut (ci-dessous + catalogue.js) persistées dans le
 *        localStorage et diffusées via useSyncExternalStore, pour tester
 *        l'interface sans backend.
 *
 * Dans les deux cas, les composants React ne voient que les hooks
 * `useProperties()` / `useNews()` : le reste du site n'a rien à changer.
 */

import { useSyncExternalStore } from 'react';
import { CAT_IMMOBILIER } from './i18n/catalogue';
import { callApi, isApiAvailable } from './admin/apiClient';

/* ============================ Clés de stockage ============================ */
const KEY_PROPERTIES = 'dsomague-properties-v1';
const KEY_NEWS = 'dsomague-news-v1';

/* ============================ Actualités par défaut ============================ */
const DEFAULT_NEWS = [
  {
    id: 'n1',
    date: '2026-09-15',
    category: 'Chantier',
    title: "Livraison d'une villa R+1 à Agoè",
    excerpt:
      "D-SOMAGUE INGÉNIERIE a livré une villa R+1 de 4 chambres à Agoè, dans les délais et le budget convenus.",
    body:
      "Après six mois de travaux, notre pôle Ingénierie & BTP a livré une villa R+1 de 4 chambres à Agoè (Lomé). Le chantier a mobilisé nos équipes gros œuvre, second œuvre et contrôle qualité. Le client a reçu le procès-verbal de réception et le dossier des plans d'exécution.",
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'n2',
    date: '2026-08-28',
    category: 'Immobilier',
    title: 'Nouveaux terrains titrés disponibles à Agoè-Nyivé',
    excerpt:
      "Notre pôle Immobilier propose désormais une sélection de terrains titrés et vérifiés à Agoè-Nyivé.",
    body:
      "Après vérification du registre foncier, nous mettons en vente plusieurs parcelles titrées à Agoè-Nyivé. Chaque dossier comprend le titre vérifié et le bornage contradictoire. Visite accompagnée sur rendez-vous.",
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'n3',
    date: '2026-07-10',
    category: 'Transit',
    title: 'Dédouanement de 12 conteneurs au Port de Lomé',
    excerpt:
      'Notre pôle Transit a dédouané et acheminé 12 conteneurs de matériaux vers plusieurs chantiers.',
    body:
      "Le pôle Transit & Logistique a pris en charge la déclaration SYDONIA, la visite douanière et le transport des conteneurs vers les chantiers de nos clients. Malgré l'affluence portuaire, l'ensemble a été livré dans le délai annoncé.",
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80',
  },
];

/* ============================ Cache des données de l'API ============================ */
// Tant que la requête n'est pas terminée, on garde `null` et on renvoie le
// repli local (catalogue figé / actualités par défaut) pour éviter un flash.
let remoteProperties = null;
let remoteNews = null;
let refreshPromise = null;

/* ============================ État interne (mode local) ============================ */
let state = {
  properties: null, // chargé paresseusement
  news: null,
};

const listeners = new Set();

function emit() {
  listeners.forEach((l) => l());
}

/** Lecture sûre du localStorage (peut être indisponible en navigation privée). */
function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

/** Écriture sûre + notification des abonnés. */
function write(key, value, field) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* stockage indisponible : on garde en mémoire seulement */
  }
  state = { ...state, [field]: value };
  emit();
}

/** Initialise les biens depuis le catalogue statique au premier accès. */
function ensureProperties() {
  if (state.properties) return;
  const stored = read(KEY_PROPERTIES, null);
  state.properties = stored && stored.length ? stored : CAT_IMMOBILIER;
}

/** Initialise les actualités au premier accès. */
function ensureNews() {
  if (state.news) return;
  state.news = read(KEY_NEWS, DEFAULT_NEWS);
}

/* ============================ Synchronisation avec l'API ============================ */

/**
 * Recharge les biens + actualités depuis l'API PHP (lecture PUBLIQUE).
 * Appelée une fois au démarrage (hook) et après chaque action de l'admin.
 * En cas d'erreur réseau, on conserve le repli local — le site reste visible.
 */
export async function refreshFromApi() {
  if (!(await isApiAvailable())) return;
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const [props, news] = await Promise.all([
        callApi('properties', { method: 'GET' }),
        callApi('news', { method: 'GET' }),
      ]);
      if (Array.isArray(props)) remoteProperties = props;
      if (Array.isArray(news)) remoteNews = news;
      emit();
    } catch {
      /* réseau indisponible : on garde les données locales */
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/* ============================ API publique ============================ */

export function getProperties() {
  // Si l'API est branchée : source de vérité = API (une fois chargée).
  if (remoteProperties) return remoteProperties;
  ensureProperties();
  return state.properties;
}

export function saveProperty(property) {
  ensureProperties();
  const list = [...state.properties];
  if (property.id) {
    const i = list.findIndex((p) => p.id === property.id);
    if (i >= 0) list[i] = { ...list[i], ...property };
    else list.push(property);
  } else {
    list.unshift({ ...property, id: `p-${Date.now()}` });
  }
  write(KEY_PROPERTIES, list, 'properties');
  return list;
}

export function deleteProperty(id) {
  ensureProperties();
  write(KEY_PROPERTIES, state.properties.filter((p) => p.id !== id), 'properties');
}

export function resetProperties() {
  write(KEY_PROPERTIES, CAT_IMMOBILIER, 'properties');
}

export function getNews() {
  if (remoteNews) return remoteNews;
  ensureNews();
  return state.news;
}

export function getNewsById(id) {
  return getNews().find((n) => n.id === id) || null;
}

export function saveNews(article) {
  ensureNews();
  const list = [...state.news];
  if (article.id) {
    const i = list.findIndex((n) => n.id === article.id);
    if (i >= 0) list[i] = { ...list[i], ...article };
    else list.unshift(article);
  } else {
    list.unshift({ ...article, id: `n-${Date.now()}` });
  }
  write(KEY_NEWS, list, 'news');
  return list;
}

export function deleteNews(id) {
  ensureNews();
  write(KEY_NEWS, state.news.filter((n) => n.id !== id), 'news');
}

export function resetNews() {
  write(KEY_NEWS, DEFAULT_NEWS, 'news');
}

/* ============================ Hooks React ============================ */

function subscribe(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/**
 * Lance (une seule fois) le chargement des données depuis l'API.
 * Sans effet en mode local. Appelé par les hooks publics ci-dessous.
 */
function ensureRemoteLoaded() {
  if (!remoteProperties && !remoteNews && !refreshPromise) {
    refreshFromApi();
  }
}

/** Tous les biens (réactif : se met à jour quand l'admin modifie). */
export function useProperties() {
  ensureRemoteLoaded();
  return useSyncExternalStore(subscribe, getProperties, getProperties);
}

/** Toutes les actualités (réactif). */
export function useNews() {
  ensureRemoteLoaded();
  return useSyncExternalStore(subscribe, getNews, getNews);
}