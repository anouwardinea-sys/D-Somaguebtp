import { useState } from 'react';
import { Reveal } from '../../hooks/useReveal.jsx';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Faq.jsx — Section « Questions fréquentes » (accordéon).
 *
 * Accordéon accessible : un seul panneau ouvert à la fois, boutons avec
 * aria-expanded / aria-controls. Contenu bilingue via t.faqHome.
 */
export function Faq() {
  const { t } = useLanguage();
  const faq = t.faqHome;
  const [open, setOpen] = useState(0); // premier élément ouvert par défaut

  return (
    <section className="bg-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="text-primary-600 font-bold text-sm uppercase tracking-widest mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{faq.title}</h2>
          <p className="text-gray-600 mt-3">{faq.subtitle}</p>
        </Reveal>

        <div className="space-y-3">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal
                key={item.q}
                delay={i % 3}
                className={`border rounded-lg overflow-hidden transition-colors ${isOpen ? 'border-primary-300 bg-primary-50/40' : 'border-gray-200 bg-white hover:border-primary-200'}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="w-full flex items-center justify-between gap-4 text-left p-5"
                >
                  <span className="font-semibold text-gray-900">{item.q}</span>
                  <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </button>
                <div id={`faq-panel-${i}`} hidden={!isOpen} className="px-5 pb-5 -mt-1">
                  <p className="text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
