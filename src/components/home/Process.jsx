/** Étapes d'accompagnement, de la définition du besoin à la livraison. */
import { Link } from 'react-router-dom';
import { Reveal } from '../../hooks/useReveal.jsx';
import { useLanguage } from '../../i18n/LanguageContext';
import { AMBIANCE_IMAGES } from '../../assets/images';

export function Process() {
  const { t } = useLanguage();
  const steps = t.process.steps;

  return (
    <section className="bg-slate-900 py-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

          {/* ===== COLONNE GAUCHE : TITRE + IMAGE ===== */}
          <Reveal className="flex flex-col">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white leading-tight mb-8">
              {t.process.titleA}<br />{t.process.titleB}
            </h2>
            <div className="overflow-hidden shadow-md flex-1 min-h-[320px] group">
              <img
                src={AMBIANCE_IMAGES.grue}
                alt={t.process.imgAlt}
                loading="lazy"
                className="w-full h-full object-cover min-h-[320px] group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Reveal>

          {/* ===== COLONNE DROITE : CARTE PROCESSUS ===== */}
          <Reveal delay={1} className="bg-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-primary-50 rounded-full" />

            <h3 className="text-xl font-bold text-gray-900 mb-8 relative">{t.process.cardTitle}</h3>

            <ol className="space-y-6 relative pb-16 sm:pb-0">
              {steps.map((step, index) => (
                <li key={step.number} className="flex space-x-4">
                  {/* Colonne numérotation + ligne rouge */}
                  <div className="flex flex-col items-center">
                    <span className={`w-3 h-3 rounded-full flex-shrink-0 ${index === steps.length - 1 ? 'bg-primary-600' : 'bg-primary-300'}`} />
                    {index < steps.length - 1 && <span className="w-px flex-1 bg-primary-200 mt-1" />}
                  </div>
                  {/* Contenu */}
                  <div className="pb-1">
                    <p className="text-sm font-bold text-gray-900">
                      <span className="text-primary-600 mr-2">{step.number}</span>
                      {step.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Lien direct vers la prise de contact */}
            <Link
              to="/contact"
              aria-label={t.process.startProject}
              className="absolute bottom-6 right-6 w-11 h-11 sm:bottom-8 sm:right-8 sm:w-12 sm:h-12 bg-primary-600 rounded-[2px] flex items-center justify-center text-white shadow-md hover:bg-primary-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H4" /></svg>
            </Link>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
