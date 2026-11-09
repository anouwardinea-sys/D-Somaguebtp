import { Link } from 'react-router-dom';
import { Reveal } from '../../hooks/useReveal.jsx';
import { useLanguage } from '../../i18n/LanguageContext';
import { PROJECT_IMAGES } from '../../assets/images';

export function Realizations() {
  const { t } = useLanguage();
  const projects = t.realisationsHome.projects.map((p, i) => ({ ...p, id: i + 1, image: PROJECT_IMAGES[i] }));

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{t.realisationsHome.title}</h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            {t.realisationsHome.subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i % 3} className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300">
              <img
                src={project.image}
                alt={`${project.title} — ${project.location}`}
                loading="lazy"
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Voile permanent bas pour lisibilité du titre */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Type de projet : toujours visible, en haut à droite */}
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
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-8">
          <Link
            to="/realisations"
            className="inline-flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-[2px] text-[13px] font-semibold hover:border-primary-600 hover:text-primary-600 transition-colors"
          >
            <span>{t.realisationsHome.viewAll}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H4" /></svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
