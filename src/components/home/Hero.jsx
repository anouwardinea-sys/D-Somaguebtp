/** Hero institutionnel avec un visuel de chantier et un message stable. */
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

const HERO_IMAGE = '/images/hero-construction.png';

export function Hero() {
  const { t } = useLanguage();
  const message = t.hero;

  return (
    <section className="relative min-h-[88svh] flex flex-col overflow-hidden bg-gray-950 text-white">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_IMAGE}
          alt=""
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />
      </div>

      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-36 pb-16">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
              <span className="h-px w-10 bg-primary-400" />
              {message.kicker}
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              {message.titleA}
              <span className="mt-1 block text-blue-200">{message.titleB}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {message.tagline}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-primary-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-500"
              >
                <span>{message.ctaQuote}</span>
                <span className="flex h-5 w-5 items-center justify-center transition-transform group-hover:translate-x-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H4" /></svg>
                </span>
              </Link>
              <Link
                to="/realisations"
                className="inline-flex items-center gap-2 border border-white/45 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-gray-900"
              >
                {message.ctaRealisations}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/15 bg-slate-950/45 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-5 sm:grid-cols-3 sm:px-6 lg:px-8">
          {message.highlights.map((highlight) => (
            <div key={highlight} className="flex items-center gap-3 text-sm font-medium text-white/85">
              <span className="h-1.5 w-1.5 shrink-0 bg-blue-300" aria-hidden="true" />
              {highlight}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
