/**
 * dict_fr_domainpages.js — Contenu détaillé des 5 pages « domaine » (français).
 *
 * Chaque domaine expose :
 *  - id / name / tagline / heroImage / heroKicker
 *  - intro      : chapô de présentation
 *  - stats      : 3 chiffres clés propres au métier
 *  - groups     : prestations détaillées (réutilise la structure des anciens
 *                 dictionnaires /services afin de rester compatible)
 *  - tasks      : « Tâches » — liste animée au scroll, reprise des brochures PDF
 *  - deliverables : ce que le client reçoit concrètement
 *  - approach   : 4 étapes de la méthode appliquée au métier
 *  - faq        : questions fréquentes (accordéon)
 *  - ctaTitle / ctaSub
 */

const frDomainArchitecture = {
  id: 'architecture',
  name: 'Architecture',
  tagline: 'Concevoir des espaces durables et agréables à vivre',
  heroKicker: 'Pôle 01 — Architecture',
  heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
  intro:
    'Notre atelier d’architecture traduit vos envies en documents exploitables : de la première esquisse au permis de construire, puis aux plans d’exécution utilisés sur le chantier. Nous concilions esthétique, confort climatique, normes parasismiques et maîtrise du budget.',
  deliverables: [
    'Plans 2D cotés (implantation, étages, coupes, façades)',
    'Vues 3D photoréalistes pour valider le projet',
    'Dossier de permis de construire complet',
    'Plans d’exécution et détails techniques pour le chantier',
  ],
  approach: [
    { title: 'Programme', desc: 'Nous écoutons vos besoins, votre budget et les contraintes de la parcelle.' },
    { title: 'Esquisse', desc: 'Propositions de volumes et d’implantation, corrigées avec vous.' },
    { title: 'Permis', desc: 'Constitution et dépôt du dossier auprès de la mairie de Lomé.' },
    { title: 'Exécution', desc: 'Plans de chantier, suivi de conformité et ajustements.' },
  ],
  faq: [
    { q: 'Pouvez-vous reprendre un plan existant ?', a: 'Oui. Nous auditons le dossier, corrigeons les non-conformités et produisons une version exploitable par les entreprises.' },
    { q: 'Combien de temps prend un permis de construire ?', a: 'Comptez 4 à 8 semaines selon la commune, une fois le dossier complet déposé. Nous assurons le suivi en commission.' },
    { q: 'Proposez-vous la modélisation 3D ?', a: 'Oui, systématiquement pour les projets significatifs : elle évite les malentendus avant travaux.' },
  ],
  groups: [
    { title: 'Conception architecturale', items: ['Étude des besoins, du site et du budget', 'Esquisses et avant-projets', 'Plans de masse, d’étage, coupes et façades', 'Modélisation 3D et visualisation numérique', 'Choix des matériaux et principes d’aménagement'] },
    { title: 'Plans techniques et démarches', items: ['Plans d’exécution et détails techniques', 'Plans de coffrage et de ferraillage', 'Dossiers techniques nécessaires au chantier', 'Dossier de permis de construire', 'Appui à la gestion administrative et financière du projet'] },
    { title: 'Direction et suivi des travaux', items: ['Organisation et coordination des intervenants', 'Visites et suivi de chantier', 'Contrôle de conformité aux plans', 'Prise en compte de la sécurité, de l’accessibilité et de l’environnement', 'Comptes rendus et réception des travaux'] },
    { title: 'Aménagement et rénovation', items: ['Agencement des espaces intérieurs et extérieurs', 'Rénovation et restauration', 'Choix des matériaux et finitions', 'Conception paysagère', 'Éclairage et ambiances'] },
  ],
  // « Tâches » reprises telles quelles de la brochure Architecture (page 1).
  tasks: [
    { title: 'Conception de plans', desc: 'Plans architecturaux et 3D.' },
    { title: 'Modélisation 3D et rendus' },
    { title: 'Suivi de chantier et assistance' },
    { title: 'Conseils en aménagement' },
    { title: 'Rénovation et réhabilitation' },
    { title: 'Permis de construire et autorisations' },
  ],
};

