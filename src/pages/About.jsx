import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { AMBIANCE_IMAGES, TEAM_IMAGES, GALLERY_IMAGES } from '../assets/images';
import { PageHero } from '../components/PageHero';

const ICONS = [
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
];

export function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <>
      <PageHero
        kicker={a.kicker}
        title={a.title}
        subtitle={a.subtitle}
        image={AMBIANCE_IMAGES.bureau}
        crumb={t.nav.about}
      />

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">{a.p1}</p>
                <p className="text-gray-600 leading-relaxed">{a.p2}</p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-primary-600">5</div>
                    <div className="text-sm text-gray-500">{a.branches}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-primary-600">+10</div>
                    <div className="text-sm text-gray-500">{a.yearsExp}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded overflow-hidden shadow-md">
                <img
                  src={AMBIANCE_IMAGES.bureau}
                  alt={a.imgAlt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                <h3 className="font-bold text-gray-900">{a.engagement}</h3>
                <p className="text-sm text-gray-600 mt-1">{a.engagementSub}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BANDE GALERIE (mosaïque de photos) ===== */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {GALLERY_IMAGES.slice(0, 4).map((src, i) => (
              <div
                key={src}
                className={`group relative overflow-hidden rounded-lg shadow-sm ${i === 0 ? 'col-span-2 row-span-2 h-full min-h-[220px] sm:min-h-[300px]' : 'h-36 sm:h-44'}`}
              >
                <img
                  src={src}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary-950/10 group-hover:bg-primary-950/0 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{a.valuesTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {a.values.map((value, i) => (
              <div key={value.title} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-700">
                  {ICONS[i]}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{a.teamTitle}</h2>
            <p className="text-gray-600 mt-3">{a.teamSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {a.team.map((member, i) => (
              <div key={member.name} className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-primary-50 bg-gray-200">
                  <img
                    src={TEAM_IMAGES[i]}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_22%]"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-primary-600 font-semibold">{member.role}</p>
                <p className="text-sm text-gray-600 mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
