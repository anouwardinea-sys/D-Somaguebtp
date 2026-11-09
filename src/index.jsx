/**
 * index.jsx - Point d'entrée React de l'application
 * 
 * Cette fonction initialise l'application React dans le DOM
 * et active le StrictMode pour détecter les effets secondaires.
 *
 * strictMode : Active les vérifications du développement qui aident à
 * repérer les problèmes potentiels dans l'application.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { LanguageProvider } from './i18n/LanguageContext';

// Création du racine du DOM React
// document.getElementById('root') : référence au div #root dans index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);

/**
 * NOTE : Si vous travaillez sur un projet existant,
 * vérifiez que le fichier index.html contient bien :
 * <div id="root"></div>
 * dans le body, sinon React ne pourra pas s'initialiser.
 */