const frDomainIngenierie = {
  id: 'ingenierie',
  name: 'Ingénierie',
  tagline: 'Construire solidement, dans les délais et le budget',
  heroKicker: 'Pôle 02 — Ingénierie',
  heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80',
  intro:
    'Notre pôle génie civil prend en charge l’ouvrage de bout en bout : études de structures, dimensionnement des réseaux, exécution du gros œuvre, second œuvre et contrôle qualité. Un interlocuteur unique, un planning tenu.',
  deliverables: [
    'Note de calcul structure et plans de coffrage',
    'Planning d’exécution et devis quantitatif détaillé',
    'Photos d’avancement et comptes rendus hebdomadaires',
    'Procès-verbal de réception et garantie',
  ],
  approach: [
    { title: 'Études', desc: 'Relevés, note de calcul, dimensionnement et métré précis.' },
    { title: 'Préparation', desc: 'Sélection des matériaux, planning et mobilisation des équipes.' },
    { title: 'Exécution', desc: 'Gros œuvre, second œuvre et contrôle qualité à chaque échelon.' },
    { title: 'Réception', desc: 'Levée des réserves, procès-verbal et accompagnement SAV.' },
  ],
  faq: [
    { q: 'Construisez-vous hors de Lomé ?', a: 'Oui, nous intervenons sur tout le Togo. Les frais de déplacement sont intégrés au devis.' },
    { q: 'Quelle garantie offrez-vous ?', a: 'Une garantie contractuelle sur les ouvrages et un service après travaux pour la levée des réserves.' },
    { q: 'Gérez-vous le second œuvre ?', a: 'Oui : électricité, plomberie, carrelage, peinture et menuiserie sont coordonnés par nos soins.' },
  ],
  groups: [
    { title: 'Études et calculs techniques', items: ['Études de sol et de structures', 'Calculs et dimensionnement des ouvrages', 'Structures en béton armé et métalliques', 'Modélisation numérique', 'Métrés et devis quantitatifs'] },
    { title: 'Conception et préparation', items: ['Plans de coffrage et de ferraillage', 'Voiries et réseaux divers (VRD)', 'Études d’exécution', 'Choix des matériaux et prise en compte des normes', 'Diagnostic de bâtiments existants'] },
    { title: 'Conseil et coordination', items: ['Conseil technique au maître d’ouvrage', 'Assistance à la maîtrise d’ouvrage', 'Coordination des intervenants', 'Renforcement et réhabilitation', 'Étude et maîtrise des coûts'] },
    { title: 'Direction et contrôle des travaux', items: ['Organisation et suivi du planning', 'Coordination des équipes sur le chantier', 'Contrôle de la qualité des matériaux et des travaux', 'Suivi des coûts et des délais', 'Réception provisoire et définitive'] },
  ],
  // « Tâches » reprises telles quelles de la brochure Génie Services (page 1).
  tasks: [
    { title: 'Études et conception', desc: 'Études techniques et conception de projets.' },
    { title: 'Suivi et contrôle de travaux', desc: 'Encadrement et suivi des chantiers.' },
    { title: 'Bâtiment et travaux publics (BTP)', desc: 'Constructions et aménagements (maisons, immeubles, routes, etc.).' },
    { title: 'Ouvrages d’assainissement', desc: 'Conduites, buses et évacuation des eaux.' },
    { title: 'Conseil et assistance technique', desc: 'Accompagnement et expertise pour vos projets.' },
    { title: 'Études d’infrastructures', desc: 'Routes, réseaux divers et aménagements.' },
    { title: 'Ingénierie durable', desc: 'Des solutions respectueuses de l’environnement.' },
  ],
};

