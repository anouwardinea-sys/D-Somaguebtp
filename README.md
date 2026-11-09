# D-SOMAGUE INGÉNIERIE — Site vitrine + espace admin

Site web officiel de **D. Somague Ingénierie** (Lomé, Togo) : 5 pôles métiers
(Architecture, Ingénierie, Immobilier, Transit, Topographie), actualités,
formulaire de devis et **espace d'administration** pour publier des biens
immobiliers et des actualités.

**Stack :** React 19 · Vite 8 · Tailwind CSS 4 · **API PHP + MySQL** (hébergement
mutualisé LWS) · site 100 % statique en production (aucun serveur Node requis).

---

## 1. Démarrage rapide

```bash
cd dsomague-site
npm install
npm run dev
```

Puis ouvrir **http://localhost:5173**

> ⚠️ **Important** : lancez `npm install` **avant** `npm run dev`. Sans cela,
> Vite ne trouve pas `@vitejs/plugin-react` et le serveur refuse de démarrer.

### Scripts disponibles

| Commande | Rôle | Port |
|---|---|---|
| `npm run dev` | Serveur de développement (rechargement à chaud) | **5173** |
| `npm run build` | Build de production → dossier `dist/` | — |
| `npm run preview` | Sert le `dist/` construit, pour vérifier avant mise en ligne | **4173** |

### Les ports

| Port | Utilisé par | Détail |
|---|---|---|
| **5173** | `npm run dev` | Défini dans `vite.config.js` (`server.port`). Accessible aussi depuis le réseau (`host: '0.0.0.0'`) pour tester sur téléphone : `http://<IP-du-PC>:5173` |
| **4173** | `npm run preview` | Port par défaut de Vite pour la prévisualisation du build |

Si le port 5173 est occupé, Vite en choisit un autre automatiquement et
l'affiche dans le terminal. Pour le changer, modifiez `server.port` dans
`vite.config.js`.

---

## 2. Espace admin (`/admin`)

Deux modes, choisis **automatiquement** selon la disponibilité de l'API PHP :

| Mode | Condition | Identifiants |
|---|---|---|
| **API** (réel) | le dossier `/api` répond (même domaine que le site) | ceux de `api/config.php` (table `admins`) |
| **Local** (démo) | l'API n'est pas joignable (ex. développement local) | `admin@dsomague.tg` / `admin` |

Le mode local stocke les données dans le **localStorage du navigateur**
(pratique pour tester, mais invisible pour les visiteurs). En mode API, les
données sont réellement enregistrées dans MySQL et visibles de tous.

### Comment ça marche

Le site est un **SPA statique** (React) qui parle à une **API PHP** placée dans le
même dossier que lui, sur le domaine `dsomague.com` :

```
Navigateur  ──HTTP──▶  /api/index.php  ──PDO──▶  MySQL (LWS)
                              │
                              └──▶  /uploads  (images téléversées)
```

