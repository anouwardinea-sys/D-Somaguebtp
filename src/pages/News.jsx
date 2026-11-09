/**
 * News.jsx — Page publique des actualités (liste + filtres par catégorie).
 *
 * Les articles viennent du store (store.js) → ils sont donc modifiables
 * depuis l'espace admin, et la page se met à jour automatiquement.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useNews } from '../store';
import { PageHero } from '../components/PageHero';

/** Formate une date ISO (2026-09-15) en français : 15 septembre 2026. */
export function formatDate(iso, lang = 'fr') {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function News() {
  const { t } = useLanguage();
  const n = t.news;
  const articles = useNews();
  const [cat, setCat] = useState('all');

  // Catégories réellement présentes dans les articles.
  const categories = useMemo(
    () => ['all', ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean)))],
    [articles]
  );

  const visible = useMemo(
    () => (cat === 'all' ? articles : articles.filter((a) => a.category === cat)),
    [articles, cat]
  );

  // Tri par date décroissante (les plus récents d'abord).
  const sorted = useMemo(
    () => [...visible].sort((a, b) => String(b.date).localeCompare(String(a.date))),
    [visible]
  );

  return (
    <>
      {/* ===== BANDEAU ===== */}
      <PageHero
        kicker={n.kicker}
        title={n.title}
        subtitle={n.subtitle}
        image={sorted[0]?.image}
        crumb={t.nav.news}
      />

      {/* ===== FILTRES ===== */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-1.5 rounded-[2px] border text-sm font-semibold transition-colors ${
                  cat === c
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary-600 hover:text-primary-600'
                }`}
              >
                {c === 'all' ? n.all : c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LISTE ===== */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sorted.length === 0 ? (
            <p className="text-center text-gray-500 py-16">
              {cat === 'all' ? n.empty : n.emptyCategory}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sorted.map((a) => (
                <article key={a.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <Link to={`/actualites/${a.id}`} className="relative h-52 overflow-hidden block">
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {a.category && (
                      <span className="absolute top-3 left-3 bg-primary-600 text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-[2px] shadow-md">
                        {a.category}
                      </span>
                    )}
                  </Link>
                  <div className="p-6 flex-1 flex flex-col">
                    <time className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                      {formatDate(a.date)}
                    </time>
                    <h2 className="font-bold text-gray-900 text-lg mt-2 leading-snug group-hover:text-primary-600 transition-colors">
                      <Link to={`/actualites/${a.id}`}>{a.title}</Link>
                    </h2>
                    <p className="text-gray-600 text-sm mt-3 leading-relaxed flex-1">{a.excerpt}</p>
                    <Link
                      to={`/actualites/${a.id}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-600 hover:gap-3 transition-all"
                    >
                      {n.readMore}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H4" /></svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
