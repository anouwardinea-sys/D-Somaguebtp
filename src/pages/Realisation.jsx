import { SITE, waUrl } from '../config';
/**
 * Realisation.jsx - Page des réalisations avec filtres
 * 
 * Fonctionnalités :
 * - Filtres par branche : Tout, Architecture, Ingénierie, Immobilier, Transit, Topographie
 * - Grille de projets avec images et hover effects
 * - Projection détaillée au clic (zone hover interactive)
 * - Liens vers WhatsApp pour demander plus d'infos
 * 
 * Données : Les projets sont définis dans le tableau `projects`.
 * À l'avenir, ils pourront être chargés depuis une base de données
 * ou un fichier JSON par l'espace admin.
 */
import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { DOMAIN_IMAGES, AMBIANCE_IMAGES } from '../assets/images';
import { PageHero } from '../components/PageHero';
import { ChantierGallery } from '../components/ChantierGallery';

const PROJECT_IMAGES_BY_TYPE = {
  Architecture: DOMAIN_IMAGES.architecture,
  Ingénierie: DOMAIN_IMAGES.ingenierie,
  Engineering: DOMAIN_IMAGES.ingenierie,
  Immobilier: DOMAIN_IMAGES.immobilier,
  'Real Estate': DOMAIN_IMAGES.immobilier,
  Transit: DOMAIN_IMAGES.transit,
  Freight: DOMAIN_IMAGES.transit,
  Topographie: DOMAIN_IMAGES.topographie,
  Surveying: DOMAIN_IMAGES.topographie,
};

/** Realisation — Page des réalisations avec filtres (bilingue FR/EN). */
export function Realisation() {
  const { t } = useLanguage();
  const rp = t.realisationPage;
  const [activeFilter, setActiveFilter] = useState(rp.all);
  const projects = rp.projects.map((project, i) => {
    const image = PROJECT_IMAGES_BY_TYPE[project.type];
    if (!image) throw new Error(`Aucune image définie pour la catégorie « ${project.type} ».`);
    return { ...project, id: i + 1, image };
  });
  const filtered = activeFilter === rp.all ? projects : projects.filter((p) => p.type === activeFilter);

  return (
    <>
      <PageHero
        kicker={rp.kicker}
        title={rp.title}
        subtitle={rp.subtitle}
        image={AMBIANCE_IMAGES.chantier}
        crumb={t.nav.realisations}
      />

    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Barre de filtres */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {rp.filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-[2px] border text-sm font-semibold transition-colors ${activeFilter === filter ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-300 hover:border-primary-600 hover:text-primary-600'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grille des projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div key={project.id} className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300">
              <img
                src={project.image}
                alt={`${project.title} — ${project.location}`}
                loading="lazy"
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="absolute top-3 right-3 bg-primary-600 text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-[2px] shadow-md">
                {project.type}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg leading-tight">{project.title}</h3>
                <div className="flex items-center gap-2 text-white/75 text-sm mt-1">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>{project.location} · {project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">{rp.empty}</p>
          </div>
        )}

        <div className="text-center mt-8">
          <a
            href={waUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-[2px] text-[13px] font-semibold hover:border-primary-600 hover:text-primary-600 transition-colors"
          >
            <span>{rp.viewMore}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H4" /></svg>
          </a>
        </div>
      </div>
    </section>

    {/* ===== GALERIE PAR CHANTIER (photos + vidéos du client, groupées) ===== */}
    <ChantierGallery />
    </>
  );
}