const frDomainImmobilier = {
  id: 'immobilier',
  name: 'Immobilier',
  tagline: 'Acheter, louer et gérer en toute confiance à Lomé',
  heroKicker: 'Pôle 03 — Immobilier',
  heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
  intro:
    'Nous sécurisons chaque transaction immobilière : vérification du titre foncier, visite accompagnée, négociation puis acte notarié. Villas, appartements, terrains titrés et locaux commerciaux à Lomé et ses environs.',
  deliverables: [
    'Sélection de biens correspondant à votre budget',
    'Vérification du titre foncier et des servitudes',
    'Visites accompagnées et négociation sécurisée',
    'Accompagnement jusqu’à l’acte notarié',
  ],
  approach: [
    { title: 'Besoin', desc: 'Nous cadrons votre recherche : budget, quartier, usage.' },
    { title: 'Sélection', desc: 'Nous ne présentons que des biens aux documents vérifiés.' },
    { title: 'Visite', desc: 'Visites accompagnées et estimation objective du prix.' },
    { title: 'Signature', desc: 'Négociation, dossier et accompagnement notarial.' },
  ],
  faq: [
    { q: 'Comment vérifiez-vous un titre foncier ?', a: 'Nous consultons le registre foncier et les actes de propriété avant toute mise en relation.' },
    { q: 'Gérez-vous la location pour un propriétaire à l’étranger ?', a: 'Oui : mise en location, états des lieux, encaissement des loyers et reporting mensuel.' },
    { q: 'Prenez-vous une commission ?', a: 'Une commission est due uniquement en cas de transaction aboutie ; elle est définie à l’avance.' },
  ],
  groups: [
    { title: 'Achat & vente de biens', items: ['Villas et maisons', 'Appartements', 'Terrains titrés vérifiés', 'Locaux commerciaux et bureaux', 'Estimation du prix de marché'] },
    { title: 'Location', items: ['Location de villas et appartements', 'Location de locaux commerciaux', 'Recherche selon votre budget', 'Visites accompagnées', 'Rédaction du contrat de bail'] },
    { title: 'Gestion immobilière', items: ['Gestion locative complète', 'États des lieux entrée et sortie', 'Encaissement des loyers', 'Suivi des impayés', 'Reporting mensuel au propriétaire'] },
    { title: 'Conseil et accompagnement', items: ['Vérification du titre foncier', 'Vérification des servitudes', 'Négociation sécurisée', 'Accompagnement jusqu’à l’acte notarié', 'Conseil en investissement'] },
  ],
  // « Tâches » reprises de la brochure Immobilier (page 1).
  tasks: [
    { title: 'Vente de biens immobiliers', desc: 'Maisons, appartements, terrains et locaux commerciaux.' },
    { title: 'Location de biens immobiliers', desc: 'Logements, bureaux et espaces commerciaux.' },
    { title: 'Achat et vente de terrains', desc: 'Terrains viabilisés ou non, pour tous vos projets.' },
    { title: 'Investissement immobilier', desc: 'Conseil et accompagnement dans vos projets d’investissement.' },
    { title: 'Gestion immobilière', desc: 'Entretien, suivi et valorisation de vos biens.' },
    { title: 'Conseil et assistance', desc: 'Accompagnement personnalisé à chaque étape de votre projet.' },
  ],
};

const frDomainTransit = {
  id: 'transit',
  name: 'Transit & Logistique',
  tagline: 'Vos marchandises dédouanées et livrées sans stress',
  heroKicker: 'Pôle 04 — Transit & Logistique',
  heroImage: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1600&q=80',
  intro:
    'Nous accompagnons vos opérations d’importation et d’exportation : préparation des documents, formalités douanières, coordination des transports et suivi des marchandises, par voie maritime, aérienne ou routière.',
  deliverables: [
    'Déclaration SYDONIA et suivi jusqu’à la mainlevée',
    'Optimisation des droits et taxes applicables',
    'Enlèvement, transport et livraison sur chantier',
    'Reporting d’avancement par WhatsApp',
  ],
  approach: [
    { title: 'Documents', desc: 'Vérification du connaissement, facture et certificats requis.' },
    { title: 'Douane', desc: 'Déclaration, visite douanière et paiement des droits optimisés.' },
    { title: 'Transport', desc: 'Enlèvement du conteneur et acheminement vers votre chantier.' },
    { title: 'Livraison', desc: 'Déchargement, contrôle et clôture du dossier avec reporting.' },
  ],
  faq: [
    { q: 'Quels documents d’import faut-il fournir ?', a: 'Facture commerciale, connaissement ou lettre de transport aérien, certificat d’origine et, selon la marchandise, un certificat de conformité.' },
    { q: 'Quelles voies de transport pouvez-vous coordonner ?', a: 'Nous accompagnons les transports maritimes, aériens et routiers selon la nature de l’opération.' },
    { q: 'Pouvez-vous accompagner une opération d’exportation ?', a: 'Oui, nous intervenons dans la coordination administrative et logistique des opérations d’import et d’export.' },
  ],
  groups: [
    { title: 'Coordination des transports', items: ['Transport maritime, aérien et routier', 'Coordination de l’enlèvement et de l’acheminement', 'Transport par camions et poids lourds', 'Suivi des marchandises', 'Organisation de la livraison'] },
    { title: 'Formalités douanières', items: ['Préparation des déclarations douanières', 'Accompagnement des formalités d’import et d’export', 'Coordination avec les services concernés', 'Suivi administratif des dossiers', 'Assistance jusqu’à la mise à disposition des marchandises'] },
    { title: 'Transit et logistique', items: ['Organisation des opérations de transit', 'Coordination avec les transporteurs', 'Gestion des documents de transport', 'Suivi des opérations logistiques', 'Gestion administrative des dossiers'] },
    { title: 'Conseil et accompagnement', items: ['Vérification des documents d’import et d’export', 'Préparation des pièces nécessaires à l’opération', 'Information sur les étapes du dossier', 'Coordination entre expéditeur, transporteur et destinataire', 'Accompagnement administratif'] },
  ],
  // « Tâches » reprises de la brochure Transit Maritime (page 1).
  tasks: [
    { title: 'Transport maritime', desc: 'Importation et exportation de vos marchandises.' },
    { title: 'Fret et conteneurs', desc: 'Envois de conteneurs standards et spéciaux.' },
    { title: 'Dédouanement', desc: 'Formalités douanières rapides et sécurisées.' },
  ],
};

