import { useEffect, useState } from 'react';
import { SITE_VIDEOS } from '../assets/images';

/**
 * VideoGallery.jsx — Section vidéos de chantiers.
 *
 * Affiche les vidéos de chantier du client, avec des affiches locales.
 *
 * Chaque vidéo est affichée dans une vignette cliquable avec affiche (poster).
 * Au clic, la vidéo se lit en plein écran (lightbox) avec les contrôles natifs.
 *
 * 👉 Pour ajouter une vidéo : déposer le fichier dans `public/videos` puis
 *    l'ajouter à SITE_VIDEOS dans `src/assets/images.js`.
 */

export function VideoGallery({
  title,
  subtitle,
  playLabel,
  clipLabel,
  moreLabel,
  lessLabel,
  closeLabel,
}) {
  const [active, setActive] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const all = SITE_VIDEOS;
  const visibleVideos = showAll ? all : all.slice(0, 6);

  useEffect(() => {
    if (!active) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActive(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [active]);

  return (
    <section className="bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
            {clipLabel}
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          {subtitle && <p className="text-slate-300 mt-3 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleVideos.map((v, i) => (
            <button
              key={v.src}
              type="button"
              onClick={() => setActive({ ...v, index: i })}
              className="group relative aspect-video overflow-hidden bg-slate-900 text-left shadow-lg ring-1 ring-white/10 transition hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              aria-label={`${playLabel} ${i + 1}`}
            >
              <img
                src={v.poster}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-75"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/5 to-slate-950/20" />
              <span className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/90">
                {clipLabel} {String(i + 1).padStart(2, '0')}
              </span>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-slate-950/40 text-white shadow-lg backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-primary-600">
                  <svg className="ml-0.5 h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </span>
              <span className="absolute bottom-4 left-4 text-xs font-medium text-white/75 tabular-nums">
                {i + 1} / {all.length}
              </span>
            </button>
          ))}
        </div>

        {!showAll && all.length > visibleVideos.length && (
          <div className="mt-9 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-slate-950"
            >
              {moreLabel} ({all.length})
            </button>
          </div>
        )}
        {showAll && all.length > 6 && (
          <div className="mt-9 text-center">
            <button
              type="button"
              onClick={() => setShowAll(false)}
              className="border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-slate-950"
            >
              {lessLabel}
            </button>
          </div>
        )}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${clipLabel} ${active.index + 1}`}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label={closeLabel}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <figure className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <video
              key={active.src}
              src={active.src}
              poster={active.poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="max-h-[80vh] w-full bg-black shadow-2xl"
            />
            <figcaption className="text-center text-white/80 text-sm mt-3 tabular-nums">
              {clipLabel} {String(active.index + 1).padStart(2, '0')} · {active.index + 1} / {all.length}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
