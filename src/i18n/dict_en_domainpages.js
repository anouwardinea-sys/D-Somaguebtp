/**
 * dict_en_domainpages.js — English content for the 5 domain pages.
 * Same structure as dict_fr_domainpages.js for easy i18n.
 */

const enDomainArchitecture = {
  id: 'architecture',
  name: 'Architecture',
  tagline: 'Designing sustainable spaces you will love to live in',
  heroKicker: 'Pôle 01 — Architecture',
  heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
  intro: 'Our architecture studio turns your wishes into buildable documents: from the first sketch to the building permit, and then to the execution plans used on site. We combine aesthetics, climate comfort, anti-seismic standards and budget control.',
  deliverables: [
    '2D scaled plans (layout, floors, sections, facades)',
    'Photorealistic 3D views to approve the project',
    'Full building permit dossier',
    'Execution plans and technical details for the site',
  ],
  approach: [
    { title: 'Program', desc: 'We listen to your needs, budget and site constraints.' },
    { title: 'Sketch', desc: 'Volume and layout proposals, revised together with you.' },
    { title: 'Permit', desc: 'Dossier assembly and submission to the Lomé town hall.' },
    { title: 'Execution', desc: 'Building plans, compliance checks and adjustments.' },
  ],
  faq: [
    { q: 'Can you work from an existing plan?', a: 'Yes. We audit the file, fix non-conformities and deliver a usable version for contractors.' },
    { q: 'How long does a building permit take?', a: '4 to 8 weeks in most communes, once the complete file is submitted. We handle monitoring at commission.' },
    { q: 'Do you do 3D modelling?', a: 'Yes, systematically for significant projects. It avoids misunderstandings before works start.' },
  ],
  groups: [
    { title: 'Architectural design', items: ['Brief, site and budget review', 'Sketches and preliminary designs', 'Site, floor, section and elevation plans', '3D modelling and digital visualisation', 'Material selection and space planning'] },
    { title: 'Technical plans and permits', items: ['Execution plans and technical details', 'Structural formwork and reinforcement plans', 'Technical documents for construction', 'Building permit applications', 'Administrative and financial project support'] },
    { title: 'Project direction and site follow-up', items: ['Organisation and coordination of project stakeholders', 'Site visits and construction follow-up', 'Compliance checks against plans', 'Attention to safety, accessibility and environmental considerations', 'Progress reports and handover'] },
    { title: 'Interior, exterior and renovation', items: ['Interior and exterior space planning', 'Renovation and restoration', 'Material and finish selection', 'Landscape design', 'Lighting and atmosphere'] },
  ],
  // "Tasks" taken verbatim from the Architecture brochure (page 1).
  tasks: [
    { title: 'Plan design', desc: 'Architectural and 3D plans.' },
    { title: '3D modelling and renders' },
    { title: 'Site follow-up and assistance' },
    { title: 'Space planning advice' },
    { title: 'Renovation and rehabilitation' },
    { title: 'Building permits and authorisations' },
  ],
};

