/**
 * chantiers.js — Organisation des médias du client PAR CHANTIER.
 *
 * ⚠️ POURQUOI CE FICHIER ?
 * Les 173 photos et 20 vidéos étaient auparavant deux listes à plat
 * (REALISATION_PHOTOS / SITE_VIDEOS). Elles sont désormais regroupées
 * par CHANTIER, avec un nom lisible et une description, puis présentées
 * dans components/ChantierGallery.jsx.
 *
 * ⚠️ NOTE D'HONNÊTETÉ SUR LE CLASSEMENT
 * Les photos n'ont AUCUNE métadonnée EXIF (vérifié) : il est impossible
 * de certifier le site physique exact de chaque fichier. Le regroupement
 * se fait donc par NATURE DES TRAVAUX (terrassement, voirie/réseaux,
 * béton armé), ce qui correspond au contenu réellement visible.
 *
 * 👉 POUR AJUSTER : il suffit de déplacer un numéro de photo d'un
 *    tableau `photos` vers un autre. Rien d'autre à changer.
 */

import { photo } from './images';
import { isExcluded } from './excluded-photos';

/** URL d'une vidéo de chantier (public/videos/chantier-NN.mp4). */
const video = (n) => `/videos/chantier-${String(n).padStart(2, '0')}.mp4`;

/** Construit un item vidéo { src, poster } à partir d'un numéro. */
const clip = (n) => ({ src: video(n), poster: photo(n) });

/**
 * Construit la liste d'URL photos pour une plage inclusive [from, to],
 * en excluant les photos listées dans excluded-photos.js
 * (photos montrant un homme en gilet de chantier).
 */
const range = (from, to) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i)
    .filter((n) => !isExcluded(n))
    .map(photo);

/**
 * Les 3 chantiers. Chacun porte :
 *  - id     : identifiant stable (clé i18n + onglets de la galerie)
 *  - videos : clips vidéo de ce chantier (examinés un par un)
 *  - photos : photos de ce chantier
 *
 * Le nom, la phase et le résumé traduits viennent de l'i18n
 * (t.realisationPage.chantiers.items[id]) — voir ChantierGallery.jsx.
 */
export const CHANTIERS = [
  {
    id: 'terrassement',
    videos: [1, 2, 5, 8].map(clip),
    photos: range(1, 40),
  },
  {
    id: 'voirie-reseaux',
    videos: [3, 4, 6, 7, 9, 10, 12, 15].map(clip),
    photos: range(41, 118),
  },
  {
    id: 'beton-arme',
    videos: [11, 13, 14, 16, 17, 18, 19, 20].map(clip),
    photos: range(119, 173),
  },
];

/** Accès direct par id (pratique pour la galerie). */
export const chantierById = (id) => CHANTIERS.find((c) => c.id === id);

/** Nombre total de médias (photos + vidéos) tous chantiers confondus. */
export const TOTAL_MEDIA = CHANTIERS.reduce(
  (sum, c) => sum + c.photos.length + c.videos.length,
  0,
);