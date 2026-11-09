/** Metiers detailles : 1 image par domaine + description + tags (bilingue FR/EN) */
import { Link } from 'react-router-dom';
import { Reveal } from '../../hooks/useReveal.jsx';
import { useLanguage } from '../../i18n/LanguageContext';
import { METIER_IMAGES } from '../../assets/images';

export function Metiers() {
  const { t } = useLanguage();
  const domainPaths = ['/domain/architecture', '/domain/ingenierie', '/domain/immobilier', '/domain/transit', '/domain/topographie', '/services'];
  const domaines = t.metiers.domains.map((d, i) => ({ ...d, img: METIER_IMAGES[i], path: domainPaths[i] }));
  return (
    <section id="metiers" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-primary-600 font-bold text-sm uppercase tracking-widest mb-2">{t.metiers.kicker}</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">{t.metiers.titleA}<br />{t.metiers.titleB}</h2>
          </div>
          <Link to="/services" className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-[2px] text-[13px] font-semibold hover:bg-primary-600 transition-colors shrink-0">{t.metiers.all}</Link>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domaines.map((d, i) => (
            <Reveal key={d.title} delay={i % 3} as={Link} to={d.path} className="group relative bg-white border border-gray-200 rounded overflow-hidden card-lift hover:border-primary-200">
              <div className="relative h-52 overflow-hidden">
                <img src={d.img} alt={d.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                {/* Numéro d'ordre du pôle */}
                <span className="absolute top-3 right-3 text-[11px] font-bold text-white/90 bg-black/35 backdrop-blur-sm px-2 py-0.5 rounded-[2px] tabular-nums">0{i + 1}</span>
                <span className="absolute bottom-3 left-3 text-white font-extrabold text-xl drop-shadow">{d.title}</span>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-sm leading-relaxed">{d.desc}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {d.points.map((p) => (<span key={p} className="text-[12px] font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full group-hover:bg-primary-50 group-hover:text-primary-700 transition-colors">{p}</span>))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-600 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  {t.metiers.discover}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H4" /></svg>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
