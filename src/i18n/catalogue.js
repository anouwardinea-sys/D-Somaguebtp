/**
 * catalogue.js — Éléments présentés (filtrables) pour chaque domaine.
 *
 * Chaque domaine expose une liste d'éléments :
 *   {
 *     id, title, location, price,
 *     offer : 'location' | 'vente' | 'service',   // onglet principal
 *     type  : catégorie filtrable (maison, terrain, vehicule, ...)
 *     image
 *   }
 *
 * ⚠️ Les visuels sont des PHOTOS D'ILLUSTRATION (Unsplash). Pour la mise en
 * ligne, remplacer les `image` par les photos réelles de D. Somague, et les
 * prix par les tarifs réels. Aucune autre page à modifier.
 */

const u = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* =========================================================
 * IMMOBILIER — Location & Vente (maisons, terrains, véhicules, bureaux)
 * ========================================================= */
export const CAT_IMMOBILIER = [
  // ---------- LOCATION ----------
  {
    id: "loc-1",
    offer: "location",
    type: "maison",
    title: "Villa 4 chambres avec cour",
    location: "Agoè, Lomé",
    price: "350 000 F/mois",
    image: u("1600596542815-ffad4c1539a9"),
  },
  {
    id: "loc-2",
    offer: "location",
    type: "maison",
    title: "Maison 3 chambres R+1",
    location: "Adidogomé, Lomé",
    price: "180 000 F/mois",
    image: u("1568605114967-8130f3a36994"),
  },
  {
    id: "loc-3",
    offer: "location",
    type: "appartement",
    title: "Appartement meublé 2 ch.",
    location: "Bè-Kpota, Lomé",
    price: "150 000 F/mois",
    image: u("1502672260266-1c1ef2d93688"),
  },
  {
    id: "loc-4",
    offer: "location",
    type: "terrain",
    title: "Terrain 600 m² clôturé",
    location: "Baguida, Lomé",
    price: "1 200 000 F/an",
    image: u("1500382017468-9049fed747ef"),
  },
  {
    id: "loc-5",
    offer: "location",
    type: "bureau",
    title: "Bureau open-space 80 m²",
    location: "Plateau, Lomé",
    price: "250 000 F/mois",
    image: u("1497366216548-37526070297c"),
  },
  {
    id: "loc-6",
    offer: "location",
    type: "vehicule",
    title: "Pick-up 4x4 utilitaire",
    location: "Lomé",
    price: "45 000 F/jour",
    image: u("1519641471654-76ce0107ad1b"),
  },
  {
    id: "loc-7",
    offer: "location",
    type: "vehicule",
    title: "Camion benne 10 t",
    location: "Lomé",
    price: "à partir de 120 000 F/jour",
    image: u("1601584115197-04ecc0da31d7"),
  },
  {
    id: "loc-8",
    offer: "location",
    type: "vehicule",
    title: "Voiture de service berline",
    location: "Lomé",
    price: "35 000 F/jour",
    image: u("1503376780353-7e6692767b70"),
  },

  // ---------- VENTE ----------
  {
    id: "ven-1",
    offer: "vente",
    type: "maison",
    title: "Villa duplex 5 pièces",
    location: "Cacavéli, Lomé",
    price: "85 000 000 F",
    image: u("1512917774080-9991f1c4c750"),
  },
  {
    id: "ven-2",
    offer: "vente",
    type: "maison",
    title: "Maison basse 3 chambres",
    location: "Tsévié",
    price: "32 000 000 F",
    image: u("1600585154340-be6161a56a0c"),
  },
  {
    id: "ven-3",
    offer: "vente",
    type: "terrain",
    title: "Terrain titré 500 m²",
    location: "Agoè-Nyivé",
    price: "18 000 000 F",
    image: u("1500382017468-9049fed747ef"),
  },
  {
    id: "ven-4",
    offer: "vente",
    type: "terrain",
    title: "Lotissement 2 hectares",
    location: "Kpogan, Lomé",
    price: "45 000 000 F",
    image: u("1473968512647-3e447244af8f"),
  },
  {
    id: "ven-5",
    offer: "vente",
    type: "appartement",
    title: "Appartement 3 pièces",
    location: "Nyékonakpoè, Lomé",
    price: "28 500 000 F",
    image: u("1522708323590-d24dbb6b0267"),
  },
  {
    id: "ven-6",
    offer: "vente",
    type: "bureau",
    title: "Immeuble de bureaux R+2",
    location: "Plateau, Lomé",
    price: "210 000 000 F",
    image: u("1486406146926-c627a92ad1ab"),
  },
  {
    id: "ven-7",
    offer: "vente",
    type: "vehicule",
    title: "Pick-up double cabine",
    location: "Lomé",
    price: "9 500 000 F",
    image: u("1519641471654-76ce0107ad1b"),
  },
  {
    id: "ven-8",
    offer: "vente",
    type: "vehicule",
    title: "Camion poids lourd 20 t",
    location: "Lomé",
    price: "35 000 000 F",
    image: u("1601584115197-04ecc0da31d7"),
  },
];

