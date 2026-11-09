import { Reveal } from '../../hooks/useReveal.jsx';
import { useLanguage } from '../../i18n/LanguageContext';

export function Partners() {
  const { t, lang } = useLanguage();
  const expertise = lang === 'en'
    ? ['Architecture', 'Construction engineering', 'Real estate', 'Freight & logistics', 'Surveying', 'Project supervision']
    : ['Architecture', 'Ingénierie', 'Immobilier', 'Transit & logistique', 'Topographie', 'Études & suivi'];

  return (
    <section className="border-b border-gray-200 bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">{t.partners.title}</h2>
          <p className="text-sm text-gray-600">{t.partners.subtitle}</p>
        </Reveal>
        {/* Bande défilante : la liste est dupliquée pour boucler sans couture.
            L'animation translateX(-50%) ramène exactement sur la 2e copie. */}
        <div className="partners-viewport">
          <div className="partners-marquee flex w-max items-center">
            {[...expertise, ...expertise].map((name, i) => (
              <span
                key={`${name}-${i}`}
                aria-hidden={i >= expertise.length ? 'true' : undefined}
                className="flex shrink-0 items-center gap-2 whitespace-nowrap pr-10 text-sm font-semibold text-slate-800"
              >
                <span className="h-1.5 w-1.5 shrink-0 bg-primary-600" aria-hidden="true" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
