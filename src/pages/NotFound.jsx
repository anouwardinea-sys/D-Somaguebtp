import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

/**
 * NotFound.jsx — Page 404 (route inconnue).
 *
 * Affiche un message clair + liens de secours (accueil, contact).
 * Auparavant, les URLs inconnues redirigeient silencieusement vers l'accueil ;
 * une page 404 dédiée est meilleure pour l'expérience utilisateur et le SEO.
 */
export function NotFound() {
  const { t } = useLanguage();
  const nf = t.notFound;

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 blueprint-bg opacity-40" aria-hidden="true" />
      <div className="relative max-w-xl mx-auto px-4 text-center py-20">
        <p className="text-[7rem] sm:text-[9rem] font-extrabold leading-none text-primary-600/20 select-none">{nf.code}</p>
        <h1 className="-mt-6 text-3xl sm:text-4xl font-extrabold text-gray-900">{nf.title}</h1>
        <p className="mt-4 text-gray-600">{nf.text}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-[2px] text-sm font-semibold hover:bg-primary-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            {nf.back}
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-[2px] text-sm font-semibold hover:border-primary-600 hover:text-primary-600 transition-colors"
          >
            {nf.contact}
          </Link>
        </div>
      </div>
    </section>
  );
}