/* =========================================================
 * ARCHITECTURE — Projets conçus par type de bâtiment
 * ========================================================= */
export const CAT_ARCHITECTURE = [
  {
    id: "a1",
    offer: "service",
    type: "villa",
    title: "Villa moderne R+1",
    location: "Agoè, Lomé",
    price: "Plans + 3D + permis",
    image: u("1503387762-592deb58ef4e"),
  },
  {
    id: "a2",
    offer: "service",
    type: "villa",
    title: "Villa duplex avec piscine",
    location: "Baguida",
    price: "Plans + 3D + permis",
    image: u("1600596542815-ffad4c1539a9"),
  },
  {
    id: "a3",
    offer: "service",
    type: "immeuble",
    title: "Immeuble résidentiel R+3",
    location: "Plateau, Lomé",
    price: "Étude complète",
    image: u("1486406146926-c627a92ad1ab"),
  },
  {
    id: "a4",
    offer: "service",
    type: "bureau",
    title: "Immeuble de bureaux",
    location: "Lomé",
    price: "Étude complète",
    image: u("1497366216548-37526070297c"),
  },
  {
    id: "a5",
    offer: "service",
    type: "amenagement",
    title: "Aménagement intérieur boutique",
    location: "Grand Marché",
    price: "Conception + suivi",
    image: u("1497366811353-6870744d04b2"),
  },
  {
    id: "a6",
    offer: "service",
    type: "amenagement",
    title: "Aménagement paysager cour",
    location: "Lomé",
    price: "Conception",
    image: u("1558904541-efa843a96f01"),
  },
];

/* =========================================================
 * INGÉNIERIE / BTP — Réalisations par type d'ouvrage
 * ========================================================= */
export const CAT_INGENIERIE = [
  {
    id: "i1",
    offer: "service",
    type: "structure",
    title: "Note de calcul R+3",
    location: "Lomé",
    price: "Études techniques",
    image: u("1541888946425-d81bb19240f5"),
  },
  {
    id: "i2",
    offer: "service",
    type: "structure",
    title: "Charpente métallique hangar",
    location: "Port de Lomé",
    price: "Conception + exécution",
    image: u("1504307651254-35680f356dfd"),
  },
  {
    id: "i3",
    offer: "service",
    type: "batiment",
    title: "Construction villa clé en main",
    location: "Cacavéli",
    price: "Gros œuvre + finitions",
    image: u("1512917774080-9991f1c4c750"),
  },
  {
    id: "i4",
    offer: "service",
    type: "batiment",
    title: "Réhabilitation bâtiment",
    location: "Lomé",
    price: "Diagnostic + travaux",
    image: u("1600585154340-be6161a56a0c"),
  },
  {
    id: "i5",
    offer: "service",
    type: "vrd",
    title: "Voirie et réseaux divers",
    location: "Tsévié",
    price: "Étude + exécution",
    image: u("1581094794329-c8112a89af12"),
  },
  {
    id: "i6",
    offer: "service",
    type: "vrd",
    title: "Assainissement et drainage",
    location: "Lomé",
    price: "Étude + exécution",
    image: u("1541888946425-d81bb19240f5"),
  },
];

