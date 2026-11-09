/**
 * PageHero.jsx — Bandeau d'ouverture commun aux pages secondaires.
 *
 * ⚠️ POURQUOI CE COMPOSANT ?
 * Les pages À propos, Services, Réalisations, Contact... commençaient
 * directement par une section à `top: 0`, donc leur titre passait SOUS le
 * header fixe (barre infos + barre principale ≈ 120 px). Ce composant
 * garantit le bon espacement, un visuel de fond et un fil d'Ariane —
 * pour un rendu homogène et professionnel sur tout le site.
 *
 * @param {string}   kicker   - petite étiquette au-dessus du titre
 * @param {string}   title    - titre principal (rendu en <h1>)
 * @param {string}   subtitle - texte d'accroche
 * @param {string}   image    - image de fond
 * @param {string}   crumb    - libellé du fil d'Ariane (défaut : title)
 * @param {React.ReactNode} children - contenu additionnel (filtres…)
 */
import { Link } from 'react-router-dom';

export function PageHero({ kicker, title, subtitle, image, crumb, children }) {
  return (
    <section className="relative flex items-end overflow-hidden bg-neutral-950">
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {/* Voiles : lisibilité du texte sur n'importe quelle photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-950/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/70 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-14 w-full">
        {/* Fil d'Ariane */}
        <nav aria-label="Fil d’Ariane" className="flex items-center gap-2 text-xs text-gray-400 mb-5">
          <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
          <span aria-hidden="true">/</span>
          <span className="text-primary-400 font-semibold">{crumb || title}</span>
        </nav>

        {kicker && (
          <p className="inline-flex items-center gap-2 text-primary-400 font-bold text-xs uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-[2px] bg-primary-500 inline-block" />
            {kicker}
          </p>
        )}

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight max-w-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="text-gray-300 mt-5 max-w-2xl text-base leading-relaxed">{subtitle}</p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
