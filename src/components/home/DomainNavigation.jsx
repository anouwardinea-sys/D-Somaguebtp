/**
 * DomainNavigation.jsx - Menu dÃƒÆ’Ã‚Â©roulant des domaines avec images
 * 
 * Affiche les 5 domaines avec :
 * - Image de fond ou icÃƒÆ’Ã‚Â´ne
 * - Titre du domaine
 * - Description courte
 * - Bouton pour ouvrir la page complÃƒÆ’Ã‚Â¨te
 */
import { useLanguage } from '../../i18n/LanguageContext';
import { enDomainPages, enDomainCommon } from '../../i18n/dict_en_domainpages';
import { frDomainPages, frDomainCommon } from '../../i18n/dict_fr_domainpages';

export function DomainNavigation({ compact = false }) {
  const { t, lang } = useLanguage();
  const domainPages = lang === 'fr' ? frDomainPages : enDomainPages;
  const domainCommon = lang === 'fr' ? frDomainCommon : enDomainCommon;

  const getDomainImage = (domain) => {
    // Images spÃƒÆ’Ã‚Â©cifiques par domaine
    const images = {
      architecture: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80',
      ingenierie: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80',
      immobilier: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80',
      transit: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=400&q=80',
      topographie: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=400&q=80',
    };
    return images[domain.id] || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80';
  };

  const getDomainIcon = (domain) => {
    const icons = {
      architecture: 'ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â',
      ingenierie: 'ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â',
      immobilier: 'ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â ',
      transit: 'ÃƒÂ°Ã…Â¸Ã…Â¡Ã…Â¡',
      topographie: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â',
    };
    return icons[domain.id] || 'ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â';
  };

  return (
    <div className={`relative ${compact ? 'hidden' : 'block'}`}>
      <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden">
        {/* En-tÃƒÆ’Ã‚Âªte du menu dÃƒÆ’Ã‚Â©roulant */}
        <div className="bg-primary-600 px-4 py-3">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
            <span>{domainCommon.guaranteeTitle}</span>
            <span className="text-xs font-normal">/</span>
            <span className="text-white/80">{t.nav.sub.architecture.label}</span>
          </h3>
        </div>

        {/* Liste des domaines */}
        <div className="p-2 space-y-1">
          {domainPages.map((domain) => (
            <div key={domain.id} className="group relative cursor-pointer">
              <button
                onClick={() => window.open(`/domain/${domain.id}`, '_blank')}
                className="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md text-left"
              >
                {/* Image du domaine */}
                <div className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-white shadow-sm">
                  <img
                    src={getDomainImage(domain)}
                    alt={domain.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-overlay flex items-center justify-center">
                    <span className="text-2xl">{getDomainIcon(domain)}</span>
                  </div>
                </div>

                {/* Informations */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 truncate">{domain.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {domain.tagline}
                  </p>
                </div>

                {/* IcÃƒÆ’Ã‚Â´ne flÃƒÆ’Ã‚Â¨che */}
                <div className="flex-shrink-0 text-gray-400 group-hover:text-primary-600 transition-colors">
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Pied du menu */}
        <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            {domainCommon.guaranteeSub}
          </p>
          <button className="w-full mt-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
            {domainCommon.ctaBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
