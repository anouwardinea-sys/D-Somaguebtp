# 🚀 Guide de déploiement complet — D-SOMAGUE INGÉNIERIE sur LWS

> Version 1.0 — novembre 2026. Ce guide couvre **tout** le parcours : base de
> données MySQL, import des tables, création du compte admin, construction du
> site, envoi des fichiers via FTP, configuration, HTTPS et vérifications.
> Hébergement cible : **LWS** (mutualisé Apache + PHP + MySQL).

---

## ⚡ Résumé express (30 secondes)

1. `npm run build` → génère le dossier **`dist/`** (déjà fait : `deploiement-lws.zip`)
2. Panel LWS → créer une **base MySQL** + importer **`api/schema.sql`**
3. Envoyer **le contenu de `dist/`** dans **`public_html/`** (FTP ou zip)
4. Sur le serveur : créer **`api/config.php`** avec vos identifiants MySQL
5. Ouvrir `https://votre-domaine.com/api/hash.php?p=MotDePasse` → coller le hachage dans `config.php` → **supprimer `hash.php`**
6. Tester le site + l'admin, activer le SSL gratuit LWS. ✅

Le dossier `dist/` du dépôt contient déjà un build prêt à l'emploi, également
compressé dans **`deploiement-lws.zip`** (à la racine du projet).

---

## 📦 1. Ce que contient le paquet de déploiement

| Élément                     | Rôle                                                                 |
| --------------------------- | -------------------------------------------------------------------- |
| `index.html`, `assets/`     | Le site React compilé (statique)                                     |
| `.htaccess`                 | Réécriture SPA, HTTPS forcé, compression, cache, sécurité            |
| `api/index.php`             | API PHP unique (auth admin, biens, actualités, messages, uploads)    |
| `api/config.php.example`    | Modèle à copier en `config.php` (identifiants MySQL)                 |
| `api/schema.sql`            | Script de création des 4 tables MySQL                                |
| `api/hash.php`              | Générateur de mot de passe admin (**à supprimer après usage**)       |
| `api/.htaccess`             | Protections du dossier API (config.php inaccessible, pas de listing) |
| `uploads/`                  | Dossier d'accueil des images téléversées depuis l'admin              |
| `images/`, `videos/`        | Médias du site                                                       |
| `robots.txt`, `sitemap.xml` | SEO (réglés sur `dsomague.com`)                                      |

⚠️ **Il n'y a pas de Node.js à installer chez LWS** : le site est 100 % statique

- un petit backend PHP.

## ✅ 2. Prérequis

| Élément                     | Détail                                                                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Hébergement LWS             | Pack mutualisé avec **PHP 8.0+** et **MySQL** (formule « Perso », « Mamute »…)                                                 |
| Nom de domaine              | Ex. `dsomague.com` — `robots.txt`, `sitemap.xml` et `index.html` référencent `dsomague.com` : adaptez si votre domaine diffère |
| Accès panel LWS             | Identifiant + mot de passe de l'espace client LWS                                                                              |
| Node.js ≥ 18 (sur votre PC) | Uniquement si vous voulez reconstruire le site (`npm run build`)                                                               |
| Client FTP                  | FileZilla (gratuit) ou le gestionnaire de fichiers du panel LWS                                                                |

---

## 🗄️ 3. Créer la base de données MySQL sur LWS

1. Connectez-vous au **panel LWS**.
2. Menu **Hébergement → Bases de données (MySQL)** → **« Créer une base »**.
3. Renseignez :
   - **Nom de la base** : `dsomague` → LWS le préfixe automatiquement
     (ex. `lws1234567_dsomague`)
   - **Utilisateur** : `admin` → devient `lws1234567_admin`
   - **Mot de passe** : solide (majuscules + chiffres + symboles) — **notez-le**
4. Validez et **attendez quelques minutes** que la base devienne active.

> 📝 **Notez ces 4 valeurs**, elles serviront à l'étape 7 :
> `hôte` (souvent `localhost`), `nom de la base`, `utilisateur`, `mot de passe`.

## 📥 4. Importer les tables (schema.sql)

1. Panel LWS → **Bases de données → phpMyAdmin** (ou « Gérer » à côté de la base).
2. Sélectionnez votre base (`lwsXXXXXXX_dsomague`) dans la colonne de gauche.
3. Onglet **SQL** (ou bouton **Importer**) → collez/chargez tout le contenu de
   `api/schema.sql` → **Exécuter**.
4. Vérifiez : 4 tables apparaissent — `properties`, `news`, `messages`, `admins`.

Aucune donnée de démo n'est insérée : la base démarre propre.

## 🔑 5. Créer le compte administrateur

Deux méthodes possibles :

**Méthode A — avec `hash.php` (recommandée, 2 minutes)**