const enDomainIngenierie = {
  id: 'ingenierie',
  name: 'Engineering',
  tagline: 'Building solidly, on time and on budget',
  heroKicker: 'Field 02 — Engineering',
  heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80',
  intro: 'Our civil engineering pole covers the entire build: structural studies, utility sizing, main works, secondary works and quality control. One point of contact, a controlled schedule.',
  deliverables: [
    'Structural calculations and formwork plans',
    'Execution schedule and detailed quantitative quote',
    'Progress photos and weekly reports',
    'Handover report and guarantee',
  ],
  approach: [
    { title: 'Studies', desc: 'Surveys, calculation notes, sizing and precise measure.' },
    { title: 'Preparation', desc: 'Material selection, schedule and team mobilisation.' },
    { title: 'Execution', desc: 'Main works, secondary works and quality control at every level.' },
    { title: 'Handover', desc: 'Defects rectification, handover report and after-sales support.' },
  ],
  faq: [
    { q: 'Do you build outside Lomé?', a: 'Yes, we work across Togo and in neighbouring regions.' },
    { q: 'What is your lead time?', a: 'We commit to a contractual schedule and provide weekly progress points.' },
    { q: 'How do you guarantee quality?', a: 'Independent surveyors and a documented quality process on every site.' },
  ],
  groups: [
    { title: 'Engineering studies and calculations', items: ['Soil and structural studies', 'Structural calculations and sizing', 'Reinforced concrete and steel structures', 'Digital modelling', 'Quantity surveying and estimates'] },
    { title: 'Design and preparation', items: ['Formwork and reinforcement plans', 'Roads and utility networks', 'Execution studies', 'Material selection and applicable standards', 'Existing-building diagnosis'] },
    { title: 'Engineering advice and coordination', items: ['Technical advice to the project owner', 'Project management assistance', 'Stakeholder coordination', 'Strengthening and rehabilitation', 'Cost studies and control'] },
    { title: 'Construction direction and control', items: ['Work planning and schedule monitoring', 'Site-team coordination', 'Material and workmanship quality control', 'Cost and deadline monitoring', 'Provisional and final handover'] },
  ],
  // "Tasks" taken verbatim from the Génie Services brochure (page 1).
  tasks: [
    { title: 'Studies and design', desc: 'Technical studies and project design.' },
    { title: 'Work monitoring and control', desc: 'Supervision and follow-up of construction sites.' },
    { title: 'Building and public works (BTP)', desc: 'Construction and development (houses, buildings, roads, etc.).' },
    { title: 'Sanitation works', desc: 'Pipes, culverts and water drainage.' },
    { title: 'Technical advice and support', desc: 'Support and expertise for your projects.' },
    { title: 'Infrastructure studies', desc: 'Roads, various networks and development.' },
    { title: 'Sustainable engineering', desc: 'Environmentally friendly solutions.' },
  ],
};

const enDomainImmobilier = {
  id: 'immobilier',
  name: 'Real Estate',
  tagline: 'Buying, renting and managing with total confidence',
  heroKicker: 'Pôle 03 — Real Estate',
  heroImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80',
  intro: 'We secure every real estate transaction: title verification, accompanied viewing and notarised deed. Villas, apartments, land and commercial spaces in Lomé and the surrounding region.',
  deliverables: [
    'Title and land registry verification',
    'Accompanied viewing and market valuation',
    'Notarised deed and administrative file',
    'Rental management and annual reporting',
  ],
  approach: [
    { title: 'Search', desc: 'We identify the right properties for your budget and needs.' },
    { title: 'Verification', desc: 'Title check, easements and cadastral audit.' },
    { title: 'Negotiation', desc: 'Sensible pricing and secure contract drafting.' },
    { title: 'Handover', desc: 'Key transfer, technical inventory and follow-up.' },
  ],
  faq: [
    { q: 'How do you verify a title?', a: 'We check the cadastral record, easements and any encumbrances before any purchase.' },
    { q: 'Do you handle rentals?', a: 'Yes: finding the property, drafting the lease and managing the tenancy.' },
    { q: 'Do you sell commercial premises?', a: 'Yes: offices, shops and storage spaces with full due diligence.' },
  ],
  groups: [
    { title: 'Sales', items: ['Villa and apartment sales', 'Verified titled land', 'Commercial premises and offices', 'Market-price valuation', 'Secure negotiation'] },
    { title: 'Rentals & management', items: ['Tenant placement', 'Full rental management', 'Joint inspections', 'Arrears follow-up', 'Monthly reporting'] },
    { title: 'Investment', items: ['High-yield sourcing', 'Buy-to-let setup', 'Supervision for expatriates', 'Assisted resale'] },
  ],
  // "Tasks" taken from the Real Estate brochure (page 1).
  tasks: [
    { title: 'Property sales', desc: 'Houses, apartments, land and commercial premises.' },
    { title: 'Property rentals', desc: 'Homes, offices and commercial spaces.' },
    { title: 'Land purchase and sale', desc: 'Serviced or undeveloped land for every project.' },
    { title: 'Property investment', desc: 'Advice and support for your investment projects.' },
    { title: 'Property management', desc: 'Maintenance, follow-up and value enhancement of your assets.' },
    { title: 'Advice and support', desc: 'Personal guidance at every stage of your project.' },
  ],
};

