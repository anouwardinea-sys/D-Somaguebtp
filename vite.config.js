/**
 * vite.config.js - Configuration du projet Vite
 *
 * Options utilisées :
 * - plugins : Activation du plugin React pour le support JSX
 * - server : Configuration du serveur de développement
 *   • host: '0.0.0.0' : Permet l'accès depuis le réseau (pour les tests mobiles)
 *   • port: 5173 : Port de développement
 * - build : Options de build pour la production
 *   • outDir: 'dist' : Dossier de sortie des fichiers buildés
 *   • sourcemap: false : PAS de cartes de source en production
 *     (sinon le code source complet est publié dans dist/ — fuite inutile)
 */
import react from '@vitejs/plugin-react';

export default {
  plugins: [
    react(),
  ],
  server: {
    host: '0.0.0.0',  // Accès depuis le réseau (utile pour les tests sur smartphone)
    port: 5173,  // Port de développement
  },
  build: {
    outDir: 'dist',  // Dossier de sortie pour la production
    sourcemap: false,  // Pas de .map publié : le code source reste privé
    // Avertissement relevé au-delà de 500 ko : le bundle principal (~550 ko)
    // dépasse ce seuil. On relève la limite pour garder un build sans bruit,
    // l'avertissement restant sans effet sur le fonctionnement.
    chunkSizeWarningLimit: 800,
  },
};

/**
 * NOTES POUR L'HÉBERGEMENT (LWS) :
 * - Le dossier dist/ généré par `npm run build` est prêt à être envoyé
 *   dans public_html/ de l'hébergement.
 * - Le routage des URL (React Router) est géré par public/.htaccess.
 * - L'API PHP vit dans dist/api/ (copiée depuis api/ par le script de build).
 */