const frDomainTopographie = {
  id: 'topographie',
  name: 'Topographie',
  tagline: 'Mesurer avec précision pour bâtir sans litige',
  heroKicker: 'Pôle 05 — Topographie',
  heroImage: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1600&q=80',
  intro:
    'Levés drone et GPS centimétrique, bornage contradictoire et implantation : nos géomètres sécurisent votre foncier et garantissent des implantations exactes sur le chantier. Précision, traçabilité et documents officiels.',
  deliverables: [
    'Plan de masse et modèle numérique de terrain',
    'Procès-verbal de bornage contradictoire',
    'Dossier pour le titre foncier',
    'Rapport d’implantation et récolement',
  ],
  approach: [
    { title: 'Relevé', desc: 'Levé drone ou GPS RTK de la zone concernée.' },
    { title: 'Traitement', desc: 'Calcul des surfaces, cubatures et limites précises.' },
    { title: 'Bornage', desc: 'Pose des bornes en présence des parties concernées.' },
    { title: 'Livrables', desc: 'Plans topo, PV et dossier foncier remis au client.' },
  ],
  faq: [
    { q: 'Le bornage est-il obligatoire pour vendre ?', a: 'Il est fortement recommandé : il fixe les limites de façon contradictoire et évite les litiges ultérieurs.' },
    { q: 'Utilisez-vous un drone ?', a: 'Oui, pour les grandes surfaces, il permet un levé rapide et une orthophoto détaillée.' },
    { q: 'Intervenez-vous en cas de litige ?', a: 'Oui, nous réalisons un relevé contradictoire et assurons une médiation technique entre voisins.' },
  ],
  groups: [
    { title: 'Levé et plans topographiques', items: ['Levé topographique du terrain', 'Plan de masse et plans cadastraux', 'Implantation des ouvrages', 'Contrôle et suivi des travaux', 'Plans de récolement'] },
    { title: 'Bornage et foncier', items: ['Bornage des parcelles', 'Délimitation et rétablissement des limites', 'Pose de bornes avec les parties concernées', 'Constitution de dossiers fonciers et de titre foncier', 'Traitement technique des litiges de terrain'] },
    { title: 'Division et lotissement', items: ['Morcellement de parcelles', 'Lotissement', 'Plans de division cotés', 'Préparation des pièces cadastrales', 'Calcul des surfaces'] },
    { title: 'Implantation et contrôle des ouvrages', items: ['Implantation des axes et des niveaux', 'Vérification de la position des ouvrages', 'Contrôle en cours de travaux', 'Récolement après travaux', 'Rapports et plans de suivi'] },
  ],
  // « Tâches » reprises de la brochure Topographie (page 1).
  tasks: [
    { title: 'Levés topographiques', desc: 'Mesure et représentation précise du terrain.' },
    { title: 'Plans topographiques', desc: 'Plans détaillés et fidèles (terrain naturel et aménagé).' },
    { title: 'Bornage et limite de propriété', desc: 'Délimitation exacte de vos parcelles.' },
    { title: 'Relevés par drone', desc: 'Cartographie aérienne et modélisation 3D.' },
    { title: 'Modélisation 3D', desc: 'Représentation numérique de vos projets.' },
    { title: 'Études et conseils', desc: 'Accompagnement sur vos projets fonciers et d’aménagement.' },
  ],
};