const enDomainTransit = {
  id: 'transit',
  name: 'Freight & Logistics',
  tagline: 'Your goods cleared and delivered without stress',
  heroKicker: 'Pôle 04 — Freight & Logistics',
  heroImage: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1600&q=80',
  intro: 'We support import and export operations through document preparation, customs formalities, transport coordination and shipment follow-up by sea, air or road.',
  deliverables: [
    'Customs paperwork preparation and follow-up',
    'Transport coordination by sea, air or road',
    'Shipment coordination through delivery',
    'Administrative follow-up of the operation',
  ],
  approach: [
    { title: 'Documents', desc: 'Check the consignee details, invoice and certificates required.' },
    { title: 'Customs', desc: 'Preparation and follow-up of the required customs formalities.' },
    { title: 'Transport', desc: 'Coordination of maritime, air or road transport.' },
    { title: 'Delivery', desc: 'Shipment follow-up and administrative file completion.' },
  ],
  faq: [
    { q: 'Which import documents do you need?', a: 'Commercial invoice, air waybill or bill of lading, certificate of origin and compliance certificate.' },
    { q: 'Which transport modes can you coordinate?', a: 'We support maritime, air and road transport according to the operation.' },
    { q: 'Can you assist with exports?', a: 'Yes, we support the administrative and logistical coordination of import and export operations.' },
  ],
  groups: [
    { title: 'Transport coordination', items: ['Maritime, air and road transport', 'Collection and transport coordination', 'Truck and heavy-goods transport', 'Shipment follow-up', 'Delivery coordination'] },
    { title: 'Customs formalities', items: ['Preparation of customs declarations', 'Import and export formalities support', 'Coordination with relevant services', 'Administrative file follow-up', 'Assistance until goods are made available'] },
    { title: 'Freight and logistics', items: ['Freight-operation coordination', 'Coordination with carriers', 'Transport document management', 'Logistics-operation follow-up', 'Administrative file management'] },
    { title: 'Advice and assistance', items: ['Import and export document checks', 'Preparation of required paperwork', 'Information on each step of the process', 'Coordination between sender, carrier and recipient', 'Administrative assistance'] },
  ],
  // "Tasks" taken from the Maritime Freight brochure (page 1).
  tasks: [
    { title: 'Maritime transport', desc: 'Import and export of your goods.' },
    { title: 'Freight and containers', desc: 'Standard and special container shipments.' },
    { title: 'Customs clearance', desc: 'Fast and secure customs formalities.' },
  ],
};

const enDomainTopographie = {
  id: 'topographie',
  name: 'Surveying',
  tagline: 'Measuring precisely so building without disputes',
  heroKicker: 'Pôle 05 — Topography',
  heroImage: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1600&q=80',
  intro: 'Topographic surveys, plot boundary marking, cadastral plans and structure setting-out support construction preparation and clarify land boundaries.',
  deliverables: [
    'Mass plan and digital terrain model',
    'Contested boundary marking report',
    'Title registry dossier',
    'Setting-out report and re-establishment',
  ],
  approach: [
    { title: 'Survey', desc: 'Drone or GPS RTK survey of the area.' },
    { title: 'Analysis', desc: 'Calculation of areas, volumes and precise boundaries.' },
    { title: 'Marking', desc: 'Boundary stakes placed with all parties present.' },
    { title: 'Deliverables', desc: 'Topo plans, reports and land dossier handed to the client.' },
  ],
  faq: [
    { q: 'Is boundary marking required to sell?', a: 'It is strongly recommended: it fixes the limits by contestation and prevents future disputes.' },
    { q: 'Do you use a drone?', a: 'Yes, for large areas it delivers fast surveys and detailed orthophotos.' },
    { q: 'Do you act in a dispute?', a: 'Yes, we perform a contested survey and provide technical mediation between neighbours.' },
  ],
  groups: [
    { title: 'Surveys and topographic plans', items: ['Land surveys', 'Site and cadastral plans', 'Setting-out of structures', 'Construction control and follow-up', 'As-built plans'] },
    { title: 'Boundaries and land records', items: ['Land boundary surveys', 'Boundary definition and re-establishment', 'Boundary markers placed with the parties concerned', 'Land and title-deed documentation', 'Technical support for land disputes'] },
    { title: 'Subdivision and land development', items: ['Plot subdivision', 'Land development plans', 'Dimensioned subdivision plans', 'Cadastral documents', 'Area calculations'] },
    { title: 'Setting-out and construction control', items: ['Axis and level setting-out', 'Verification of structure positions', 'Checks during construction', 'As-built surveys', 'Follow-up reports and plans'] },
  ],
  // "Tasks" taken from the Surveying brochure (page 1).
  tasks: [
    { title: 'Topographic surveys', desc: 'Accurate measurement and representation of the terrain.' },
    { title: 'Topographic plans', desc: 'Detailed, faithful plans of natural and developed ground.' },
    { title: 'Boundary marking', desc: 'Exact delineation of your plots.' },
    { title: 'Drone surveys', desc: 'Aerial mapping and 3D modelling.' },
    { title: '3D modelling', desc: 'Digital representation of your projects.' },
    { title: 'Studies and advice', desc: 'Support for your land and development projects.' },
  ],
};