1. Envoyez d'abord les fichiers (étape 6), puis ouvrez :
   `https://votre-domaine.com/api/hash.php?p=VotreMotDePasse`
2. Copiez le hachage affiché (commence par `$2y$10$…`).
3. Collez-le dans `api/config.php` (étape 7), dans le tableau `admins`.
4. ⚠️ **Supprimez ensuite `api/hash.php` du serveur.**

**Méthode B — en local, avant l'envoi**

```bash
cd site/dsomague-site
php -r "echo password_hash('VotreMotDePasse', PASSWORD_BCRYPT);"
```

Puis collez le résultat dans `config.php` avant d'envoyer les fichiers.

---

## 🏗️ 6. Construire le site (si nécessaire)

Le build existe déjà (`dist/` + `deploiement-lws.zip`). Pour le regénérer après
des modifications du code :

```bash
cd site/dsomague-site
npm install        # une seule fois
npm run build      # → régénère dist/ (site + api + uploads)
```

Le script `build.js` : compile avec Vite, copie `api/` dans `dist/api/`
(**sans** le fichier local `config.php`), et crée `dist/uploads/`.

## 📤 7. Envoyer les fichiers sur LWS

### Option A — via le panel LWS (le plus simple)

1. Panel LWS → **Hébergement → Gestionnaire de fichiers**.
2. Entrez dans **`public_html/`** et videz-le s'il contient des fichiers par défaut.
3. Téléversez `deploiement-lws.zip` puis utilisez **« Extraire »** (clic droit).
4. Vérifiez qu'à la racine de `public_html/` il y a bien :
   `index.html`, `.htaccess`, `api/`, `assets/`, `images/`, `videos/`, `uploads/`,
   `robots.txt`, `sitemap.xml`.
   → `.htaccess` est un fichier caché : activez « afficher les fichiers cachés ».

### Option B — via FileZilla

1. Site → Hôte : `ftp://ftp.mon-domaine.com` (ou l'hôte FTP indiqué dans le panel
   LWS), utilisateur/mot de passe FTP de l'espace client, port **21**.
2. Dans le panneau distant, ouvrez `public_html/`.
3. Glissez **le contenu du dossier `dist/`** (pas le dossier lui-même) vers la droite.
4. Transfert en mode **binaire**, écraser les anciens fichiers.

> ⚠️ Ne chargez **pas** : `api/config.php.example` peut rester (protégé par le
> `.htaccess` du dossier api), mais `hash.php` sera supprimé à l'étape 8.

## ⚙️ 8. Créer `api/config.php` sur le serveur

1. Dans le gestionnaire de fichiers LWS, ouvrez **`api/`**.
2. Copiez `config.php.example` → renommez la copie en **`config.php`**.
3. Éditez `config.php` et remplacez les valeurs par celles du panel LWS :

```php
return [
  'db_host' => 'localhost',                     // ou sqlXXX.lws-hosting.fr
  'db_name' => 'lws1234567_dsomague',
  'db_user' => 'lws1234567_admin',
  'db_pass' => 'VOTRE_MOT_DE_PASSE',

  'secret_key' => 'UNE_LONGUE_CHAINE_ALEATOIRE_DE_40_CARACTERES_OU_PLUS',

  'admins' => [
    'somagueingenierie@gmail.com' => '$2y$10$…hachage_copié_depuis_hash.php…',
  ],

  'timezone'      => 'Africa/Lome',
  'session_hours' => 12,
  'max_upload_mb' => 5,
];
```

