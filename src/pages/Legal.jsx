import { useLanguage } from '../i18n/LanguageContext';

export function Legal() {
  const { t } = useLanguage();
  const l = t.legal;
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">{l.title}</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{l.identity}</h2>
          <p className="text-gray-600 mb-4">{l.siteLine} <strong>dsomague.com</strong></p>
          <p className="text-gray-600 mb-4">{l.providerLine} <strong>ADJEMIN Anouwardine</strong> (Anouwar)</p>
          <p className="text-gray-600 mb-4">{l.formatLine} <em>{l.formatValue}</em></p>
          <p className="text-gray-600 mb-4">{l.hostingLine} {l.hostingValue}</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">{l.ip}</h2>
          <p className="text-gray-600 mb-4">{l.ipText}</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">{l.privacyTitle}</h2>
          <p className="text-gray-600 mb-4">{l.privacyP1}</p>
          <p className="text-gray-600 mb-4">{l.privacyP2}</p>
          <p className="text-gray-600 mb-4"><strong>{l.privacyResp}</strong> ADJEMIN Anouwardine (Anouwar)</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">{l.cookies}</h2>
          <p className="text-gray-600 mb-4">{l.cookiesText}</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">{l.cookiesMgmt}</h2>
          <p className="text-gray-600">{l.cookiesMgmtText}</p>
        </div>
      </div>
    </section>
  );
}
