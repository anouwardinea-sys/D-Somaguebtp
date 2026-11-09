/**
 * Home.jsx - Page d'accueil du site D-SOMAGUE INGÉNIERIE
 * 
 * Sections de la page d'accueil : accroche, expertises, méthode,
 * engagements, réalisations, questions fréquentes et prise de contact.
 * 
 * Ce composant assemble les sections de la page d'accueil.
 */

// Import des sections de la page d'accueil (depuis src/components/home/)
import { Hero } from '../components/home/Hero';
import { Partners } from '../components/home/Partners';
import { Metiers } from '../components/home/Metiers';
import { Process } from '../components/home/Process';
import { TrustCards } from '../components/home/TrustCards';
import { Realizations } from '../components/home/Realizations';
import { Faq } from '../components/home/Faq';
import { CallToAction } from '../components/home/CallToAction';

export function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <Metiers />
      <Process />
      <TrustCards />
      <Realizations />
      <Faq />
      <CallToAction />
    </>
  );
}