Pour `secret_key`, générez une chaîne aléatoire (par ex. sur
https://www.random.org/strings/ — mode hexadécimal, 40+ caractères).

💡 Il est aussi possible de générer le hachage **directement en ligne** :
ouvrez `https://votre-domaine.com/api/hash.php?p=MotDePasse`, copiez le hachage,
collez-le ici, **puis supprimez `hash.php` du serveur**.

## 🔒 9. Droits du dossier `uploads/`

Les images ajoutées depuis l'admin sont enregistrées dans `uploads/`. Il faut
que PHP puisse y écrire :

- Panel LWS → gestionnaire de fichiers → clic droit sur `uploads/` →
  **Permissions** → cochez Écriture, ou définissez **755** (voire **775**).
- Avec FileZilla : clic droit sur le dossier distant → _Attributs des fichiers_
  → Valeur numérique **755** → « Appliquer aux sous-dossiers ».

## 🌐 10. Activer le HTTPS (SSL gratuit LWS)

1. Panel LWS → **SSL/TLS** → commande du **certificat gratuit Let's Encrypt**
   (Let's Encrypt™ offert chez LWS) pour votre domaine + `www`.
2. Attendez l'activation (quelques minutes à 1 h).
3. Le `.htaccess` inclus **redirige déjà tout le HTTP vers HTTPS** (gère aussi le
   proxy LWS via `X-Forwarded-Proto`) — rien à coder.
4. Testez : `http://votre-domaine.com` doit basculer en `https://` automatiquement.

## ✔️ 11. Vérifier que tout fonctionne

| Test                  | Attendu                                         | Comment                                               |
| --------------------- | ----------------------------------------------- | ----------------------------------------------------- |
| Page d'accueil        | Le site s'affiche avec styles                   | `https://votre-domaine.com`                           |
| Navigation SPA        | `/contact`, `/services`, etc. sans erreur 404   | Cliquez dans les menus                                |
| API en ligne          | Réponse JSON                                    | `https://votre-domaine.com/api/index.php?action=news` |
| Connexion admin       | Redirection vers le tableau de bord             | `https://votre-domaine.com/admin`                     |
| Téléversement d'image | L'image apparaît dans `/uploads`                | Depuis l'admin, ajoutez un bien                       |
| Formule de devis      | Envoi reçu (WhatsApp ou Formspree selon config) | Formulaire de contact                                 |
| HTTPS                 | Cadenas vert, pas d'avertissement               | Navigateur                                            |

## 🧯 12. Problèmes fréquents et solutions

| Symptôme                               | Cause probable                                      | Solution                                                                                                 |
| -------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Page blanche / 500                     | `.htaccess` absent ou non lu                        | Vérifiez que `public_html/.htaccess` existe ; autorisez `AllowOverride All` (activé par défaut chez LWS) |
| Erreur 404 sur /contact, /admin…       | Réécriture d'URL inactive                           | Même cause → vérifiez le `.htaccess`, videz le cache du navigateur                                       |
| `API non configurée` (JSON)            | `api/config.php` manquant                           | Copiez `config.php.example` en `config.php` et remplissez-le                                             |
| Erreur SQL « Access denied »           | Identifiants faux                                   | Re-vérifiez `db_host`, `db_name`, `db_user`, `db_pass` dans le panel LWS                                 |
| Erreur 500 après login admin           | `secret_key` inchangée ou hachage invalide          | Régénérez le hachage via `hash.php`, mettez une vraie clé secrète                                        |
| Image non enregistrée                  | Droits d'écriture sur `uploads/`                    | Passez `uploads/` en 755/775 (étape 9)                                                                   |
| `Impossible d'uploader > 5 Mo`         | Limite `max_upload_mb` ou `upload_max_filesize` PHP | Réglez `max_upload_mb` dans `config.php` et la limite PHP dans le panel LWS (PHP config)                 |
| HTTP ne redirige pas vers HTTPS        | SSL pas encore actif                                | Activez d'abord le certificat (étape 10)                                                                 |
| Anciennes images encore visibles       | Cache navigateur                                    | Ctrl+F5, ou attendez 1 h (cache réglé sur 6 mois pour images)                                            |
| Domaine affiche la page par défaut LWS | Fichiers dans le mauvais dossier                    | Tout doit être dans `public_html/` (pas dans un sous-dossier)                                            |

## 📈 13. Après la mise en ligne

- **Google Search Console** : déclarez `https://votre-domaine.com` et soumettez
  `sitemap.xml` (sitemap + robots.txt déjà fournis).
- **FormSpree** (optionnel) : si vous souhaitez recevoir les demandes de devis par
  e-mail, renseignez `VITE_FORM_ENDPOINT` dans `.env` et relancez `npm run build`.
- **Mises à jour du contenu** : tout se fait depuis `https://votre-domaine.com/admin`
  (biens, actualités, images). Aucune manipulation FTP nécessaire.
- **Nouvelle version du site** : relancez `npm run build`, retransférez le contenu
  de `dist/` en écrasant les fichiers ; **ne supprimez jamais** `api/config.php`,
  ni le contenu de `uploads/`.
- **Sauvegardes** : exportez régulièrement la base via phpMyAdmin (Export) et
  copiez le dossier `uploads/`.

## 🔐 14. Check-list sécurité finale

- [ ] `secret_key` modifiée (longue chaîne aléatoire)
- [ ] Mot de passe admin fort, stocké **haché** dans `config.php`
- [ ] `api/hash.php` **supprimé** du serveur
- [ ] `config.php` inaccessible (`https://votre-domaine.com/api/config.php` → 403)
- [ ] HTTPS actif + redirection automatique
- [ ] Sauvegarde de la base effectuée après la première configuration

---

_Ce guide remplace et complète `DEPLOIEMENT-LWS.md` (ancienne version). Le
paquet `deploiement-lws.zip` à la racine du projet est prêt à être téléversé
tel quel dans `public_html/`._