- `api/index.php` — point d'entrée unique de l'API (auth, biens, actualités,
  messages, téléversement d'images).
- `api/config.php` — identifiants MySQL + clé secrète + comptes admin
  (fichier **non versionné**, à créer sur le serveur à partir de
  `api/config.php.example`).
- `api/schema.sql` — création des tables (à exécuter une fois dans phpMyAdmin).

Pour l'installation complète, voir la section **« Mise en ligne »** ci-dessous et
le fichier **`api/config.php.example`** (modèle commenté à copier sur le serveur).

---

## 3. Mise en ligne

Le site est statique : après `npm run build`, il suffit d'envoyer le contenu
de `dist/` chez l'hébergeur.

| Hébergeur | Fichier utilisé | Rôle |
|---|---|---|
| Netlify / Vercel | `public/_redirects` | Redirige toutes les URL vers `index.html` |
| Apache (cPanel) | `public/.htaccess` | Idem, via `mod_rewrite` |

Ces deux fichiers sont nécessaires pour que les liens directs
(`/actualites/mon-article`, `/domain/immobilier`) fonctionnent : sans eux, un
rechargement de page renvoie une erreur 404.

---

## 4. Structure du projet

```
dsomague-site/
├── index.html                 Point d'entrée HTML (titre, polices, favicon)
├── package.json               Dépendances et scripts npm
├── vite.config.js             Config Vite (plugins, port 5173, build → dist/)
├── tailwind.config.js         ⚠️ NON UTILISÉ (voir « Bugs & corrections » n°4)
├── postcss.config.js          Chaîne PostCSS pour Tailwind v4
├── .env / .env.example        Endpoint du formulaire (non versionné)
├── public/                    Fichiers servis tels quels (copiés dans dist/)
├── qa/                        Scripts de test automatique (non déployés)
├── api/                       API PHP + MySQL (à déployer à la racine du site)
│   ├── index.php              Point d'entrée unique de l'API
│   ├── config.php.example     Modèle des identifiants MySQL (copier → config.php)
│   ├── schema.sql             Création des 4 tables MySQL
│   ├── hash.php               Générateur de hachage BCRYPT pour les mots de passe
│   └── .htaccess              Protège config.php et les fichiers sensibles
└── src/                       Code source React
```

### `public/` — fichiers statiques

| Fichier | Rôle |
|---|---|
| `logo.png` | **Logo officiel** de l'entreprise. Utilisé dans l'en-tête, le pied de page et comme favicon. Pour le remplacer : déposer un nouveau fichier nommé exactement `logo.png`. |
| `robots.txt` | Autorise l'indexation par les moteurs de recherche (`Allow: /`). |
| `_redirects` | Règle de réécriture pour Netlify / Vercel. |
| `.htaccess` | Règle de réécriture pour Apache (cPanel). |

### `api/` — API PHP + MySQL (backend)

| Fichier | Rôle |
|---|---|
| `index.php` | **Point d'entrée unique** de l'API. Gère l'authentification (jetons signés HMAC-SHA256), les biens, les actualités, les messages et le téléversement d'images. |
| `config.php.example` | Modèle des identifiants MySQL + clé secrète + comptes admin. À copier en `config.php` sur le serveur (jamais versionné). |
| `schema.sql` | Script de création des 4 tables (`properties`, `news`, `messages`, `admins`). À exécuter **une fois** dans phpMyAdmin. |
| `hash.php` | Petit outil qui génère un hachage BCRYPT à partir d'un mot de passe (pour créer un compte admin). |
| `.htaccess` | Interdit l'accès web à `config.php`, aux `.sql`, `.log`, `.bak`, etc. |

### `api/schema.sql` — base de données

Script à exécuter **une seule fois** dans phpMyAdmin. Il crée :

- la table `properties` (biens : titre, lieu, prix, offre, type, image)
- la table `news` (actualités : titre, catégorie, date, chapô, corps, image)
- la table `messages` (messages du formulaire de contact + statut de lecture)
- la table `admins` (comptes de l'espace admin, mot de passe en BCRYPT)

Aucune donnée de démonstration n'est insérée : la base reste propre.

### `src/admin/` — couche admin (connexion & données)

| Fichier | Rôle |
|---|---|
| `apiClient.js` | Client HTTP léger qui parle à `/api/index.php`. Exporte `callApi`, `isApiAvailable`, `getToken`… Si l'API n'est pas joignable, le site bascule en mode local. |
| `adminAuth.js` | Authentification. Expose `signIn`, `signOut`, `getSession`, `onAuthChange`, `authMode`. Bascule automatiquement entre l'API et le mode démo. Traduit les erreurs en français. |
| `adminData.js` | Toutes les lectures/écritures admin : `listProperties`, `createProperty`, `updateProperty`, `removeProperty`, `listNews`, `createNews`, `updateNews`, `removeNews`, `uploadImage`. Après chaque écriture, rafraîchit les données publiques. |

### `src/pages/` — pages du site

| Fichier | Route / rôle |
|---|---|
| `Home.jsx` | `/` — page d'accueil (assemble les composants de `components/home/`) |
| `About.jsx` | `/about` — présentation de l'entreprise |
| `Services.jsx` | `/services` — les 5 pôles métiers |
| `Realisation.jsx` | `/realisations` — projets, avec filtres par pôle |
| `News.jsx` | `/actualites` — liste des actualités, filtres par catégorie |
| `NewsArticle.jsx` | `/actualites/:id` — détail d'un article + articles suggérés |
| `Contact.jsx` | `/contact` — coordonnées + formulaire de devis |
| `Legal.jsx` | `/mentions-legales` — mentions légales (NIF, RCCM, hébergeur) |
| `DomainArchitecture.jsx` | `/domain/architecture` |
| `DomainIngenierie.jsx` | `/domain/ingenierie` |
| `DomainImmobilier.jsx` | `/domain/immobilier` — biens issus de l'API (MySQL) |
| `DomainTransit.jsx` | `/domain/transit` |
| `DomainTopographie.jsx` | `/domain/topographie` |
| `Admin.jsx` | `/admin` — aiguillage : écran de connexion **ou** tableau de bord |

> Les 5 pages « domaine » sont volontairement très courtes : elles délèguent
> tout le rendu à `components/DomainPage.jsx` (évite 5 copies à maintenir).

### `src/pages/admin/` — écrans de l'administration

| Fichier | Rôle |
|---|---|
| `AdminLogin.jsx` | Écran de connexion (email + mot de passe) |
| `AdminDashboard.jsx` | Tableau de bord : barre latérale + onglets Biens / Actualités |
| `AdminProperties.jsx` | Ajouter / modifier / supprimer un bien immobilier |
| `AdminNews.jsx` | Ajouter / modifier / supprimer une actualité |
| `ImageUpload.jsx` | Champ réutilisable : téléverser une image ou coller une URL |

> ⚠️ `/admin` est **hors du layout public** : ni en-tête, ni pied de page, ni
> bouton WhatsApp (voir `App.jsx`).

### `src/components/` — composants réutilisables

| Fichier | Rôle |
|---|---|
| `Header.jsx` | En-tête fixe : barre d'infos, logo, menu, sous-menu des domaines, bouton devis, menu mobile |
| `Footer.jsx` | Pied de page : logo, description, liens rapides, coordonnées, mentions NIF/RCCM |
| `Logo.jsx` | Affiche `public/logo.png`. Repli sur un texte si l'image est introuvable. |
| `PageHero.jsx` | Bandeau d'ouverture commun aux pages secondaires (titre, fil d'Ariane, image de fond) |
| `LanguageSwitcher.jsx` | Basculeur de langue FR / EN |
| `ContactForm.jsx` | Formulaire de devis. Envoie vers Formspree si `VITE_FORM_ENDPOINT` est défini, sinon ouvre WhatsApp. |
| `WhatsAppFloat.jsx` | Bouton WhatsApp flottant (bas droite) |
| `ScrollToTop.jsx` | Remet la page en haut à chaque changement de route |
| `DomainPage.jsx` | **Gabarit commun des 5 pages domaine** (bandeau, galerie, stats, FAQ, CTA…) |
| `DomainCatalog.jsx` | Vitrine filtrable (onglets offre → filtres type) pour les biens et prestations |

### `src/components/home/` — sections de la page d'accueil

| Fichier | Section |
|---|---|
| `Hero.jsx` | Grande bannière d'accueil |
| `DomainNavigation.jsx` | Accès rapide aux 5 domaines |
| `Metiers.jsx` | Cartes des métiers |
| `Process.jsx` | Notre méthode, étape par étape |
| `Realizations.jsx` | Aperçu des réalisations |
| `TrustCards.jsx` | Arguments de confiance |
| `Partners.jsx` | Partenaires |
| `CallToAction.jsx` | Appel à l'action final |

### `src/components/icons/`

| Fichier | Rôle |
|---|---|
| `DomainIcons.jsx` | Bibliothèque d'icônes SVG (grue, plan, camion…) + `DOMAIN_ICONS` par domaine |
| `WhatsAppIcon.jsx` | Logo WhatsApp officiel (SVG) |

### `src/i18n/` — traductions (français / anglais)

Tout le texte du site est **bilingue**. Le dictionnaire actif est choisi par
`LanguageContext.jsx` selon la langue sélectionnée.

| Fichier | Contenu |
|---|---|
| `translations.js` | **Point d'assemblage** : fusionne tous les dictionnaires par langue |
| `LanguageContext.jsx` | Fournit `lang`, `setLang` et `t` à tout le site (langue mémorisée en localStorage) |
| `catalogue.js` | Éléments filtrables par domaine (biens et prestations d'exemple) |
| `domaines_fr.js` / `domaines_en.js` | Description des 5 pôles métiers |
| `dict_fr_core.js` / `dict_en_core.js` | Textes communs (navigation, pied de page) |
| `dict_fr_home.js` / `dict_en_home.js` | Page d'accueil |
| `dict_fr_about.js` / `dict_en_pages.js` | À propos, réalisations, contact, mentions légales |
| `dict_fr_contact.js` | Formulaire de contact (FR) |
| `dict_fr_svc12.js` / `dict_en_svc12.js` | Fiches de service (pôles 1 et 2) |
| `dict_fr_svc345.js` / `dict_en_svc345.js` | Fiches de service (pôles 3 à 5) |
| `dict_fr_svcpage.js` / `dict_en_svcpage.js` | Page Services |
| `dict_fr_domainpage.js` / `dict_en_domainpage.js` | Gabarit des pages domaine |
| `dict_fr_domainpages.js` / `dict_en_domainpages.js` | Contenu détaillé des 5 pages domaine |
| `dict_news.js` | Page Actualités (FR + EN dans le même fichier) |

### Fichiers de test (non déployés)

Ces scripts servent à vérifier le site automatiquement. Ils ne font **pas**
partie du build et ne sont pas envoyés en production.

| Fichier | Rôle |
|---|---|
| `qa/admin-flow.mjs` | Test du parcours admin : connexion, ajout d'un bien, vérification côté public |
| `qa/admin-clean.mjs` | Supprime les données de test créées par `admin-flow.mjs` |
| `qa/menu.mjs` | Test du menu et de la navigation |
| `qa-catalog.mjs` *(à la racine)* | Test des filtres du catalogue immobilier |

### Autres fichiers `src/`

| Fichier | Rôle |
|---|---|
| `index.jsx` | Point d'entrée React : monte `<App />` dans `#root` |
| `App.jsx` | **Toutes les routes** du site + le layout (Header/Footer/WhatsApp) |
| `config.js` | **Coordonnées de l'entreprise** : téléphones, WhatsApp, email, adresse, horaires, NIF/RCCM. *À modifier ici uniquement.* |
| `store.js` | Couche de données publique : lit l'API (mode connecté) ou le catalogue local (mode démo) |
| `index.css` | Thème Tailwind v4 (`@theme`, palette bleue) + styles globaux et animations |
| `assets/images.js` | **Registre central des images** (URL Unsplash). Un seul fichier à changer pour mettre les vraies photos. |
| `hooks/useReveal.jsx` | Animations à l'apparition (`useReveal`, `useCountUp`, composant `<Reveal>`) |

---

## 5. Bugs trouvés & corrections apportées

### 1. Le site public ne lisait pas la base de données ⚠️ *correction majeure*

**Symptôme :** un bien ou une actualité publié depuis l'admin était bien
enregistré dans la base, mais **n'apparaissait pas** sur le site public — ni
pour les visiteurs, ni même pour l'admin.

**Cause :** `src/store.js` lisait uniquement le `localStorage` et le catalogue
figé `catalogue.js`, jamais la base de données. L'admin écrivait donc dans une
base que le site public ignorait.

**Correction (`src/store.js` + `src/admin/adminData.js`) :**

- `store.js` : les hooks publics `useProperties()` / `useNews()` chargent
  désormais les données depuis l'API au démarrage, puis les diffusent à
  tous les composants. En cas d'erreur réseau, un repli local garde le site
  affiché.
- `adminData.js` : après chaque ajout / modification / suppression, les données
  publiques sont rafraîchies, donc le changement est visible immédiatement.

**Vérifié :** la page `/domain/immobilier` affiche bien les biens présents dans
MySQL, et `/actualites` les articles correspondants.

### 2. Le logo avait disparu de l'en-tête (repli texte)

**Symptôme :** l'en-tête et le pied de page affichaient du texte
(« D. SOMAGUE INGENIERIE ») au lieu du logo.

**Cause :** le fichier `public/logo.png` était **absent** du projet. Le
composant `Logo.jsx` détectait l'image manquante et basculait sur son repli
texte — ce qui masquait le problème (aucune icône « image cassée »).

**Correction :** le logo officiel a été extrait et enregistré dans
`public/logo.png`. Le composant affiche à nouveau le fichier réel.

### 3. Le favicon ne se chargeait pas

**Symptôme :** aucun logo dans l'onglet du navigateur.

**Cause :** `index.html` pointait vers `/logo.png`, fichier qui n'existait pas
(voir bug n°2).

**Correction :** le favicon pointe vers le logo désormais présent. Il est
servi en `image/png`.

> Si le logo doit être remplacé : déposer le nouveau fichier sous le nom exact
> `logo.png` dans `public/`. L'en-tête, le pied de page et le favicon suivront
> automatiquement.

### 4. Deux configurations Tailwind contradictoires ✅ *corrigé*

**Constat :** le projet contenait deux définitions de la couleur `primary` :

- `tailwind.config.js` → **rose** (`#db2777`)
- `src/index.css` (`@theme`) → **bleu** (`#1c4fa1`)

**Explication :** ce projet utilise **Tailwind CSS v4**, qui **ne lit plus**
`tailwind.config.js` : seules les variables déclarées dans `@theme` comptent.
C'est donc le **bleu** qui s'applique partout (couleur du logo).

**Correction :** `tailwind.config.js` a été aligné sur le bleu de marque et
marqué comme **non utilisé** en en-tête de fichier, pour éviter toute confusion.

**À retenir :** pour changer la palette de marque, modifiez `@theme` dans
`src/index.css`. Le fichier `tailwind.config.js` reste **sans effet**.

### 5. Mentions « rouge » devenues obsolètes ✅ *corrigé*

**Constat :** plusieurs commentaires dans `src/index.css` parlaient encore d'un
thème « rouge » (« Palette rouge ingénierie », « Variables liées au nouveau
thème (rouge) »), alors que la palette en place est **bleue**.

**Correction :** les commentaires ont été mis à jour (« Palette bleue », « thème
(bleu) »). Aucun impact sur l'affichage — correction documentaire uniquement.

---

## 6. Pistes d'amélioration (non corrigées)

- **Images externes :** les visuels pointent vers Unsplash. En cas de coupure
  réseau ou de blocage, certaines images ne s'affichent pas. À remplacer par
  les photos réelles, idéalement **hébergées sur le site** (dossier `uploads/`).

---

## 7. À fournir par le client avant la mise en ligne

- [ ] Photos réelles des chantiers et de l'équipe
- [ ] Chiffres clés réels (années d'expérience, nombre de projets)
- [ ] Logo en haute résolution (le logo actuel est extrait d'une capture d'écran :
      244 × 142 px — suffisant à l'affichage, mais un fichier d'origine serait
      plus net si on l'agrandit)
- [ ] Email professionnel, confirmation du numéro WhatsApp et des horaires
- [ ] Liens des réseaux sociaux (actuellement des `#` dans le pied de page)
