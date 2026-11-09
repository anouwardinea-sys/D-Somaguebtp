import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { DOMAIN_IMAGES } from '../assets/images';
import { PageHero } from '../components/PageHero';

const ICONS = [
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-8-4-8 4m16 0v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l9-9 9 9M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M4 12l9 9 9-9" /></svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
];

export function Services() {
  const { t } = useLanguage();
  const sp = t.servicesPage;
  const domaines = sp.domains.map((d, i) => ({ ...d, icon: ICONS[i] }));
  const process = sp.process;
  return (
    <>
      <PageHero
        kicker={sp.kicker}
        title={sp.title}
        subtitle={sp.subtitle}
        image={DOMAIN_IMAGES.ingenierie}
        crumb={sp.crumb}
      />
      {/* ===== HUB : nos 5 pôles (cartes cliquables vers les pages dédiées) ===== */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{sp.hubTitle}</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {sp.hubSub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {domaines.map((d, i) => (
              <Link
                key={d.id}
                to={`/domain/${d.id}`}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 card-lift flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={DOMAIN_IMAGES[d.id]}
                    alt={d.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <span className="absolute top-3 right-3 text-[11px] font-bold text-white/90 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-[2px]">
                    {d.num}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-extrabold text-xl drop-shadow">{d.name}</h3>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-primary-600 font-semibold text-sm mb-2">{d.tagline}</p>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">{d.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-600 group-hover:gap-3 transition-all">
                    {sp.discover}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H4" /></svg>
                  </span>
                </div>
              </Link>
            ))}
            {/* Carte de contact : complète la grille (6 emplacements pour 5 pôles) */}
            <Link
              to="/contact"
              className="group bg-neutral-950 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 card-lift flex flex-col items-center justify-center text-center p-8 min-h-[18rem]"
            >
              <span className="w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </span>
              <h3 className="text-white font-extrabold text-xl mb-2">{sp.contactCardTitle}</h3>
              <p className="text-gray-400 text-sm mb-6">{sp.contactCardSub}</p>
              <span className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-[2px] text-[13px] font-semibold group-hover:gap-3 transition-all">
                {sp.ctaBtn}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H4" /></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-neutral-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary-500 font-bold uppercase tracking-[0.25em] text-xs mb-4">{sp.methodKicker}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{sp.methodTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full border-2 border-primary-600 flex items-center justify-center mx-auto mb-4"><span className="text-xl font-bold text-primary-500">{item.step}</span></div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{sp.ctaTitle}</h2>
            <p className="text-white/80 mt-2">{sp.ctaSub}</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-2.5 rounded-[2px] text-[13px] font-semibold hover:bg-gray-950 hover:text-white transition-colors shrink-0">{sp.ctaBtn}<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H4" /></svg></Link>
        </div>
      </section>
    </>
  );
}
