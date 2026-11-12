/**
 * DomainCatalog.jsx — Vitrine filtrable des éléments d'un domaine.
 *
 * Affiche les éléments du catalogue d'un domaine (voir i18n/catalogue.js)
 * avec DEUX niveaux de filtres :
 *   1. L'offre  : Location / Vente (ex. Immobilier) — affiché en onglets.
 *   2. Le type  : maison, terrain, véhicule, bureau... (boutons).
 *
 * Pour les domaines de service (architecture, ingénierie, transit,
 * topographie), le premier filtre regroupe les grandes familles de prestations.
 *
 * ⚠️ Les intitulés des filtres sont DÉDUITS des éléments présents, donc si on
 * ajoute une catégorie au catalogue, le filtre apparaît automatiquement.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { waUrl } from "../config";

/**
 * @param {object[]} items     - Éléments du domaine (catalogue)
 * @param {object}   labels    - Intitulés traduits (voir dict_*.domainpage.catalog)
 * @param {string}   waHref    - Lien WhatsApp pré-rempli pour « Demander »
 */
export function DomainCatalog({ items, labels, waHref }) {
  const [offer, setOffer] = useState("all");
  const [type, setType] = useState("all");
  const [imageIndexes, setImageIndexes] = useState({});

  // Onglets principaux : on déduit les offres réellement présentes.
  const offers = useMemo(
    () => ["all", ...Array.from(new Set(items.map((i) => i.offer)))],
    [items],
  );

  // Éléments visibles selon l'onglet principal (avant filtre de type).
  const byOffer = useMemo(
    () => (offer === "all" ? items : items.filter((i) => i.offer === offer)),
    [items, offer],
  );

  // Types présents dans la sélection courante (le filtre s'adapte).
  const types = useMemo(
    () => ["all", ...Array.from(new Set(byOffer.map((i) => i.type)))],
    [byOffer],
  );

  // Si le type sélectionné n'existe plus dans l'onglet, on revient à « tous ».
  const effectiveType = types.includes(type) ? type : "all";
  const visible = byOffer.filter(
    (i) => effectiveType === "all" || i.type === effectiveType,
  );

  const offerLabel = (key) => (labels.offers && labels.offers[key]) || key;
  const typeLabel = (key) => (labels.types && labels.types[key]) || key;

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {labels.title}
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            {labels.subtitle}
          </p>
        </div>

        {/* Onglets : Location / Vente (ou familles de prestations) */}
        {offers.length > 2 && (
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {offers.map((o) => (
              <button
                key={o}
                onClick={() => {
                  setOffer(o);
                  setType("all");
                }}
                className={`px-5 py-2 rounded-[2px] text-sm font-semibold border transition-colors ${
                  offer === o
                    ? "bg-primary-600 text-white border-primary-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-primary-600 hover:text-primary-600"
                }`}
              >
                {offerLabel(o)}
              </button>
            ))}
          </div>
        )}

        {/* Filtres secondaires : type de bien / de prestation */}
        {types.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {types.map((ty) => (
              <button
                key={ty}
                onClick={() => setType(ty)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  effectiveType === ty
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-800"
                }`}
              >
                {typeLabel(ty)}
              </button>
            ))}
          </div>
        )}

        {/* Grille des éléments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((item) => {
            const images = item.images?.length ? item.images : [item.image];
            const imageIndex = imageIndexes[item.id] || 0;
            const itemWaHref = item.whatsappNumber
              ? waUrl(`Bonjour, je suis intéressé(e) par : ${item.title}`, item.whatsappNumber)
              : waHref;

            return (
              <article
                key={item.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={images[imageIndex]}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {item.offer !== "service" && (
                  <span
                    className={`absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-[2px] text-white shadow-md ${item.offer === "location" ? "bg-primary-600" : "bg-gray-900"}`}
                  >
                    {offerLabel(item.offer)}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 bg-white/95 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-[2px] shadow">
                  {item.price}
                </span>
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 px-4 pt-3">
                  {images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setImageIndexes((current) => ({ ...current, [item.id]: index }))}
                      aria-label={`Afficher la photo ${index + 1} de ${item.title}`}
                      aria-pressed={imageIndex === index}
                      className={`h-14 w-20 overflow-hidden rounded border-2 ${imageIndex === index ? "border-primary-600" : "border-transparent"}`}
                    >
                      <img src={image} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 leading-snug">
                  {item.title}
                </h3>
                <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-1.5">
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {item.location}
                </p>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-3">{item.description}</p>
                )}
                <div className="mt-auto pt-4 flex items-center gap-3">
                  <Link
                    to="/contact"
                    className="flex-1 text-center bg-primary-600 text-white px-4 py-2.5 rounded-[2px] text-[13px] font-semibold hover:bg-primary-700 transition-colors"
                  >
                    {labels.cta}
                  </Link>
                  {itemWaHref && (
                    <a
                      href={itemWaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={labels.whatsapp}
                      className="w-10 h-10 shrink-0 border border-gray-300 rounded-[2px] flex items-center justify-center text-gray-500 hover:border-primary-600 hover:text-primary-600 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </article>
            );
          })}
        </div>

        {visible.length === 0 && (
          <p className="text-center text-gray-500 py-12">{labels.empty}</p>
        )}

        {/* Note de bas de section */}
        <p className="text-center text-xs text-gray-400 mt-10">{labels.note}</p>
      </div>
    </section>
  );
}
