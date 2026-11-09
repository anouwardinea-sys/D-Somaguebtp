import { SITE, waUrl } from '../config';
import { ContactForm } from '../components/ContactForm';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { useLanguage } from '../i18n/LanguageContext';
import { AMBIANCE_IMAGES } from '../assets/images';
import { PageHero } from '../components/PageHero';

export function Contact() {
  const { t, lang } = useLanguage();
  const cp = t.contactPage;
  const contactInfo = {
    address: SITE.address[lang],
    phone: SITE.phoneDisplay,
    email: SITE.email,
    hours: SITE.hours[lang],
  };

  return (
    <>
      <PageHero
        kicker={cp.kicker}
        title={cp.title}
        subtitle={cp.subtitle}
        image={AMBIANCE_IMAGES.reunion}
        crumb={t.nav.contact}
      />

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <ContactForm />
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">{cp.coords}</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{cp.addressLabel}</h3>
                      <p className="text-gray-600">{contactInfo.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{cp.phoneLabel}</h3>
                      <a href={`tel:${SITE.phoneIntl}`} className="text-gray-600 hover:text-primary-600">{contactInfo.phone}</a>
                    </div>
                  </div>
                  {contactInfo.email && (<div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{cp.emailLabel}</h3>
                      <a href={`mailto:${contactInfo.email}`} className="text-gray-600 hover:text-primary-600">{contactInfo.email}</a>
                    </div>
                  </div>)}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{cp.hoursLabel}</h3>
                      <p className="text-gray-600">{contactInfo.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{cp.quickTitle}</h2>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-3">
                    <a href={waUrl()} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">
                      <WhatsAppIcon className="w-5 h-5" />
                    </a>
                    <span>WhatsApp: {contactInfo.phone}</span>
                  </div>
                  {contactInfo.email && (<div className="flex items-center space-x-3">
                    <a href={`mailto:${contactInfo.email}`} className="text-primary-600 hover:text-primary-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </a>
                    <span>Email: {contactInfo.email}</span>
                  </div>)}
                </div>
              </div>

              {/* ===== LIGNE DÉDIÉE : TRANSIT & IMMOBILIER (93 83 29 11) ===== */}
              <div className="bg-neutral-950 rounded-xl shadow-lg p-6">
                <p className="text-primary-500 font-bold uppercase tracking-[0.25em] text-[11px] mb-2">{cp.dedicatedKicker}</p>
                <h2 className="text-xl font-bold text-white mb-1">{cp.dedicatedTitle}</h2>
                <p className="text-gray-400 text-sm mb-4">{cp.dedicatedSub}</p>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </span>
                  <a href={`tel:${SITE.transitImmobilierIntl}`} className="text-lg font-extrabold text-white hover:text-primary-400 transition-colors">{SITE.transitImmobilierDisplay}</a>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={`tel:${SITE.transitImmobilierIntl}`} className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-[2px] text-[13px] font-semibold hover:bg-primary-700 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {cp.dedicatedCall}
                  </a>
                  <a href={waUrl(cp.dedicatedWaText, SITE.transitImmobilierWhatsapp)} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-[2px] text-[13px] font-semibold hover:bg-green-600 transition-colors">
                    <WhatsAppIcon className="w-4 h-4" />
                    {cp.dedicatedWhatsApp}
                  </a>
                </div>
              </div>
              {/* ===== CARTE GOOGLE MAPS ===== */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{cp.mapTitle}</h2>
                <p className="text-gray-600 text-sm mb-4">{cp.mapSub}</p>
                <div className="rounded-lg overflow-hidden border border-gray-200 aspect-[4/3] bg-gray-100">
                  <iframe
                    title={cp.mapTitle}
                    src={SITE.mapEmbed}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
                <a
                  href={SITE.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {cp.mapDirections}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
