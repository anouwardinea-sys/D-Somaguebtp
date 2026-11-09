import { frCore } from './dict_fr_core';
import { frHome } from './dict_fr_home';
import { frAboutReal } from './dict_fr_about';
import { frContactLegal } from './dict_fr_contact';
import { frServices12 } from './dict_fr_svc12';
import { frServices345 } from './dict_fr_svc345';
import { frServicesPage } from './dict_fr_svcpage';
import { frDomainPage } from './dict_fr_domainpage';
import { domainesFr } from './domaines_fr';
import { frNews } from './dict_news';
import { enCore } from './dict_en_core';
import { enHome } from './dict_en_home';
import { enPages } from './dict_en_pages';
import { enServices12 } from './dict_en_svc12';
import { enServices345 } from './dict_en_svc345';
import { enServicesPage } from './dict_en_svcpage';
import { enDomainPage } from './dict_en_domainpage';
import { domainesEn } from './domaines_en';
import { enNews } from './dict_news';

export const translations = {
  fr: {
    ...frCore, ...frHome, ...frAboutReal, ...frContactLegal,
    servicesPage: { ...frServicesPage, domains: [...frServices12, ...frServices345] },
    domainPage: frDomainPage,
    domaines: domainesFr,
    ...frNews,
    domain: {
      details: 'Détails',
      domainPages: [
        { id: 'architecture', name: 'Architecture' },
        { id: 'ingenierie', name: 'Ingénierie' },
        { id: 'immobilier', name: 'Immobilier' },
        { id: 'transit', name: 'Transit' },
        { id: 'topographie', name: 'Topographie' },
      ],
    },
  },
  en: {
    ...enCore, ...enHome,
    about: enPages.about, realisationPage: enPages.realisationPage,
    contactPage: enPages.contactPage, contactForm: enPages.contactForm,
    waFloat: enPages.waFloat, legal: enPages.legal,
    servicesPage: { ...enServicesPage, domains: [...enServices12, ...enServices345] },
    domainPage: enDomainPage,
    domaines: domainesEn,
    ...enNews,
    domain: {
      details: 'Details',
      domainPages: [
        { id: 'architecture', name: 'Architecture' },
        { id: 'ingenierie', name: 'Engineering' },
        { id: 'immobilier', name: 'Real Estate' },
        { id: 'transit', name: 'Freight & Logistics' },
        { id: 'topographie', name: 'Surveying' },
      ],
    },
  },
};
