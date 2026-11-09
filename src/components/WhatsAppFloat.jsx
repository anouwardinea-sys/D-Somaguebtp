import { SITE, waUrl } from '../config';
/**
 * WhatsAppFloat.jsx - Bouton flottant WhatsApp en bas à droite
 * 
 * Fonctionnalités :
 * - Icône WhatsApp colorée (verts) avec ombres portées
 * - Bouton au clic pour ouvrir WhatsApp avec le numéro pré-rempli
 * - Interface responsive avec dimension et position fixes
 * - Raccourci clavier : Ctrl/Cmd + W pour ouvrir WhatsApp
 * - Animation d'ouverture de la fenêtre de chat
 * 
 * NOTE : Le numéro WhatsApp est défini dans le composant.
 * Il faudra le mettre à jour avec le numéro officiel de l'entreprise.
 */
import { useState, useEffect } from 'react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { useLanguage } from '../i18n/LanguageContext';

/**
 * WhatsAppFloat - Bouton flottant d'appel WhatsApp
 * @returns {JSX.Element} Bouton flottant + fenêtre de chat when open
 */
export function WhatsAppFloat() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Ouvre ou ferme le menu WhatsApp et gère l'ouverture du navigateur
   */
  const toggleWhatsApp = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      window.open(waUrl(), '_blank');
    }
  };

  // Gestion du raccourci clavier (Ctrl/Cmd + W)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'w' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleWhatsApp();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Bouton flottant principal */}
      <button
        onClick={toggleWhatsApp}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-400/50"
        aria-label={t.waFloat.callLabel}
      >
        <WhatsAppIcon className="w-8 h-8" />
      </button>

      {/* Fenêtre de chat qui s'affiche when open */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-40 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">{t.waFloat.title}</h3>
            <button
              onClick={toggleWhatsApp}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={t.waFloat.close}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {t.waFloat.text}
          </p>
          <a
            href={waUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span>{t.waFloat.open}</span>
          </a>
        </div>
      )}
    </>
  );
}
