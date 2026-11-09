/**
 * LanguageSwitcher.jsx — Basculeur de langue FR / EN.
 *
 * Pilule compacte « FR | EN » affichée dans le Header (desktop + mobile).
 * La langue est persistée (localStorage) et appliquée à <html lang>.
 */
import { useLanguage } from '../i18n/LanguageContext';

export function LanguageSwitcher({ compact = false }) {
  const { lang, setLang } = useLanguage();

  const btn = (code, label) => (
    <button
      key={code}
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      aria-label={code === 'fr' ? 'Passer en français' : 'Switch to English'}
      className={`px-2.5 ${compact ? 'py-1' : 'py-1.5'} text-[12px] font-bold rounded-full transition-colors ${
        lang === code
          ? 'bg-primary-600 text-white shadow-sm'
          : 'text-gray-500 hover:text-primary-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div
      role="group"
      aria-label="Langue / Language"
      className="inline-flex items-center gap-0.5 bg-gray-100 rounded-full p-0.5 border border-gray-200"
    >
      {btn('fr', 'FR')}
      <span className="w-px h-4 bg-gray-300" aria-hidden="true" />
      {btn('en', 'EN')}
    </div>
  );
}
