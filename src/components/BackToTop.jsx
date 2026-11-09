import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

/**
 * BackToTop.jsx — Bouton « retour en haut » apparaissant au défilement.
 *
 * Améliore l'ergonomie sur les longues pages (réalisations, actualités…).
 * Placé au-dessus du bouton WhatsApp flottant pour éviter le chevauchement.
 */
export function BackToTop() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const label = lang === 'en' ? 'Back to top' : 'Remonter en haut';

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={label}
      title={label}
      className={`fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full bg-gray-900 hover:bg-primary-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
    </button>
  );
}
