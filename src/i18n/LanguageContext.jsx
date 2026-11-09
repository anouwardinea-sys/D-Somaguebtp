/**
 * LanguageContext.jsx — Contexte de langue FR/EN pour tout le site.
 *
 * - `lang` : 'fr' | 'en' (persisté dans localStorage, clé 'dsomague-lang')
 * - `setLang(l)` : change la langue + met à jour <html lang="...">
 * - `t` : dictionnaire de la langue active (importé depuis ./translations)
 *
 * Usage : const { lang, setLang, t } = useLanguage();
 */
import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from './translations';

const LanguageContext = createContext({ lang: 'fr', setLang: () => {}, t: translations.fr });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('dsomague-lang');
      return saved === 'en' ? 'en' : 'fr';
    } catch {
      return 'fr';
    }
  });

  const setLang = (l) => {
    const next = l === 'en' ? 'en' : 'fr';
    setLangState(next);
    try {
      localStorage.setItem('dsomague-lang', next);
    } catch { /* stockage indisponible : on ignore */ }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
