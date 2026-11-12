/**
 * config.js - Coordonnées et réglages du site (à modifier ICI uniquement).
 *
 * Source : carte de visite officielle D. Somague Ingénierie.
 * ⚠️ Les numéros sont saisis SANS espaces insécables autour des groupes :
 * c'est le rendu qui gère l'espacement (évite les coupures du type « 39  »).
 */
export const SITE = {
  name: 'D. SOMAGUE INGÉNIERIE',
  nameShort: 'D-SOMAGUE',

  // Téléphone fixe du bureau
  phoneDisplay: '+228 22 55 39 23',
  phoneIntl: '+22822553923',

  // Mobiles / WhatsApp (le premier est le WhatsApp principal)
  mobileDisplay: '+228 90 95 94 04',
  mobileIntl: '+22890959404',
  mobile2Display: '+228 90 74 38 46',
  mobile2Intl: '+22890743846',

  whatsappNumber: '22890959404', // WhatsApp principal (mobile 1)

  // Contact DÉDIÉ aux pôles Transit & Immobilier (les 2 pôles les plus demandés).
  // Un client intéressé par le transit ou l'immobilier est orienté vers ce numéro.
  transitImmobilierDisplay: '+228 90 14 38 46',
  transitImmobilierIntl: '+22890143846',
  transitImmobilierWhatsapp: '22890143846',
  // Branches (ids) qui utilisent le contact ci-dessus.
  transitImmobilierBranches: ['immobilier', 'transit'],

  email: 'contact@dsomague.com',

  address: {
    fr: 'Zongo, Lomé — à côté de la pharmacie Zongo, Togo',
    en: 'Zongo, Lomé — next to Zongo pharmacy, Togo',
  },

  // Carte Google Maps intégrée (page Contact). iframe sans clé API (output=embed).
  // Pour recentrer la carte : remplacer la valeur de `q` ci-dessous.
  mapEmbed:
    'https://maps.google.com/maps?q=Pharmacie%20Zongo%2C%20Zongo%2C%20Lom%C3%A9%2C%20Togo&t=&z=16&ie=UTF8&iwloc=&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Pharmacie+Zongo%2C+Zongo%2C+Lom%C3%A9%2C+Togo',

  hours: {
    fr: 'Lundi – Vendredi : 8h00 – 17h00 · Samedi : 8h00 – 12h00',
    en: 'Monday – Friday: 8:00 AM – 5:00 PM · Saturday: 8:00 AM – 12:00 PM',
  },

  // Mentions administratives (pied de page / mentions légales)
  legal: {
    nif: '1001848319',
    rccm: 'TG-LFW-01-2023-B13-00973',
    ccp: 'N° 91000008024001000 SOGNEF · N° 0911001540301',
  },

  // Réseaux sociaux (pied de page). Laisser `url` vide pour masquer l'icône.
  social: [
    { name: 'Facebook', url: 'https://facebook.com/dsomague', icon: 'facebook' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/dsomague', icon: 'linkedin' },
    { name: 'Instagram', url: 'https://instagram.com/dsomague', icon: 'instagram' },
    { name: 'TikTok', url: '', icon: 'tiktok' },
    { name: 'YouTube', url: '', icon: 'youtube' },
  ],

  // Formulaire : URL Formspree/EmailJS (VITE_FORM_ENDPOINT dans .env). Vide = envoi via WhatsApp.
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '',
};

export const waUrl = (text, phone = SITE.whatsappNumber) =>
  `https://wa.me/${phone}` + (text ? `?text=${encodeURIComponent(text)}` : '');

/**
 * Retourne le lien WhatsApp adapté à une branche/domaine.
 * Les pôles Transit & Immobilier sont orientés vers le contact dédié.
 */
export const waUrlForBranch = (branch, text) =>
  waUrl(text, SITE.transitImmobilierBranches.includes(branch)
    ? SITE.transitImmobilierWhatsapp
    : SITE.whatsappNumber);
