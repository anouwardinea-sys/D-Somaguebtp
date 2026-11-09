/**
 * images.js â€” Registre central des images du site D-SOMAGUE INGÃ‰NIERIE
 *
 * âš ï¸ POURQUOI CE FICHIER ?
 * Les URL d'images Ã©taient dupliquÃ©es (parfois diffÃ©rentes) dans Hero, Metiers,
 * Realizations, Realisation, About, Header, DomainNavigation... Cela provoquait
 * des incohÃ©rences (ex. le menu du header affichait la mÃªme photo pour les 5
 * domaines). Toutes les images sont dÃ©sormais dÃ©clarÃ©es ICI, une seule fois.
 *
 * ðŸ‘‰ Les visuels de mise en page ci-dessous sont les images d'origine du site.
 *    Les NOUVELLES photos/vidÃ©os du client ne remplacent PAS ces emplacements :
 *    elles sont prÃ©sentÃ©es dans des sections dÃ©diÃ©es (fin du fichier :
 *    REALISATION_PHOTOS et SITE_VIDEOS).
 */

import { isExcluded } from './excluded-photos';


/**
 * Helper : ajoute les paramÃ¨tres de recadrage/qualitÃ© Ã  une URL Unsplash.
 * âš ï¸ Ces identifiants ont Ã©tÃ© vÃ©rifiÃ©s (HTTP 200). Ne pas les remplacer par
 * des identifiants non testÃ©s : un ID inexistant casse silencieusement la page.
 */
const u = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* =========================================================
 * 0. GALERIE DÃ‰DIÃ‰E PAR DOMAINE
 *    Chaque domaine a SA propre sÃ©rie de photos (le visuel principal
 *    + 4 images mÃ©tier). UtilisÃ©e par components/DomainPage.jsx.
 * ========================================================= */
export const DOMAIN_GALLERY = {
  architecture: [
    u('1503387762-592deb58ef4e', 1600), // plans
    u('1498050108023-c5249f4df085', 900), // ordinateur avec logiciel ouvert
    u('1487958449943-2429e8be8625', 900), // immeuble
    u('1518005020951-eccb494ad742', 900), // bâtiment
    u('1600607687939-ce8a6c25118c', 900), // intérieur
  ],
  ingenierie: [
    u('1541888946425-d81bb19240f5', 1600), // grue / chantier
    u('1541976590-713941681591', 900), // structure
    u('1517089596392-fb9a9033e05b', 900), // travaux
    u('1581094794329-c8112a89af12', 900), // suivi & contrôle
    u('1504307651254-35680f356dfd', 900), // ambiance chantier
  ],
  immobilier: [
    u('1568605114967-8130f3a36994', 1600), // villa
    u('1600596542815-ffad4c1539a9', 900), // villa moderne
    u('1600585154340-be6161a56a0c', 900), // maison
    u('1613490493576-7fde63acd811', 900), // résidence
    u('1512917774080-9991f1c4c750', 900), // résidence sécurisée
  ],
  transit: [
    u('1494412574643-ff11b0a5c1c3', 1600), // conteneurs
    u('1436491865332-7a61a109cc05', 900), // fret aérien
    u('1601584115197-04ecc0da31d7', 900), // camions
    u('1586528116311-ad8dd3c8310d', 900), // entrepôt
    u('1578575437130-527eed3abbec', 900), // logistique portuaire
  ],
  topographie: [
    u('1473968512647-3e447244af8f', 1600), // levé terrain
    u('1503387762-592deb58ef4e', 900), // plans techniques
    u('1541888946425-d81bb19240f5', 900), // suivi de chantier
    u('1504307651254-35680f356dfd', 900), // terrain de travaux
    u('1581094794329-c8112a89af12', 900), // suivi & contrôle
  ],
};

/* =========================================================
 * 1. DOMAINES D'ACTIVITÃ‰ (5 pÃ´les)
 *    Sert au menu du header, Ã  la section MÃ©tiers, aux pages domaine.
 * ========================================================= */
export const DOMAIN_IMAGES = {
  architecture: u('1503387762-592deb58ef4e', 1600),
  ingenierie: u('1541888946425-d81bb19240f5', 1600),
  immobilier: u('1568605114967-8130f3a36994', 1600),
  transit: u('1494412574643-ff11b0a5c1c3', 1600),
  topographie: u('1473968512647-3e447244af8f', 1600),
};

