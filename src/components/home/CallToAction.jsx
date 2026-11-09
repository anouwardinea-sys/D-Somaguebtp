import { waUrl } from '../../config';
import { Link } from 'react-router-dom';
import { Reveal } from '../../hooks/useReveal.jsx';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { useLanguage } from '../../i18n/LanguageContext';

export function CallToAction() {
  const { t } = useLanguage();
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden bg-slate-900 shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(96,165,250,0.18),transparent_55%)]" aria-hidden="true" />
          <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6">{t.cta.title}</h2>
            <p className="text-slate-200 text-lg mb-8 max-w-2xl mx-auto">{t.cta.text}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center space-x-2 bg-white text-slate-900 px-6 py-2.5 text-sm font-semibold hover:bg-slate-100 transition-colors"><span>{t.cta.quoteBtn}</span></Link>
              <a href={waUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center space-x-2 bg-transparent border border-white text-white px-6 py-2.5 rounded-[2px] text-sm font-semibold hover:bg-white/10 transition-colors"><WhatsAppIcon className="w-5 h-5" /><span>{t.cta.waBtn}</span></a>
            </div>
            <p className="text-primary-200 text-sm mt-6">{t.cta.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
