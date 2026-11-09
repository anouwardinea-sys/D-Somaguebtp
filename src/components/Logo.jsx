﻿/**
 * Logo.jsx — Logo officiel D. SOMAGUE INGENIERIE.
 *
 * UTILISE EXACTEMENT LE FICHIER DU CLIENT.
 * Le logo affiché est l'image `public/logo.png` — le logo officiel officiel
 * « D Somague Ingénierie » (plaque bleue, D blanc, mot-symbole). Il n'est ni
 * redessiné, ni modifié, ni recoloré. Il sert dans l'en-tête du site, le pied
 * de page et comme favicon (voir index.html).
 *
 * POUR REMPLACER LE LOGO : déposer un nouveau fichier nommé `logo.png`
 * dans le dossier `public/`. Rien d'autre à faire.
 */
import { useState } from 'react';

export function Logo({ className = 'h-11 w-auto', variant = 'light' }) {
  const [missing, setMissing] = useState(false);
  const taglineColor = variant === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <span className="inline-flex flex-col items-center gap-0.5">
      {missing ? (
        <span className={`font-extrabold tracking-tight leading-none ${variant === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          D. SOMAGUE <span className="text-primary-600">INGENIERIE</span>
        </span>
      ) : (
        <img
          src="/logo.png"
          alt="D. Somague Ingenierie"
          className={className}
          onError={() => setMissing(true)}
        />
      )}
      <span className={`whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.14em] leading-none ${taglineColor}`}>
        BTP · ENGINEERING
      </span>
    </span>
  );
}
