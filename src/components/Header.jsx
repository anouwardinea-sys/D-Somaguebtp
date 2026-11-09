import { SITE, waUrl } from '../config';
/**
 * Header.jsx - En-tête fixe et navigation du site
 * 
 * Fonctionnalités principales :
 * - Logo : Symbole 'DS' avec nom de l'entreprise (D-SOMAGUE INGÉNIERIE)
 * - Menu desktop : Navigation permanente (Accueil, À propos, Services, Réalisations, Contact)
 * - Menu mobile : Bouton hamburger pour afficher le menu sur petits écrans
 * - Boutons d'action :
 *   • Téléphone : Appel rapide (numéro dans src/config.js)
 *   • WhatsApp : Politique de confidentialité
 * - Effet de défilement : Changement de style quand l'utilisateur fait défiler la page
 * 
 * Responsive : Affiche le menu complet sur desktop, menu burger sur mobile.
 */
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { DomainNavigation } from './home/DomainNavigation';
import { DOMAIN_IMAGES } from '../assets/images';
import { Logo } from './Logo';

/** Icônes/émojis associés à chaque domaine (menu déroulant du header). */
const DOMAIN_ICONS = {
  architecture: '🏛️',
  ingenierie: '🏗️',
  immobilier: '🏠',
  transit: '🚚',
  topographie: '🗺️',
};

