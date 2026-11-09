import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { CHANTIERS } from '../assets/chantiers';

/**
 * ChantierGallery.jsx — Galerie des médias du client ORGANISÉE PAR CHANTIER.
 *
 * Remplace l'ancien affichage à plat (PhotoGallery + VideoGallery) par une
 * vraie galerie par chantier :
 *   - Onglets pour choisir le chantier (nom traduit + compteur de médias).
 *   - En-tête du chantier : phase, nom, résumé, compteurs photos/vidéos.
 *   - Grille des vidéos puis grille des photos (mosaïque) du chantier actif.
 *   - Visionneuse plein écran UNIFIÉE (photos ET vidéos) avec navigation
 *     précédent/suivant, fermeture par Échap / clic / croix, scroll verrouillé.
 *
 * Données : src/assets/chantiers.js. Libellés : t.realisationPage.chantiers.
 */

// Nombre de photos affichées avant « Voir les photos ».
const PHOTO_STEP = 12;

export function ChantierGallery() {
  const { t } = useLanguage();
  const c = t.realisationPage.chantiers;

  const [activeId, setActiveId] = useState(CHANTIERS[0].id);
  const [photoCount, setPhotoCount] = useState(PHOTO_STEP);
  // viewer = { type: 'photo' | 'video', list, index }
  const [viewer, setViewer] = useState(null);

  const chantier = CHANTIERS.find((x) => x.id === activeId) || CHANTIERS[0];
  const info = c.items[chantier.id];
  const photos = chantier.photos.slice(0, photoCount);

  const selectChantier = (id) => {
    setActiveId(id);
    setPhotoCount(PHOTO_STEP);
    setViewer(null);
  };
  const openViewer = (type, list, index) => setViewer({ type, list, index });
  const closeViewer = useCallback(() => setViewer(null), []);
  const step = useCallback(
    (dir) =>
      setViewer((v) =>
        v ? { ...v, index: (v.index + dir + v.list.length) % v.list.length } : v,
      ),
    [],
  );

  // Navigation clavier + verrou du scroll quand la visionneuse est ouverte.
  useEffect(() => {
    if (!viewer) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') closeViewer();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [viewer, closeViewer, step]);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {c.kicker}
          </p>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{c.title}</h2>
          {c.sub && <p className="text-gray-600 mt-3 max-w-2xl mx-auto">{c.sub}</p>}
        </div>

        {/* Onglets chantiers */}
        <div className="flex flex-wrap justify-center gap-3 mb-10" role="tablist">
          {CHANTIERS.map((ch) => {
            const on = ch.id === activeId;
            const count = ch.photos.length + ch.videos.length;
            return (
              <button
                key={ch.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => selectChantier(ch.id)}
                className={`px-5 py-2.5 rounded-[2px] border text-sm font-semibold transition-colors ${
                  on
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary-600 hover:text-primary-600'
                }`}
              >
                {c.items[ch.id].name}
                <span
                  className={`ml-2 tabular-nums text-xs ${on ? 'text-white/75' : 'text-gray-400'}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* En-tête du chantier actif */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-primary-600">
            {info.phase}
          </span>
          <h3 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">{info.name}</h3>
          <p className="text-gray-600 mt-3 leading-relaxed">{info.summary}</p>
          <p className="mt-3 text-xs font-medium text-gray-400 tabular-nums">
            {chantier.videos.length} {c.videos} · {chantier.photos.length} {c.photos}
          </p>
        </div>

        {/* Vidéos du chantier */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {chantier.videos.map((v, i) => (
            <button
              key={v.src}
              type="button"
              onClick={() => openViewer('video', chantier.videos, i)}
              className="group relative aspect-video overflow-hidden bg-slate-900 text-left shadow-lg ring-1 ring-black/5 transition hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={`${c.viewVideos} ${i + 1}`}
            >
              <img
                src={v.poster}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-75"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-slate-950/40 text-white shadow-lg backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-primary-600">
                  <svg className="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Photos du chantier (mosaïque) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {photos.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => openViewer('photo', chantier.photos, i)}
              className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 aspect-[4/3] bg-gray-100"
              aria-label={`${c.viewPhotos} ${i + 1}`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <span className="absolute inset-0 bg-primary-950/0 group-hover:bg-primary-950/25 transition-colors" />
            </button>
          ))}
        </div>

        {photoCount < chantier.photos.length && (
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => setPhotoCount((n) => n + PHOTO_STEP)}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-[2px] text-sm font-semibold hover:bg-primary-700 transition-colors"
            >
              {c.viewPhotos} ({chantier.photos.length - photoCount})
            </button>
          </div>
        )}
      </div>

      {viewer && (
        <MediaLightbox
          type={viewer.type}
          list={viewer.list}
          index={viewer.index}
          labels={c}
          onClose={closeViewer}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}
    </section>
  );
}

/**
 * MediaLightbox — Visionneuse plein écran UNIFIÉE (photo OU vidéo).
 * - type 'photo' : list = tableau d'URL, on affiche list[index].
 * - type 'video' : list = tableau { src, poster }, on lit list[index].src.
 * Navigation précédent/suivant cyclique, fermeture Échap / clic / croix.
 */
function MediaLightbox({ type, list, index, labels, onClose, onPrev, onNext }) {
  const item = list[index];
  const isVideo = type === 'video';
  const src = isVideo ? item.src : item;
  const poster = isVideo ? item.poster : item;
  const total = list.length;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={labels.closeMedia}
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label={labels.prev}
        className="absolute left-3 sm:left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>

      <figure className="max-h-[85vh] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
        {isVideo ? (
          <video
            key={src}
            src={src}
            poster={poster}
            controls
            autoPlay
            playsInline
            className="max-h-[80vh] max-w-[90vw] bg-black shadow-2xl rounded"
          />
        ) : (
          <img
            src={src}
            alt=""
            className="max-h-[80vh] max-w-[90vw] object-contain rounded shadow-2xl"
          />
        )}
        <figcaption className="text-center text-white/80 text-sm mt-3 tabular-nums">
          {isVideo ? labels.viewVideos : labels.viewPhotos} · {index + 1} / {total}
        </figcaption>
      </figure>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label={labels.next}
        className="absolute right-3 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}
