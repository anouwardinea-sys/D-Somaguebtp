/**
 * NewsArticle.jsx — Page de détail d'une actualité (/actualites/:id).
 *
 * L'article vient du store (modifiable depuis l'admin). Si l'id n'existe pas,
 * on affiche un message de repli avec un lien de retour.
 */
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import { useNews } from "../store";
import { formatDate } from "./News";

export function NewsArticle() {
  const { id } = useParams();
  const { t } = useLanguage();
  const n = t.news;
  const articles = useNews();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <section className="bg-gray-50 py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">{n.empty}</h1>
          <Link
            to="/actualites"
            className="mt-6 inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-[2px] font-semibold hover:bg-primary-700 transition-colors"
          >
            {n.back}
          </Link>
        </div>
      </section>
    );
  }

  // Articles suggérés : même catégorie, hors article courant (max 3).
  const related = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <>
      {/* ===== BANDEAU IMAGE ===== */}
      <section className="relative min-h-[46vh] flex items-end overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/75 to-gray-950/30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 w-full">
          {article.category && (
            <span className="inline-block bg-primary-600 text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-[2px] mb-4">
              {article.category}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {article.title}
          </h1>
          <p className="text-gray-300 mt-4">
            {n.publishedOn}{" "}
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </p>
        </div>
      </section>

      {/* ===== CORPS DE L'ARTICLE ===== */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/actualites"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            {n.back}
          </Link>

          {/* Chapô en avant */}
          {article.excerpt && (
            <p className="text-lg text-gray-700 leading-relaxed font-medium border-l-4 border-primary-600 pl-5 mb-8">
              {article.excerpt}
            </p>
          )}

          {/* Corps : chaque ligne/paragraphe séparé par un saut de ligne */}
          <div className="space-y-5 text-gray-600 leading-relaxed">
            {String(article.body || "")
              .split(/\n\s*\n/)
              .filter(Boolean)
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-gray-50 rounded-xl border border-gray-100 text-center">
            <h2 className="text-xl font-bold text-gray-900">{n.ctaTitle}</h2>
            <p className="text-gray-600 mt-2">{n.ctaText}</p>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-[2px] font-semibold hover:bg-primary-700 transition-colors"
            >
              {n.ctaBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== À LIRE AUSSI ===== */}
      {related.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {n.related}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((a) => (
                <Link
                  key={a.id}
                  to={`/actualites/${a.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <time className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                      {formatDate(a.date)}
                    </time>
                    <h3 className="font-bold text-gray-900 mt-2 leading-snug group-hover:text-primary-600 transition-colors">
                      {a.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