/**
 * Header - Composant d'en-tête principal
 * @returns {JSX.Element} En-tête avec logo, menu et actions
 */
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t, lang } = useLanguage();

  // Liste des liens de navigation — « Services » contient le sous-menu des domaines
  const navItems = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/about' },
    {
      label: t.nav.services,
      path: '/services',
      submenu: [
        { id: 'architecture', label: t.nav.sub.architecture.label, desc: t.nav.sub.architecture.desc },
        { id: 'ingenierie', label: t.nav.sub.ingenierie.label, desc: t.nav.sub.ingenierie.desc },
        { id: 'immobilier', label: t.nav.sub.immobilier.label, desc: t.nav.sub.immobilier.desc },
        { id: 'transit', label: t.nav.sub.transit.label, desc: t.nav.sub.transit.desc },
        { id: 'topographie', label: t.nav.sub.topographie.label, desc: t.nav.sub.topographie.desc },
      ],
    },
    { label: t.nav.realisations, path: '/realisations' },
    { label: t.nav.news, path: '/actualites' },
    { label: t.nav.contact, path: '/contact' },
  ];

  const [openSub, setOpenSub] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Progression du défilement (0 → 1) pour la barre du header.
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleMobileToggle = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Ferme le panneau déroulant après un clic sur un domaine.
   *
   * ⚠️ CORRECTIF IMPORTANT : la version précédente faisait un
   * `e.preventDefault()` lorsqu'on était déjà sur /services, ce qui
   * EMPÊCHAIT la navigation vers la page dédiée du domaine et laissait
   * l'utilisateur bloqué sur la page Services. Désormais chaque entrée du
   * menu mène TOUJOURS à sa page dédiée (/domain/...).
   */
  const handleSubLink = () => {
    setOpenSub(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-gray-100 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}
    >
      {/* ===== BARRE SUPÉRIEURE (infos pratiques) — masquée au scroll ===== */}
      <div className={`hidden md:block bg-neutral-950 text-gray-300 overflow-hidden transition-all duration-300 ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6 whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {SITE.address[lang]}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {SITE.hours[lang]}
            </span>
          </div>
          <div className="flex items-center gap-5 whitespace-nowrap">
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              {SITE.email}
            </a>
            <a href={`tel:${SITE.mobileIntl}`} className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              {SITE.mobileDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo officiel (fichier public/logo.png) */}
          <Link to="/" className="flex items-center shrink-0" aria-label="D. Somague Ingénierie — Accueil">
            <Logo className="h-14 w-auto object-contain" />
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.submenu ? (
                /* Entrée avec sous-menu déroulant (hover) */
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => setOpenSub(true)}
                  onMouseLeave={() => setOpenSub(false)}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wide transition-all duration-300 relative group pb-1.5 hover:-translate-y-0.5 ${location.pathname === item.path ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
                  >
                    {item.label}
                    <svg className={`w-3 h-3 transition-transform duration-200 ${openSub ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                    {/* Soulignement animé : plein sur la page active, déploié au survol */}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full origin-left transition-transform duration-300 ease-out ${
                        location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>

                  {/* Panneau déroulant */}
                  <div className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-200 ${openSub ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                    <div className="w-80 bg-white rounded shadow-lg border border-gray-100 overflow-hidden">
                      <div className="px-5 py-3 bg-neutral-950 text-white">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-500">{t.nav.panelKicker}</p>
                        <p className="text-sm font-semibold">{t.nav.panelTitle}</p>
                      </div>
                      <div className="p-2 space-y-1">
                        {item.submenu.map((sub) => (
                          <div key={sub.id} className="relative">
                            <Link
                              to={`/domain/${sub.id}`}
                              onClick={() => handleSubLink()}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-primary-50 transition-colors group"
                            >
                              {/* Image du domaine (unique par domaine) */}
                              <div className="relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shadow-sm ring-1 ring-black/5">
                                <img
                                  src={DOMAIN_IMAGES[sub.id]}
                                  alt={sub.label}
                                  loading="lazy"
                                  className="w-full h-full object-cover"
                                />
                                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center text-sm">
                                  {DOMAIN_ICONS[sub.id]}
                                </span>
                              </div>
                              {/* Informations */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 truncate">{sub.label}</h4>
                                <p className="text-xs text-gray-500 mt-0.5">{sub.desc}</p>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                        <Link to="/services" onClick={() => setOpenSub(false)} className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-primary-600 hover:text-primary-700">
                          {t.nav.panelAll}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H4" /></svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-xs font-bold uppercase tracking-wide transition-all duration-300 relative group pb-1.5 hover:-translate-y-0.5 ${location.pathname === item.path ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
                >
                  {item.label}
                  {/* Soulignement animé : plein sur la page active, déploié au survol */}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full origin-left transition-transform duration-300 ease-out ${
                      location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              )
            ))}
          </nav>

          {/* Actions desktop */}
          <div className="hidden md:flex items-center gap-5 shrink-0">
            <LanguageSwitcher compact />

            {/* Téléphone : icône + numéro sur une seule ligne, jamais coupé */}
            <a
              href={`tel:${SITE.phoneIntl}`}
              className="hidden lg:inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-primary-600 transition-colors whitespace-nowrap"
            >
              <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {SITE.phoneDisplay}
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-[2px] text-[13px] font-semibold hover:bg-primary-700 transition-colors whitespace-nowrap"
            >
              {t.nav.quote}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H4" /></svg>
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher compact />
            <button onClick={handleMobileToggle} className="p-2 rounded-lg text-gray-600 hover:text-primary-600 transition-colors" aria-label={t.nav.menu} aria-expanded={isOpen}>
            <svg className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">{isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}</svg>
          </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              item.submenu ? (
                /* Entrée avec sous-menu : accordéon */
                <div key={item.path} className="px-4 py-2 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-sm font-semibold py-2 ${location.pathname === item.path ? 'text-primary-600' : 'text-gray-800'}`}
                    >
                      {item.label}
                    </Link>
                    <button
                      onClick={() => setOpenSub(!openSub)}
                      aria-label={t.nav.showDomains}
                      className="p-2 text-gray-500"
                    >
                      <svg className={`w-4 h-4 transition-transform duration-200 ${openSub ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                  </div>
                  {openSub && (
                    <ul className="mt-1 space-y-1 border-t border-gray-200 pt-2">
                      {item.submenu.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            to={`/domain/${sub.id}`}
                            onClick={() => { handleSubLink(); setIsOpen(false); }}
                            className="flex items-center gap-2 py-2 pl-2 pr-3 rounded-lg text-sm text-gray-600 hover:bg-white hover:text-primary-600 transition-all duration-300 hover:translate-x-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:translate-x-1 ${location.pathname === item.path ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'}`}
                >
                  {item.label}
                </Link>
              )
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col space-y-3">
              <a href={`tel:${SITE.phoneIntl}`} className="text-sm text-gray-600 hover:text-primary-600">
                {SITE.phoneDisplay}
              </a>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-5 py-2.5 rounded-[2px] text-[13px] font-semibold hover:bg-primary-700 transition-colors"
              >
                <span>{t.nav.quote}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H4" /></svg>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ===== BARRE DE PROGRESSION DE DÉFILEMENT =====
          Se remplit au fur et à mesure que l'on descend et se vide en remontant. */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-primary-600 via-primary-500 to-amber-400 shadow-[0_0_8px_rgba(219,39,119,0.6)]"
          style={{ width: `${scrollProgress * 100}%`, transition: 'width 120ms linear' }}
        />
      </div>
    </header>
  );
}
