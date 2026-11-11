/**
 * DomainPage.jsx — Gabarit commun des 5 pages « domaine ».
 *
 * ⚠️ POURQUOI CE COMPOSANT ?
 * Les pages DomainArchitecture, DomainIngenierie, DomainImmobilier,
 * DomainTransit et DomainTopographie étaient des copier-coller quasi
 * identiques (seul l'id changeait). Une correction devait être répétée
 * 5 fois — source d'incohérences. Désormais, tout le rendu vit ICI et
 * chaque page ne fait plus qu'appeler <DomainPage id="..." />.
 *
 * Présente chaque domaine avec un bandeau d'ouverture, une galerie de
 * photos, la liste animée de ses tâches et ses prestations détaillées.
 */
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { frDomainPages, frDomainCommon } from '../i18n/dict_fr_domainpages';
import { enDomainPages, enDomainCommon } from '../i18n/dict_en_domainpages';
import { DOMAIN_IMAGES, DOMAIN_GALLERY } from '../assets/images';
import { CATALOGUES } from '../i18n/catalogue';
import { DomainCatalog } from './DomainCatalog';
import { waUrl, waUrlForBranch, SITE } from '../config';
import { useProperties } from '../store';
import { useReveal } from '../hooks/useReveal';

/** DomainPage — page dédiée d'un domaine (voir pages/Domain*.jsx). */
export function DomainPage({ id }) {
  const { lang } = useLanguage();
  const domainPages = lang === 'fr' ? frDomainPages : enDomainPages;
  const domainCommon = lang === 'fr' ? frDomainCommon : enDomainCommon;
  const domain = domainPages.find((d) => d.id === id);

  // ⚠️ Hook appelé AVANT tout retour conditionnel (règle des Hooks React).
  // Les biens immobiliers viennent du store : ce que l'admin ajoute apparaît ici.
  const liveProperties = useProperties();

  // Liste « Tâches » animée au scroll (apparition en cascade) — hook appelé
  // AVANT tout retour conditionnel (règle des Hooks React).
  const { ref: tasksRef, visible: tasksVisible } = useReveal();
  const tasks = (domain && domain.tasks) || [];

  if (!domain) return null;

  // Galerie : série de photos PROPRE au domaine (voir assets/images.js).
  // Le premier visuel sert de grande image ; les suivants complètent la mosaïque.
  const gallery = (DOMAIN_GALLERY[id] || [DOMAIN_IMAGES[id]]).slice(0, 5);
  const guarantees = domainCommon.guarantees || [];

  // Catalogue filtrable du domaine. Pour l'immobilier, on prend les DONNÉES
  // VIVANTES du store (modifiables depuis l'admin) ; pour les autres domaines,
  // le catalogue statique de i18n/catalogue.js.
  const catalogItems = id === 'immobilier' ? liveProperties : (CATALOGUES[id] || []);
  const c = domainCommon.catalog || {};
  // Pôles à contact DÉDIÉ (Transit & Immobilier) : affiche la bande de contact.
  const isDedicated = SITE.transitImmobilierBranches.includes(id);
  const catalogLabels = {
    title: (c.title && c.title[id]) || domain.name,
    subtitle: (c.subtitle && c.subtitle[id]) || '',
    offers: c.offers,
    types: c.types,
    cta: c.cta || 'Contact',
    whatsapp: c.whatsapp || 'WhatsApp',
    empty: c.empty || '',
    note: c.note || '',
  };

  return (
    <>
      {/* ===== BANDEAU D'OUVERTURE (image plein écran) ===== */}
      <section className="relative min-h-[56vh] flex items-end overflow-hidden">
        <img
          src={domain.heroImage || DOMAIN_IMAGES[id]}
          alt={domain.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-gray-950/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 w-full">
          <p className="inline-flex items-center gap-2 text-primary-400 font-bold text-xs uppercase tracking-[0.25em]">
            <span className="w-8 h-[2px] bg-primary-500 inline-block" />
            {domain.heroKicker}
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-white leading-tight max-w-3xl">{domain.name}</h1>
          <p className="mt-4 text-gray-200 text-lg max-w-2xl">{domain.tagline}</p>
        </div>
      </section>

      {/* ===== INTRODUCTION ET VISUEL ===== */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-lg">{domain.intro}</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/contact" className="bg-primary-600 text-white px-6 py-3 rounded-[2px] font-semibold hover:bg-primary-700 transition-colors">
                  {domainCommon.ctaBtn}
                </Link>
                <Link to="/realisations" className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-[2px] font-semibold hover:bg-gray-50 transition-colors">
                  {domainCommon.otherDomains}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden shadow-md group">
                <img
                  src={domain.heroImage || DOMAIN_IMAGES[id]}
                  alt={domain.name}
                  loading="lazy"
                  className="w-full h-64 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT DÉDIÉ (Transit & Immobilier) ===== */}
      {isDedicated && (
        <section className="bg-neutral-950 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-primary-500 font-bold uppercase tracking-[0.25em] text-xs mb-3">
                  {domainCommon.dedicatedKicker}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {domainCommon.dedicatedTitle}
                </h2>
                <p className="text-gray-400 mt-3">
                  {domainCommon.dedicatedSub}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-11 h-11 rounded-full bg-primary-600 text-white flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">{domainCommon.dedicatedPhoneLabel}</p>
                    <a href={`tel:${SITE.transitImmobilierIntl}`} className="text-xl font-extrabold text-white hover:text-primary-400 transition-colors">
                      {SITE.transitImmobilierDisplay}
                    </a>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:${SITE.transitImmobilierIntl}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-[2px] font-semibold hover:bg-primary-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {domainCommon.dedicatedCall}
                  </a>
                  <a
                    href={waUrl(domainCommon.dedicatedWaText, SITE.transitImmobilierWhatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-[2px] font-semibold hover:bg-green-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    {domainCommon.dedicatedWhatsApp}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== GALERIE PHOTOS DU DOMAINE ===== */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:h-[26rem]">
            {gallery.map((src, i) => (
              <div
                key={src}
                className={`group relative overflow-hidden rounded-lg shadow-sm h-40 sm:h-52 md:h-full ${
                  i === 0 ? 'col-span-2 md:col-span-1 md:row-span-2 md:h-full' : ''
                }`}
              >
                <img
                  src={src}
                  alt={i === 0 ? domain.name : ''}
                  aria-hidden={i !== 0}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary-950/10 group-hover:bg-primary-950/0 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TÂCHES (liste animée en cascade) ===== */}
      {tasks.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900">{domainCommon.tasksTitle}</h2>
              <p className="text-gray-600 mt-3">{domainCommon.tasksSub}</p>
            </div>
            {/* Une seule observation pour toute la grille : le décalage
                transition-delay (basé sur l'index) crée l'effet de cascade. */}
            <div ref={tasksRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {tasks.map((task, i) => (
                <div
                  key={task.title}
                  className={`reveal${tasksVisible ? ' reveal-visible' : ''} flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary-300 hover:bg-white hover:shadow-md`}
                  style={{ transitionDelay: `${(i % 2) * 80 + Math.floor(i / 2) * 100}ms` }}
                >
                  <span className="shrink-0 w-10 h-10 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center text-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900">{task.title}</h3>
                    {task.desc && (
                      <p className="text-sm text-gray-600 mt-1">{task.desc}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== PRESTATIONS DÉTAILLÉES ===== */}      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">{domainCommon.servicesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {domain.groups.map((group, gi) => (
              <div key={group.title} className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden card-lift flex flex-col">
                {/* Visuel propre au groupe (image dédiée au domaine) */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={gallery[(gi + 1) % gallery.length]}
                    alt={group.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 right-4 font-bold text-white text-lg drop-shadow">{group.title}</h3>
                </div>
                <ul className="p-6 grid grid-cols-1 gap-2.5 flex-1 content-start">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VITRINE FILTRABLE (biens / projets / prestations) ===== */}
      {catalogItems.length > 0 && (
        <DomainCatalog
          items={catalogItems}
          labels={catalogLabels}
          waHref={waUrlForBranch(id, `${domain.name} — je souhaite des informations sur : `)}
        />
      )}

      {/* ===== LIVRABLES ===== */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">{domainCommon.deliverablesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {domain.deliverables.map((deliverable) => (
              <div key={deliverable} className="p-6 bg-gray-50 rounded-xl text-center hover:bg-primary-50 transition-colors">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <p className="text-gray-600 text-sm">{deliverable}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ENGAGEMENTS ===== */}
      {guarantees.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">{domainCommon.guaranteeTitle}</h2>
            <p className="text-gray-600 text-center mb-12">{domainCommon.guaranteeSub}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {guarantees.map((g) => (
                <div key={g.title} className="bg-white p-6 rounded-xl shadow-sm border-t-2 border-primary-600">
                  <h3 className="font-bold text-gray-900 mb-2">{g.title}</h3>
                  <p className="text-sm text-gray-600">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== MÉTHODE ===== */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">{domainCommon.approachTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {domain.approach.map((step, i) => (
              <div key={step.title} className="text-center p-6 bg-gray-50 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-primary-600 mb-3">{i + 1}</div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">{domainCommon.faqTitle}</h2>
          <div className="space-y-4">
            {domain.faq.map((item) => (
              <div key={item.q} className="border border-gray-200 rounded-lg p-5 bg-white hover:border-primary-300 transition-colors">
                <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="relative bg-primary-600 py-16 overflow-hidden">
        <img
          src={DOMAIN_IMAGES[id]}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{domainCommon.ctaTitle}</h2>
          <p className="text-white/85 mt-3">{domainCommon.ctaSub}</p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3 rounded-[2px] font-semibold hover:bg-gray-100 transition-colors">
            {domainCommon.ctaBtn}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H4" /></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
