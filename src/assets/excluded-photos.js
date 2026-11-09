/**
 * excluded-photos.js — Photos de chantier à NE PLUS afficher dans les galeries.
 *
 * Raison : certaines photos montrent un homme en gilet de chantier ;
 * le client demande de les retirer des galeries « chantiers réalisés / en cours ».
 *
 * ⚠️ Les fichiers jpg restent sur le disque : certaines photos servent de
 *    affiche (poster) aux vidéos de chantier et Hero les référence.
 *    Seules les LISTES d'affichage sont filtrées.
 *
 * 👉 Pour en retirer une de plus : ajouter son numéro dans EXCLUDED.
 */
export const EXCLUDED = [
  6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  23, 24, 25, 29, 30, 32, 33, 36, 42, 45,
];

/** Vrai si le numéro de photo est exclu des galeries. */
export const isExcluded = (n) => EXCLUDED.includes(n);
