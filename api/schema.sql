-- ============================================================================
--  D-SOMAGUE INGÉNIERIE — Base de données MySQL (LWS)
-- ============================================================================
--  COMMENT L'EXÉCUTER (une seule fois) :
--   1. Ouvrir le panel LWS → Hébergement → Bases de données → phpMyAdmin
--      (ou « Gérer » à côté de votre base)
--   2. Sélectionner votre base dans la colonne de gauche
--   3. Onglet « SQL » → coller TOUT le contenu de ce fichier → Exécuter
--
--  Ce script crée :
--   • la table `properties` (biens immobiliers)
--   • la table `news`       (actualités)
--   • la table `messages`   (messages du formulaire + newsletter)
--   • la table `admins`     (comptes de l'espace admin)
--
--  Aucune donnée de démonstration n'est insérée (base propre).
-- ============================================================================

SET NAMES utf8mb4;

-- ---------------------------------------------------------------------------
-- 1. BIENS IMMOBILIERS
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `properties` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title`      VARCHAR(255) NOT NULL,
  `location`   VARCHAR(255) NULL,
  `price`      VARCHAR(120) NULL,
  `offer`      VARCHAR(40)  NOT NULL DEFAULT 'location',  -- 'location' | 'vente'
  `type`       VARCHAR(60)  NOT NULL DEFAULT 'maison',    -- maison, terrain, vehicule...
  `image`      VARCHAR(600) NULL,
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_properties_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- 2. ACTUALITÉS
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `news` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title`      VARCHAR(255) NOT NULL,
  `category`   VARCHAR(120) NULL,
  `date`       DATE         NOT NULL,
  `excerpt`    TEXT         NULL,
  `body`       TEXT         NULL,
  `image`      VARCHAR(600) NULL,
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_news_date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- 3. MESSAGES (formulaire de contact + abonnement newsletter)
--    status : 'unread' (non lu) → 'read' (lu) → 'replied' (répondu)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `messages` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(255) NULL,
  `email`      VARCHAR(255) NULL,
  `phone`      VARCHAR(60)  NULL,
  `branch`     VARCHAR(120) NULL,
  `message`    TEXT         NULL,
  `status`     VARCHAR(20)  NOT NULL DEFAULT 'unread',
  `reply`      TEXT         NULL,
  `replied_at` DATETIME     NULL,
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_messages_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- 4. COMPTES ADMINISTRATEURS
--    Le mot de passe est un hachage BCRYPT — jamais stocké en clair.
--    Pour créer/modifier un compte, utilisez api/hash.php (voir guide).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email`      VARCHAR(255) NOT NULL,
  `password`   VARCHAR(255) NOT NULL,   -- hachage BCRYPT
  `name`       VARCHAR(255) NULL,
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_admin_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
