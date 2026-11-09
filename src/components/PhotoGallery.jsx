import { useState, useEffect, useCallback } from 'react';
import { photo } from '../assets/images';

/**
 * PhotoGallery.jsx — Galerie des vraies photos de chantiers du client.
 *
 * Les photos sont déposées dans `public/images/realisations/`
 * (photo-001.jpg … photo-173.jpg) et servies à l'URL `/images/realisations/...`.
 *
 * Fonctionnement :
 *  - Grille responsive (mosaïque) avec chargement paresseux (loading="lazy").
 *  - Clic sur une photo -> visionneuse plein écran (lightbox) avec navigation
 *    précédent/suivant, fermeture par Échap / clic / croix.
 *
 * 👉 Pour ajouter des photos : déposer les fichiers dans
 *    `public/images/realisations/` puis augmenter `TOTAL` ci-dessous.
 */

// Nombre de photos disponibles dans public/images/realisations/.
const TOTAL = 173;
// Nombre de photos affichées avant de cliquer « Voir plus ».
const STEP = 24;

export function PhotoGallery({ title, subtitle, moreLabel }) {
  const [visible, setVisible] = useState(STEP);
  const [lightbox, setLightbox] = useState(null); // index de la photo ouverte, ou null
  const count = Math.min(visible, TOTAL);
  const photos = Array.from({ length: count }, (_, i) => photo(i + 1));

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i === null ? null : (i - 1 + TOTAL) % TOTAL)), []);
  const next = useCallback(() => setLightbox((i) => (i === null ? null : (i + 1) % TOTAL)), []);

  // Navigation clavier dans la visionneuse.
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, close, prev, next]);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-gray-600 mt-3 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {photos.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setLightbox(i)}
              className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 aspect-[4/3] bg-gray-100"
              aria-label={`${title} — photo ${i + 1}`}
            >
              <img
                src={src}
                alt={`Chantier D-SOMAGUE — photo ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <span className="absolute inset-0 bg-primary-950/0 group-hover:bg-primary-950/25 transition-colors" />
              <span className="absolute bottom-2 right-2 text-[11px] font-semibold text-white bg-black/45 backdrop-blur-sm px-2 py-0.5 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                {i + 1} / {TOTAL}
              </span>
            </button>
          ))}
        </div>

        {count < TOTAL && (
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => setVisible((v) => v + STEP)}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-[2px] text-sm font-semibold hover:bg-primary-700 transition-colors"
            >
              {(moreLabel || 'Voir plus de photos') + ` (${TOTAL - count})`}
            </button>
          </div>
        )}

        {lightbox !== null && (
          <Lightbox
            src={photos[lightbox]}
            index={lightbox}
            total={TOTAL}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </div>
    </section>
  );
}
/** Visionneuse plein écran (sous-composant interne). */
function Lightbox({ src, index, total, onClose, onPrev, onNext }) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Photo precedente"
        className="absolute left-3 sm:left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>

      <figure className="max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={`Chantier D-SOMAGUE - photo ${index + 1}`}
          className="max-h-[80vh] max-w-[90vw] object-contain rounded shadow-2xl"
        />
        <figcaption className="text-center text-white/80 text-sm mt-3 tabular-nums">
          {index + 1} / {total}
        </figcaption>
      </figure>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Photo suivante"
        className="absolute right-3 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}
