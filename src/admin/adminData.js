/**
 * adminData.js — Accès aux données depuis l'espace admin.
 *
 * Abstraction : l'admin ne sait pas si les données viennent de l'API PHP
 * (MySQL) ou du stockage local. Ce module expose des fonctions UNIFORMES :
 *
 *   listProperties / createProperty / updateProperty / removeProperty
 *   listNews       / createNews       / updateNews       / removeNews
 *   uploadImage(file)
 *
 * En mode API (en ligne)  → requêtes vers api/index.php (MySQL + dossier /uploads).
 * En mode local (dev)     → store.js (localStorage), pour tester sans backend.
 */
import { callApi, isApiAvailable } from './apiClient';
import {
  getProperties, saveProperty, deleteProperty,
  getNews, saveNews, deleteNews,
  refreshFromApi,
} from '../store';

// Détection de l'API, mise en cache (comme dans adminAuth.js).
let apiAvailable = null;
async function useApi() {
  if (apiAvailable === null) apiAvailable = await isApiAvailable();
  return apiAvailable;
}

/* ============================ Biens immobiliers ============================ */

export async function listProperties() {
  if (await useApi()) {
    return await callApi('properties', { method: 'GET' });
  }
  return getProperties();
}

export async function createProperty(item) {
  if (await useApi()) {
    const data = await callApi('property.create', { body: item });
    await refreshFromApi(); // le site public voit immédiatement le bien
    return data;
  }
  saveProperty({ ...item, id: undefined });
  return item;
}

export async function updateProperty(id, item) {
  if (await useApi()) {
    const data = await callApi('property.update', { body: { ...item, id } });
    await refreshFromApi();
    return data;
  }
  saveProperty({ ...item, id });
  return item;
}

export async function removeProperty(id) {
  if (await useApi()) {
    await callApi('property.delete', { body: { id } });
    await refreshFromApi();
    return;
  }
  deleteProperty(id);
}

/* ============================ Actualités ============================ */

export async function listNews() {
  if (await useApi()) {
    return await callApi('news', { method: 'GET' });
  }
  return getNews();
}

export async function createNews(item) {
  if (await useApi()) {
    const data = await callApi('news.create', { body: item });
    await refreshFromApi(); // le site public voit immédiatement l'actualité
    return data;
  }
  saveNews({ ...item, id: undefined });
  return item;
}

export async function updateNews(id, item) {
  if (await useApi()) {
    const data = await callApi('news.update', { body: { ...item, id } });
    await refreshFromApi();
    return data;
  }
  saveNews({ ...item, id });
  return item;
}

export async function removeNews(id) {
  if (await useApi()) {
    await callApi('news.delete', { body: { id } });
    await refreshFromApi();
    return;
  }
  deleteNews(id);
}

/* ============================ Images ============================ */

/**
 * Téléverse une image et renvoie son URL publique.
 *
 * • Mode API : envoi multipart vers api/index.php?action=upload, qui range le
 *   fichier dans /uploads et renvoie « uploads/<nom> ».
 * • Mode local : lit le fichier en base64 (data URL) → utilisable comme <img src>.
 *
 * @param {File} file
 * @returns {Promise<string>} URL de l'image
 */
export async function uploadImage(file) {
  if (!file) throw new Error('Aucun fichier sélectionné.');
  if (!file.type.startsWith('image/')) throw new Error('Le fichier doit être une image.');

  // Limite de sécurité : 5 Mo.
  if (file.size > 5 * 1024 * 1024) throw new Error('Image trop lourde (max 5 Mo).');

  if (await useApi()) {
    const form = new FormData();
    form.append('file', file);
    const data = await callApi('upload', { form });
    if (!data || !data.url) throw new Error("Le serveur n'a pas renvoyé d'URL d'image.");
    return data.url;
  }

  // Mode local : conversion en data URL.
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Lecture du fichier impossible.'));
    reader.readAsDataURL(file);
  });
}