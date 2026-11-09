/**
 * DomainIcons.jsx — Bibliothèque d'icônes SVG vectorielles du site.
 *
 * Objectif : remplacer les emojis et les SVG inline dispersés par un jeu
 * d'icônes cohérent (même grille 24x24, même épaisseur de trait, même
 * traitement `currentColor`). Toutes les icônes acceptent `className`
 * pour contrôler taille et couleur depuis le composant appelant.
 *
 * Convention : `<Icon className="w-6 h-6" />`
 */

/** Enveloppe commune : assure une grille, un trait et des extrémités identiques. */
function Svg({ className = 'w-6 h-6', children, ...rest }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* =========================================================
 * Icônes des 5 domaines métiers
 * ========================================================= */

/** Architecture : plan de bâtiment + équerre. */
export function IconArchitecture(props) {
  return (
    <Svg {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V8l7-5 7 5v13" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 11h.01M15 11h.01" />
    </Svg>
  );
}

/** Ingénierie / BTP : grue de chantier. */
export function IconEngineering(props) {
  return (
    <Svg {...props}>
      <path d="M6 21h12" />
      <path d="M9 21V4" />
      <path d="M9 5h9l-3 3" />
      <path d="M9 9h-3" />
      <path d="M13 5v3" />
      <path d="M13 8h3" />
    </Svg>
  );
}

/** Immobilier : immeuble + clé. */
export function IconRealEstate(props) {
  return (
    <Svg {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V7a1 1 0 011-1h6a1 1 0 011 1v14" />
      <path d="M13 21V11h5a1 1 0 011 1v9" />
      <path d="M8 10h.01M8 14h.01M16 14h.01" />
    </Svg>
  );
}

/** Transit & logistique : camion. */
export function IconFreight(props) {
  return (
    <Svg {...props}>
      <path d="M3 6h10v9H3z" />
      <path d="M13 9h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
      <path d="M9 18h6" />
    </Svg>
  );
}

/** Topographie : trépied + mire. */
export function IconSurveying(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="6" r="2.2" />
      <path d="M12 8.2V14" />
      <path d="M6 21l6-7 6 7" />
      <path d="M4 21h16" />
    </Svg>
  );
}

/* =========================================================
 * Icônes transverses (process, valeurs, admin, UI)
 * ========================================================= */

export function IconCompass(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </Svg>
  );
}

export function IconRuler(props) {
  return (
    <Svg {...props}>
      <path d="M3 15l6-6 6 6-6 6z" />
      <path d="M7 11l2 2M9 9l2 2M5 13l2 2" />
    </Svg>
  );
}

export function IconShield(props) {
  return (
    <Svg {...props}>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </Svg>
  );
}

export function IconHandshake(props) {
  return (
    <Svg {...props}>
      <path d="M3 12l3-3 4 4 2-2" />
      <path d="M21 12l-3-3-3 3" />
      <path d="M10 13l2 2 3-3" />
      <path d="M12 12l-4 4-2-2" />
    </Svg>
  );
}

export function IconSparkle(props) {
  return (
    <Svg {...props}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
      <path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
    </Svg>
  );
}

export function IconChart(props) {
  return (
    <Svg {...props}>
      <path d="M3 3v18h18" />
      <path d="M7 15l3-3 3 3 4-6" />
    </Svg>
  );
}

export function IconClock(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Svg>
  );
}

export function IconTarget(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </Svg>
  );
}

export function IconLayers(props) {
  return (
    <Svg {...props}>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </Svg>
  );
}

export function IconCheck(props) {
  return (
    <Svg {...props}>
      <path d="M5 13l4 4L19 7" />
    </Svg>
  );
}

export function IconArrowRight(props) {
  return (
    <Svg {...props}>
      <path d="M4 12h16" />
      <path d="M14 6l6 6-6 6" />
    </Svg>
  );
}

export function IconPhone(props) {
  return (
    <Svg {...props}>
      <path d="M4 4h4l2 5-2.5 1.5a12 12 0 006 6L15 14l5 2v4a1 1 0 01-1 1A16 16 0 013 5a1 1 0 011-1z" />
    </Svg>
  );
}

export function IconMail(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </Svg>
  );
}

export function IconPin(props) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

export function IconNews(props) {
  return (
    <Svg {...props}>
      <path d="M4 5h13v14H5a1 1 0 01-1-1z" />
      <path d="M17 8h3v9a2 2 0 01-2 2h-1z" />
      <path d="M7 9h7M7 12h7M7 15h4" />
    </Svg>
  );
}

export function IconLock(props) {
  return (
    <Svg {...props}>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 018 0v3" />
    </Svg>
  );
}

export function IconLogout(props) {
  return (
    <Svg {...props}>
      <path d="M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3" />
      <path d="M10 17l-5-5 5-5" />
      <path d="M5 12h10" />
    </Svg>
  );
}

export function IconPlus(props) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

export function IconEdit(props) {
  return (
    <Svg {...props}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" />
    </Svg>
  );
}

export function IconTrash(props) {
  return (
    <Svg {...props}>
      <path d="M4 7h16" />
      <path d="M10 11v6M14 11v6" />
      <path d="M6 7l1 13a1 1 0 001 1h8a1 1 0 001-1l1-13" />
      <path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" />
    </Svg>
  );
}

export function IconClose(props) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  );
}

export function IconImage(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M21 16l-5-5-6 6-3-3-4 4" />
    </Svg>
  );
}

/**
 * Registre : permet de résoudre une icône par identifiant de domaine
 * (utilisé par les cartes de services, la nav et les pages dédiées).
 */
export const DOMAIN_ICONS = {
  architecture: IconArchitecture,
  ingenierie: IconEngineering,
  immobilier: IconRealEstate,
  transit: IconFreight,
  topographie: IconSurveying,
};

/** Retourne le composant d'icône associé à un id de domaine (fallback : Compass). */
export function getDomainIcon(id) {
  return DOMAIN_ICONS[id] || IconCompass;
}