/* =========================================================
 * TRANSIT — Prestations par type d'opération
 * ========================================================= */
export const CAT_TRANSIT = [
  {
    id: "t1",
    offer: "service",
    type: "dedouanement",
    title: "Dédouanement conteneur 20'",
    location: "Port de Lomé",
    price: "Devis sur dossier",
    image: u("1494412574643-ff11b0a5c1c3"),
  },
  {
    id: "t2",
    offer: "service",
    type: "dedouanement",
    title: "Dédouanement conteneur 40'",
    location: "Port de Lomé",
    price: "Devis sur dossier",
    image: u("1578575437130-527eed3abbec"),
  },
  {
    id: "t3",
    offer: "service",
    type: "transport",
    title: "Transport vers chantier",
    location: "Lomé et intérieur",
    price: "Selon distance",
    image: u("1601584115197-04ecc0da31d7"),
  },
  {
    id: "t4",
    offer: "service",
    type: "transport",
    title: "Convoi exceptionnel",
    location: "Togo",
    price: "Sur étude",
    image: u("1504307651254-35680f356dfd"),
  },
  {
    id: "t5",
    offer: "service",
    type: "groupage",
    title: "Groupage petits importateurs",
    location: "Port de Lomé",
    price: "Au volume",
    image: u("1553413077-190dd305871c"),
  },
  {
    id: "t6",
    offer: "service",
    type: "stockage",
    title: "Stockage sécurisé marchandises",
    location: "Lomé",
    price: "Au m² / mois",
    image: u("1553413077-190dd305871c"),
  },
];

/* =========================================================
 * TOPOGRAPHIE — Prestations par type d'intervention
 * ========================================================= */
export const CAT_TOPOGRAPHIE = [
  {
    id: "g1",
    offer: "service",
    type: "leve",
    title: "Levé drone 2 hectares",
    location: "Tsévié",
    price: "Sur devis",
    image: u("1473968512647-3e447244af8f"),
  },
  {
    id: "g2",
    offer: "service",
    type: "leve",
    title: "Levé GPS RTK parcelle",
    location: "Lomé",
    price: "Sur devis",
    image: u("1581094794329-c8112a89af12"),
  },
  {
    id: "g3",
    offer: "service",
    type: "bornage",
    title: "Bornage contradictoire",
    location: "Agoè-Nyivé",
    price: "Au mètre linéaire",
    image: u("1503387762-592deb58ef4e"),
  },
  {
    id: "g4",
    offer: "service",
    type: "bornage",
    title: "Rétablissement de limites",
    location: "Lomé",
    price: "Sur devis",
    image: u("1541888946425-d81bb19240f5"),
  },
  {
    id: "g5",
    offer: "service",
    type: "division",
    title: "Plan de division 3 lots",
    location: "Baguida",
    price: "Sur devis",
    image: u("1473968512647-3e447244af8f"),
  },
  {
    id: "g6",
    offer: "service",
    type: "chantier",
    title: "Implantation axes et niveaux",
    location: "Chantier Lomé",
    price: "Sur devis",
    image: u("1504307651254-35680f356dfd"),
  },
];

/** Récupère le catalogue correspondant à un domaine. */
export const CATALOGUES = {
  immobilier: CAT_IMMOBILIER,
  architecture: CAT_ARCHITECTURE,
  ingenierie: CAT_INGENIERIE,
  transit: CAT_TRANSIT,
  topographie: CAT_TOPOGRAPHIE,
};
