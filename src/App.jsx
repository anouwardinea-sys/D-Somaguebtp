/**
 * App.jsx - Point d'entrée de l'application D-SOMAGUE INGÉNIERIE
 *
 * Structure de l'application :
 * - Router React (react-router-dom) pour la gestion des routes
 * - Layout : composant qui contient Header, Footer, WhatsAppFloat
 * - Routes : définissent les pages du site et l'espace admin
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { BackToTop } from './components/BackToTop';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Realisation } from './pages/Realisation';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';
import { NotFound } from './pages/NotFound';
import { DomainArchitecture } from './pages/DomainArchitecture';
import { DomainIngenierie } from './pages/DomainIngenierie';
import { DomainImmobilier } from './pages/DomainImmobilier';
import { DomainTransit } from './pages/DomainTransit';
import { DomainTopographie } from './pages/DomainTopographie';
import { News } from './pages/News';
import { NewsArticle } from './pages/NewsArticle';
import { Admin } from './pages/Admin';

/**
 * Layout - Composant qui entoure toutes les pages sauf l'espace admin
 *
 * Les éléments communs à toutes les pages :
 * - Header : navigation fixes avec menu et bouton WhatsApp
 * - Footer : pied de page avec coordonnées et mentions légales
 * - WhatsAppFloat : bouton flottant WhatsApp responsive
 *
 * @param {React.ReactNode} children - La page actuelle à afficher
 * @returns {JSX.Element} Elément JSX avec layout complet
 */
function Layout({ children }) {

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-2 focus:left-2 focus:bg-primary-600 focus:text-white focus:px-4 focus:py-2 focus:rounded">
        Aller au contenu
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
      <ScrollToTop />
    </>
  );
}

/**
 * App - Point d'entrée principal de l'application
 *
 * Définit toutes les routes du site :
 * - Pages principales (Accueil, À propos, Services, Réalisations, Contact, Mentions légales)
 * - Espace admin (séparé du reste du site)
 */
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* ======= PAGES DU SITE ======= */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/realisations" element={<Layout><Realisation /></Layout>} />
        <Route path="/actualites" element={<Layout><News /></Layout>} />
        <Route path="/actualites/:id" element={<Layout><NewsArticle /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/mentions-legales" element={<Layout><Legal /></Layout>} />

        {/* ==== ROUTES DOMAIN ==== */}
        <Route path="/domain/architecture" element={<Layout><DomainArchitecture /></Layout>} />
        <Route path="/domain/ingenierie" element={<Layout><DomainIngenierie /></Layout>} />
        <Route path="/domain/immobilier" element={<Layout><DomainImmobilier /></Layout>} />
        <Route path="/domain/transit" element={<Layout><DomainTransit /></Layout>} />
        <Route path="/domain/topographie" element={<Layout><DomainTopographie /></Layout>} />

        {/* ==== ESPACE ADMIN (séparé : ni Header ni Footer publics) ==== */}
        <Route path="/admin" element={<Admin />} />

        {/* ==== PAGE 404 (toute URL inconnue) ==== */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </Router>
  );
}