export const frDomainPages = [
  frDomainArchitecture,
  frDomainIngenierie,
  frDomainImmobilier,
  frDomainTransit,
  frDomainTopographie,
];

/** Valeurs et garanties communes affichées en bas de chaque page domaine. */
export const frDomainCommon = {
  guaranteeTitle: 'Nos engagements',
  guaranteeSub: 'Quel que soit le domaine, la même exigence s’applique.',
  guarantees: [
    { title: 'Devis gratuit', desc: 'Étude et chiffrage sans engagement, remis sous 48 h ouvrées.' },
    { title: 'Délais respectés', desc: 'Un planning contractuel suivi lors de points hebdomadaires.' },
    { title: 'Prix transparents', desc: 'Aucun coût caché : chaque poste est justifié dans le devis.' },
    { title: 'Interlocuteur unique', desc: 'Un référent dédié de l’étude jusqu’à la livraison.' },
  ],
  ctaTitle: 'Un projet dans ce domaine ?',
  ctaSub: 'Nos équipes vous répondent sous 24 h ouvrées.',
  ctaBtn: 'Demander un devis',
  otherDomains: 'Découvrir nos autres domaines',

  /* ---- Contact dédié (Transit & Immobilier) ---- */
  dedicatedKicker: 'Contact dédié',
  dedicatedTitle: 'Un projet de transit ou immobilier ?',
  dedicatedSub: 'Nos deux pôles les plus demandés disposent d’un interlocuteur direct. Appelez-nous ou écrivez-nous, nous vous répondons rapidement.',
  dedicatedPhoneLabel: 'Ligne directe',
  dedicatedCall: 'Appeler',
  dedicatedWhatsApp: 'Écrire sur WhatsApp',
  dedicatedWaText: 'Bonjour, je vous contacte via votre site pour un projet (transit / immobilier).',
  faqTitle: 'Questions fréquentes',
  deliverablesTitle: 'Ce que vous recevez',
  approachTitle: 'Notre méthode',
  groupTitle: 'Nos prestations',
  reasonTitle: 'Pourquoi nous confier votre projet ?',
  servicesTitle: 'Prestations détaillées',
  tasksTitle: 'Tâches',
  tasksSub: 'Nos interventions concrètes, détaillées une à une.',

  /* ---- Section « vitrine filtrable » (DomainCatalog) ---- */
  catalog: {
    cta: 'Demander',
    whatsapp: 'Demander sur WhatsApp',
    empty: 'Aucun élément dans cette catégorie pour le moment.',
    note: 'Visuels et prix donnés à titre indicatif — à confirmer avec nos équipes.',
    // Titres par domaine
    title: {
      immobilier: 'Nos biens disponibles',
      architecture: 'Nos projets conçus',
      ingenierie: 'Nos réalisations techniques',
      transit: 'Nos prestations de transit',
      topographie: 'Nos interventions topographiques',
    },
    subtitle: {
      immobilier: 'Filtrez par type d’opération (location ou vente) puis par nature du bien.',
      architecture: 'Découvrez nos projets par type de bâtiment.',
      ingenierie: 'Nos ouvrages et études, classés par nature de prestation.',
      transit: 'Nos opérations de dédouanement, transport et logistique.',
      topographie: 'Nos prestations de levé, bornage et implantation.',
    },
    // Libellés des onglets principaux
    offers: {
      all: 'Tout',
      location: 'Location',
      vente: 'Vente',
      service: 'Prestations',
    },
    // Libellés des filtres de type
    types: {
      all: 'Tous',
      maison: 'Maisons',
      appartement: 'Appartements',
      terrain: 'Terrains',
      bureau: 'Bureaux',
      vehicule: 'Véhicules',
      // Architecture
      villa: 'Villas',
      immeuble: 'Immeubles',
      amenagement: 'Aménagements',
      // Ingénierie
      structure: 'Structures',
      batiment: 'Bâtiments',
      vrd: 'Voirie & réseaux',
      // Transit
      dedouanement: 'Dédouanement',
      transport: 'Transport',
      groupage: 'Groupage',
      stockage: 'Stockage',
      // Topographie
      leve: 'Levés',
      bornage: 'Bornage',
      division: 'Division',
      chantier: 'Chantier',
    },
  },
};