export const enDomainPages = [
  enDomainArchitecture,
  enDomainIngenierie,
  enDomainImmobilier,
  enDomainTransit,
  enDomainTopographie,
];

/** Shared values and guarantees shown at the bottom of each domain page. */
export const enDomainCommon = {
  guaranteeTitle: 'Our guarantees',
  guaranteeSub: 'No matter the field, the same high standard applies.',
  guarantees: [
    { title: 'Free quote', desc: 'Study and quotation without commitment, delivered within 48h.' },
    { title: 'Respected deadlines', desc: 'Contractual schedule followed at weekly progress meetings.' },
    { title: 'Transparent pricing', desc: 'No hidden costs. Every item is justified in the quote.' },
    { title: 'Single point of contact', desc: 'A dedicated reference from study to delivery.' },
  ],
  ctaTitle: 'A project in this field?',
  ctaSub: 'Our teams reply within 24h.',
  ctaBtn: 'Request a quote',
  otherDomains: 'Discover our other fields',

  /* ---- Dedicated contact (Freight & Real Estate) ---- */
  dedicatedKicker: 'Dedicated contact',
  dedicatedTitle: 'A freight or real-estate project?',
  dedicatedSub: 'Our two most requested divisions have a direct point of contact. Call or message us, we reply quickly.',
  dedicatedPhoneLabel: 'Direct line',
  dedicatedCall: 'Call',
  dedicatedWhatsApp: 'Message on WhatsApp',
  dedicatedWaText: 'Hello, I am contacting you through your website for a project (freight / real estate).',
  faqTitle: 'Frequently asked questions',
  deliverablesTitle: 'What you receive',
  approachTitle: 'Our approach',
  servicesTitle: 'Detailed services',
  tasksTitle: 'Tasks',
  tasksSub: 'Our concrete assignments, detailed one by one.',

  /* ---- Filterable showcase (DomainCatalog) ---- */
  catalog: {
    cta: 'Enquire',
    whatsapp: 'Ask on WhatsApp',
    empty: 'No item in this category yet.',
    note: 'Images and prices are indicative — please confirm with our team.',
    title: {
      immobilier: 'Our available properties',
      architecture: 'Our designed projects',
      ingenierie: 'Our technical works',
      transit: 'Our freight services',
      topographie: 'Our surveying services',
    },
    subtitle: {
      immobilier: 'Filter by operation (rent or sale) then by type of property.',
      architecture: 'Browse our projects by type of building.',
      ingenierie: 'Our works and studies, sorted by type of service.',
      transit: 'Our customs clearance, transport and logistics operations.',
      topographie: 'Our survey, boundary and setting-out services.',
    },
    offers: {
      all: 'All',
      location: 'For rent',
      vente: 'For sale',
      service: 'Services',
    },
    types: {
      all: 'All',
      maison: 'Houses',
      appartement: 'Apartments',
      terrain: 'Land',
      bureau: 'Offices',
      vehicule: 'Vehicles',
      villa: 'Villas',
      immeuble: 'Buildings',
      amenagement: 'Fit-outs',
      structure: 'Structures',
      batiment: 'Buildings',
      vrd: 'Roads & utilities',
      dedouanement: 'Customs',
      transport: 'Transport',
      groupage: 'Groupage',
      stockage: 'Storage',
      leve: 'Surveys',
      bornage: 'Boundary',
      division: 'Subdivision',
      chantier: 'On site',
    },
  },
};
