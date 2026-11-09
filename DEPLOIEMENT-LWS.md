# Guide de déploiement — D-SOMAGUE INGÉNIERIE sur LWS

Ce guide couvre **tout** le parcours : de la base de données MySQL à la mise en
ligne du site + de l'espace admin, chez **LWS** (hébergement mutualisé Apache/PHP).

> **En résumé** : le site est un ensemble de fichiers statiques (React) + un
> dossier `api/` en PHP qui parle à une base MySQL. Il n'y a **pas** de serveur
> Node.js à installer chez LWS.

---

## Sommaire

1. [Ce qu'il faut avant de commencer](#1-ce-quil-faut-avant-de-commencer)
2. [Créer la base de données MySQL sur LWS](#2-créer-la-base-de-données-mysql-sur-lws)
3. [Récupérer les identifiants MySQL (où ils se trouvent)](#3-récupérer-les-identifiants-mysql)
4. [Importer les tables (schema.sql)](#4-importer-les-tables-schemasql)
5. [Créer le compte administrateur (mot de passe)](#5-créer-le-compte-administrateur)
6. [Construire le site (npm run build)](#6-construire-le-site-npm-run-build)
7. [Envoyer les fichiers sur LWS](#7-envoyer-les-fichiers-sur-lws)
8. [Créer api/config.php sur le serveur](#8-créer-apiconfigphp-sur-le-serveur)
9. [Vérifier que tout fonctionne](#9-vérifier-que-tout-fonctionne)
10. [Activer le HTTPS (SSL)](#10-activer-le-https-ssl)
11. [Problèmes fréquents et solutions](#11-problèmes-fréquents-et-solutions)
12. [Après la mise en ligne](#12-après-la-mise-en-ligne)

---

## 1. Ce qu'il faut avant de commencer

| Élément                            | Détail                                                                                                                                            |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hébergement LWS**                | Un pack mutualisé avec **PHP 8.0+** et **MySQL**                                                                                                  |
| **Nom de domaine**                 | Ex. `dsomague.com` (les fichiers `robots.txt`, `sitemap.xml` et `index.html` sont réglés sur `dsomague.com` — à adapter si votre domaine diffère) |
| **Accès au panel LWS**             | Identifiant + mot de passe de votre espace client LWS                                                                                             |
| **Node.js sur votre PC**           | Pour construire le site (`npm run build`) — version 18 ou plus                                                                                    |
| **FTP / gestionnaire de fichiers** | FileZilla, ou le gestionnaire de fichiers du panel LWS                                                                                            |

---

## 2. Créer la base de données MySQL sur LWS

1. Connectez-vous à votre **panel LWS**.
2. Allez dans **« Bases de données » → « MySQL »** (ou « Gérer mes bases »).
3. Cliquez sur **« Créer une base de données »**.
4. Choisissez :
   - **Nom de la base** : ex. `dsomague` → LWS la préfixe automatiquement,
     ce qui donne par exemple `lws1234567_dsomague`
   - **Utilisateur** : ex. `admin` → devient `lws1234567_admin`
   - **Mot de passe** : choisissez-en un **solide** (majuscules, minuscules,
     chiffres, symboles) et **notez-le**
   - **Serveur / hôte** : LWS affiche `localhost` (ou un hôte du type
     `sqlXXX.lws-hosting.fr`)
5. Validez. **Attendez quelques minutes** que la base soit active.

> ⚠️ **Notez ces 4 valeurs** : elles serviront à l'étape 8. Sans elles, l'API ne
> pourra pas se connecter.

---

## 3. Récupérer les identifiants MySQL

Voici **exactement** où LWS affiche vos identifiants, et ce que vous devrez
recopier dans `api/config.php`.

Dans le panel LWS → **Bases de données → MySQL**, à côté de votre base, cliquez
sur **« Détails »** / **« Gérer »**. Vous y verrez un tableau du type :

| Ce que LWS affiche | Exemple concret                          | À recopier dans `config.php`         |
| ------------------ | ---------------------------------------- | ------------------------------------ |
| **Serveur / Hôte** | `localhost` (ou `sql123.lws-hosting.fr`) | `'db_host' => 'localhost'`           |
| **Nom de la base** | `lws1234567_dsomague`                    | `'db_name' => 'lws1234567_dsomague'` |
| **Utilisateur**    | `lws1234567_admin`                       | `'db_user' => 'lws1234567_admin'`    |
| **Mot de passe**   | _(celui que vous avez défini)_           | `'db_pass' => 'VotreMotDePasse'`     |

### ⚠️ Important

- Les identifiants MySQL **ne sont pas universels** : chaque hébergeur, et même
  chaque base, a les siens. Il n'existe **aucun** identifiant « par défaut »
  valable chez LWS.
- Le préfixe `lws1234567_` est **ajouté par LWS** : utilisez le nom **complet**
  tel qu'affiché, préfixe inclus.
- Si vous perdez le mot de passe : dans le panel LWS, il existe un bouton
  **« Modifier le mot de passe »** de la base — changez-le, puis reportez la
  nouvelle valeur dans `config.php`.

### Comment remplir `config.php` (aperçu)

```php
return [
  'db_host' => 'localhost',              // ← Serveur affiché par LWS
  'db_name' => 'lws1234567_dsomague',    // ← Nom de base affiché par LWS
  'db_user' => 'lws1234567_admin',       // ← Utilisateur affiché par LWS
  'db_pass' => 'VotreMotDePasse',        // ← Celui que vous avez défini

  'secret_key' => 'chaîne-aleatoire-longue-unique-a-vous',

  'admins' => [
    'somagueingenierie@gmail.com' => '$2y$10$...le-hachage-obtenu-etape-5...',
  ],

  'timezone'      => 'Africa/Lome',
  'session_hours' => 12,
  'max_upload_mb' => 5,
];
```

---

## 4. Importer les tables (schema.sql)

1. Dans le panel LWS → **Bases de données → phpMyAdmin** → cliquez sur
   **« Ouvrir phpMyAdmin »**.
2. Dans la colonne de gauche, **sélectionnez votre base** (ex. `lws1234567_dsomague`).
3. Onglet **« SQL »** en haut.
4. Ouvrez le fichier **`api/schema.sql`** de votre projet, **copiez tout son
   contenu**, collez-le dans la zone SQL.
5. Cliquez sur **« Exécuter »** (en bas à droite).

Vous devez voir apparaître **4 tables** dans la colonne de gauche :

| Table        | Contenu                           |
| ------------ | --------------------------------- |
| `properties` | Biens immobiliers                 |
| `news`       | Actualités                        |
| `messages`   | Messages du formulaire de contact |
| `admins`     | Comptes de l'espace admin         |

> Le script est écrit en `CREATE TABLE IF NOT EXISTS` : vous pouvez le relancer
> sans risque, il ne détruira pas les données existantes.

---

## 5. Créer le compte administrateur

Le mot de passe de l'admin est stocké **haché** (BCRYPT), jamais en clair.
Il faut donc générer le hachage.

### Méthode A — avec l'outil `hash.php` (le plus simple)

1. Après avoir envoyé les fichiers (étape 7), ouvrez dans votre navigateur :
   ```
   https://votre-domaine.com/api/hash.php
   ```
2. Saisissez le mot de passe souhaité → **Générer le hachage**.
3. **Copiez** la longue chaîne qui commence par `$2y$10$...`.
4. ⚠️ **Supprimez ensuite `api/hash.php`** de votre hébergement (gestionnaire de
   fichiers LWS → dossier `api`). Ce fichier ne doit pas rester en ligne.

### Méthode B — avec PHP sur votre PC

Si vous avez PHP installé localement :

```bash
php -r "echo password_hash('MonMotDePasse', PASSWORD_BCRYPT), PHP_EOL;"
```

Copiez la chaîne affichée.

### Où coller le hachage

Deux possibilités :

- **Dans `api/config.php`** (le plus simple) :
  ```php
  'admins' => [
    'somagueingenierie@gmail.com' => '$2y$10$....le-hachage....',
  ],
  ```
- **Ou dans la table `admins`** (recommandé, modifiable sans toucher au code) :
  via phpMyAdmin → table `admins` → **Insérer** → renseignez `email` et
  `password` (le hachage).

> L'adresse e-mail ci-dessus (`somagueingenierie@gmail.com`) est celle définie
> par défaut. Modifiez-la si vous voulez un autre compte.

---

## 6. Construire le site (npm run build)

Sur **votre PC**, dans le dossier `dsomague-site` :

```bash
npm install
npm run build
```

Cette commande :

1. construit le site React dans `dist/` ;
2. **copie automatiquement le dossier `api/`** dans `dist/api/` ;
3. crée `dist/uploads/` (dossier des images téléversées).

Vous obtenez un dossier **`dist/`** complet, prêt à envoyer.

Vérifiez qu'il contient bien :

```
dist/
├── index.html
├── .htaccess              ← routage SPA + HTTPS
├── assets/                ← JS et CSS du site
├── logo.png, robots.txt, sitemap.xml, _redirects
├── api/                   ← index.php, schema.sql, hash.php, .htaccess, config.php.example
└── uploads/               ← dossier vide (images)
```

> **Remarque** : `npm run build` ne copie **jamais** un éventuel `api/config.php`
> local (il contient des identifiants de test). La configuration de production se
> fait **directement sur le serveur** (étape 8).

---

## 7. Envoyer les fichiers sur LWS

Deux méthodes au choix.

### Méthode A — Gestionnaire de fichiers LWS (simple, pour un petit site)

1. Panel LWS → **« Gestionnaire de fichiers »**.
2. Ouvrez le dossier **`public_html`** (c'est la racine web de votre domaine).
3. Supprimez les éventuels fichiers de démonstration (`index.html` par défaut…).
4. Envoyez **tout le CONTENU de `dist/`** dans `public_html/`.

> ⚠️ Envoyez le **contenu** de `dist/`, pas le dossier `dist` lui-même :
> `public_html/index.html` doit exister directement.

### Méthode B — FTP (recommandé, plus rapide pour beaucoup de fichiers)

1. Récupérez vos identifiants FTP dans le panel LWS (**FTP / Comptes FTP**).
2. Connectez-vous avec **FileZilla** :
   - Hôte : `ftp.votre-domaine.com`
   - Utilisateur / Mot de passe : ceux de votre compte FTP
   - Port : `21`
3. Placez-vous dans **`public_html/`**.
4. Glissez-déposez tout le **contenu** de `dist/`.

### Cas particulier : site dans un sous-dossier

Si votre site n'est **pas** à la racine du domaine (ex. `dsomague.com/site`),
la ligne `RewriteBase /` du `.htaccess` doit devenir `RewriteBase /site/`.
Sinon les liens directs renverront une erreur 404.

---

## 8. Créer api/config.php sur le serveur

C'est **l'étape la plus importante**. Le fichier `config.php` n'est pas dans le
build (pour ne jamais publier vos identifiants) : il faut le créer **sur le serveur**.

1. Dans le gestionnaire de fichiers LWS, ouvrez `public_html/api/`.
2. À côté de `config.php.example`, créez un **nouveau fichier** nommé
   exactement **`config.php`**.
3. Collez-y le contenu ci-dessous, **en remplaçant les valeurs** par vos
   identifiants réels (voir étape 3) :

```php
<?php
return [
  // --- Connexion MySQL (valeurs affichées par le panel LWS) ---
  'db_host' => 'localhost',
  'db_name' => 'lws1234567_dsomague',
  'db_user' => 'lws1234567_admin',
  'db_pass' => 'VotreMotDePasse',

  // --- Sécurité : clé de signature des sessions admin ---
  // Chaîne aléatoire LONGUE et UNIQUE (40+ caractères).
  'secret_key' => 'changez-cette-cle-par-une-chaine-aleatoire-tres-longue-0123456789',

  // --- Compte(s) admin : mot de passe HACHÉ (voir étape 5) ---
  'admins' => [
    'somagueingenierie@gmail.com' => '$2y$10$REMPLACEZ_PAR_LE_HACHAGE_OBTENU',
  ],

  // --- Divers ---
  'timezone'      => 'Africa/Lome',
  'session_hours' => 12,
  'max_upload_mb' => 5,
];
```

4. Enregistrez.

> 🔒 `config.php` est **protégé** par `api/.htaccess` : même en connaissant son
> URL, personne ne peut le lire depuis un navigateur. Vérifiez-le à l'étape 9.

---

## 9. Vérifier que tout fonctionne

### 9.1 L'API répond

Ouvrez dans le navigateur :

```
https://votre-domaine.com/api/index.php?action=ping
```

Réponse attendue :

```json
{ "ok": true, "data": { "pong": true, "time": "2026-...-...T..." } }
```

- ✅ Si vous voyez ce JSON → l'API et PHP fonctionnent.
- ❌ Si vous voyez « API non configurée : copiez api/config.php.example… »
  → `config.php` est absent (retournez à l'étape 8).
- ❌ Si vous voyez « Connexion à la base de données impossible »
  → les identifiants MySQL de `config.php` sont faux (revérifiez l'étape 3).

### 9.2 `config.php` n'est pas accessible

Ouvrez :

```
https://votre-domaine.com/api/config.php
```

Attendu : **403 Forbidden** (ou 404). Si vous voyez du code PHP en clair,
le `.htaccess` de `api/` n'est pas pris en compte → vérifiez qu'il est bien
présent dans `public_html/api/.htaccess`.

### 9.3 Le site s'affiche

Ouvrez `https://votre-domaine.com/` : la page d'accueil doit s'afficher.
Puis testez un **lien direct** (sans passer par le menu) :

```
https://votre-domaine.com/domain/immobilier
```

Il doit s'afficher normalement (pas de 404) — c'est le `.htaccess` qui le permet.

### 9.4 L'espace admin

1. Ouvrez `https://votre-domaine.com/admin`.
2. Le bandeau « Mode démonstration » ne doit **pas** apparaître
   (s'il apparaît, l'API n'est pas détectée → revérifiez 9.1).
3. Connectez-vous avec l'e-mail et le mot de passe définis à l'étape 5.
4. En haut du tableau de bord, l'indicateur doit afficher **« Connecté (base MySQL) »**.
5. Ajoutez un bien de test → il doit apparaître sur `/domain/immobilier`.

### 9.5 Le téléversement d'images

Dans l'admin → Biens → **« Choisir une image »**. Si l'envoi échoue avec
« Le dossier /uploads n'existe pas ou n'est pas accessible en écriture »,
créez le dossier et donnez-lui les droits :

- Gestionnaire de fichiers LWS → `public_html/` → **Créer un dossier** `uploads`
- Clic droit → **Permissions** → `755` (ou `775` si `755` ne suffit pas)

---

## 10. Activer le HTTPS (SSL)

1. Panel LWS → **« Domaines » → « SSL »** → activez le **certificat SSL gratuit**
   (Let's Encrypt) pour votre domaine.
2. Attendez l'émission (quelques minutes à quelques heures).
3. Le `.htaccess` **force déjà HTTPS** : toute visite en `http://` est
   redirigée vers `https://`. Rien à faire de plus.

> Si vous constatez une **boucle de redirection**, c'est que LWS termine le SSL
> via un proxy. Dans ce cas, ouvrez `public/.htaccess` et ajoutez la condition
> sur l'en-tête proxy :

```apache
  RewriteCond %{HTTPS} off
  RewriteCond %{HTTP:X-Forwarded-Proto} !https
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
```

---

## 11. Problèmes fréquents et solutions

| Symptôme                                             | Cause probable                                                     | Solution                                                                  |
| ---------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Page blanche sur toutes les URL                      | Fichiers mal placés (dossier `dist` envoyé au lieu de son contenu) | `public_html/index.html` doit exister directement                         |
| 404 sur `/domain/immobilier` (lien direct)           | `.htaccess` absent ou `mod_rewrite` désactivé                      | Vérifiez `public_html/.htaccess` ; demandez à LWS d'activer `mod_rewrite` |
| « API non configurée »                               | `api/config.php` manquant                                          | Créez-le (étape 8)                                                        |
| « Connexion à la base impossible »                   | Identifiants MySQL erronés                                         | Revérifiez hôte / base / utilisateur / mot de passe (étape 3)             |
| « L'API ne répond pas correctement »                 | PHP désactivé ou mauvaise version                                  | Panel LWS → activez PHP **8.0+**                                          |
| Bandeau « Mode démonstration » dans l'admin          | L'API ne répond pas au `ping`                                      | Testez 9.1 ; corrigez la config                                           |
| « Le dossier /uploads n'existe pas… »                | Dossier absent ou droits insuffisants                              | Créez `public_html/uploads` (droits 755)                                  |
| Image refusée à l'envoi                              | Fichier > 5 Mo ou format non supporté                              | Utilisez JPG/PNG/WEBP/GIF de moins de 5 Mo                                |
| Le site affiche l'ancienne version après mise à jour | `index.html` mis en cache                                          | Videz le cache du navigateur (Ctrl+F5)                                    |
| Erreur 500 à la connexion admin                      | `secret_key` vide dans `config.php`                                | Renseignez une longue chaîne aléatoire                                    |

---

## 12. Après la mise en ligne

- [ ] **Supprimer `api/hash.php`** du serveur (générateur de mots de passe).
- [ ] Vérifier que `https://votre-domaine.com/api/config.php` renvoie 403.
- [ ] Mettre à jour le domaine dans `robots.txt`, `sitemap.xml` et `index.html`
      si votre domaine n'est pas `dsomague.com`, puis **relancer `npm run build`**
      et renvoyer les fichiers.
- [ ] Soumettre le site à **Google Search Console** (référencement).
- [ ] Sauvegarder régulièrement la base MySQL (export phpMyAdmin → SQL).
- [ ] Remplacer les photos Unsplash par de vraies photos (via l'admin ou en
      modifiant `src/assets/images.js`).

---

## Récapitulatif des identifiants à préparer

| Où                                 | Quoi                                       | Où le trouver                                  |
| ---------------------------------- | ------------------------------------------ | ---------------------------------------------- |
| `api/config.php`                   | `db_host`, `db_name`, `db_user`, `db_pass` | Panel LWS → Bases de données → MySQL → Détails |
| `api/config.php`                   | `secret_key`                               | Vous l'inventez (longue chaîne aléatoire)      |
| `api/config.php` ou table `admins` | hachage du mot de passe admin              | Généré via `api/hash.php` (étape 5)            |
| Admin `/admin`                     | e-mail + mot de passe                      | Ceux que vous avez définis (étape 5)           |
| FTP FileZilla                      | hôte, utilisateur, mot de passe            | Panel LWS → FTP                                |

---

_Guide rédigé pour le projet D-SOMAGUE INGÉNIERIE — hébergement LWS, PHP 8+, MySQL._