/* =========================================================
 * 2. RÃ‰ALISATIONS / CHANTIERS (page d'accueil + page dÃ©diÃ©e)
 * ========================================================= */
export const PROJECT_IMAGES = [
  u('1600596542815-ffad4c1539a9', 800), // villa moderne
  u('1503387762-592deb58ef4e', 800), // plans / architecture
  u('1512917774080-9991f1c4c750', 800), // rÃ©sidence sÃ©curisÃ©e
  u('1578575437130-527eed3abbec', 800), // transit / logistique
  u('1473968512647-3e447244af8f', 800), // levÃ© topographique
  u('1486406146926-c627a92ad1ab', 800), // immeuble de bureaux
];

/* =========================================================
 * 3. SECTION MÃ‰TIERS (6 cartes de la page d'accueil)
 *    Volontairement distinctes des rÃ©alisations.
 * ========================================================= */
export const METIER_IMAGES = [
  u('1503387762-592deb58ef4e', 900), // Architecture
  u('1541888946425-d81bb19240f5', 900), // IngÃ©nierie BTP
  u('1568605114967-8130f3a36994', 900), // Immobilier
  u('1494412574643-ff11b0a5c1c3', 900), // Transit & Logistique
  u('1473968512647-3e447244af8f', 900), // Topographie
  u('1581094794329-c8112a89af12', 900), // Ã‰tudes & Suivi
];

/* =========================================================
 * 4. AMBIANCE / Ã‰QUIPE / BUREAU
 * ========================================================= */
export const AMBIANCE_IMAGES = {
  bureau: u('1497366216548-37526070297c', 1200),
  equipe: u('1522071820081-009f0129c71c', 1200),
  chantier: u('1504307651254-35680f356dfd', 1200),
  grue: u('1541888946425-d81bb19240f5', 1200),
  reunion: u('1552664730-d307ca884978', 1200),
  plan: u('1503387762-592deb58ef4e', 1200),
};

/* =========================================================
 * 5. GALERIE Ã€ PROPOS (bandeau faÃ§on mosaÃ¯que)
 * ========================================================= */
export const GALLERY_IMAGES = [
  u('1504307651254-35680f356dfd', 700),
  u('1497366216548-37526070297c', 700),
  u('1522071820081-009f0129c71c', 700),
  u('1486406146926-c627a92ad1ab', 700),
  u('1600596542815-ffad4c1539a9', 700),
  u('1512917774080-9991f1c4c750', 700),
];

/* =========================================================
 * 6. PORTRAITS Ã‰QUIPE (page Ã€ propos)
 * ========================================================= */
export const TEAM_IMAGES = [
  u('1560250097-0b93528c311a', 400),
  u('1573497019940-1c28c88b4f3e', 400),
  u('1519085360753-af0119f7cbe7', 400),
];

/* =========================================================
 * 7. NOUVEAUX MÃ‰DIAS DU CLIENT (ajoutÃ©s, SANS remplacer ce qui prÃ©cÃ¨de)
 *    PrÃ©sentÃ©s dans des sections dÃ©diÃ©es :
 *      â€¢ REALISATION_PHOTOS -> galerie photos de chantiers (PhotoGallery)
 *      â€¢ SITE_VIDEOS        -> section vidÃ©os de chantiers (VideoGallery)
 *    Fichiers dÃ©posÃ©s dans public/ et servis Ã  la racine du site.
 * ========================================================= */

/** Vraie photo de chantier du client (public/images/realisations). */
export const photo = (n) => `/images/realisations/photo-${String(n).padStart(3, '0')}.jpg`;

/**
 * Liste des vraies photos de chantiers à afficher (public/images/realisations).
 * Les photos montrant un homme en gilet de chantier sont exclues
 * (voir excluded-photos.js). Les fichiers restent sur le disque car
 * certaines servent d'affiche (poster) aux vidéos.
 */
export const REALISATION_PHOTOS = Array.from({ length: 173 }, (_, i) => i + 1)
  .filter((n) => !isExcluded(n))
  .map(photo);

/** Vidéos de chantier D-SOMAGUE, illustrées par des photos locales du site. */
export const SITE_VIDEOS = Array.from({ length: 20 }, (_, i) => ({
  src: `/videos/chantier-${String(i + 1).padStart(2, '0')}.mp4`,
  poster: photo(i + 1),
}));