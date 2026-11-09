<?php
/**
 * ============================================================================
 *  hash.php — Générateur de mot de passe pour l'espace admin
 * ============================================================================
 *
 *  UTILISATION (à faire UNE SEULE FOIS, puis SUPPRIMER ce fichier) :
 *
 *   1. Ouvrir dans le navigateur :
 *          https://votre-domaine.com/api/hash.php?p=MonNouveauMotDePasse
 *
 *   2. Copier le hachage affiché (il commence par $2y$10$...)
 *
 *   3. Le coller dans api/config.php, à la place de la valeur de l'e-mail admin :
 *
 *          'admins' => [
 *            'somagueingenierie@gmail.com' => '$2y$10$....le hachage copié....',
 *          ],
 *
 *   4. ⚠️  SUPPRIMER ce fichier hash.php du serveur une fois terminé :
 *          il permet de générer des hachages, inutile en production.
 *
 *  Remarque : si aucun paramètre n'est fourni, un formulaire s'affiche.
 */

declare(strict_types=1);

$password = isset($_GET['p']) ? (string)$_GET['p'] : '';

if ($password === '' && isset($_POST['p'])) {
  $password = (string)$_POST['p'];
}

?><!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Générateur de mot de passe — D-SOMAGUE</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 720px; margin: 40px auto; padding: 0 16px; color: #14213d; }
    h1 { font-size: 20px; }
    .warn { background: #fff4e5; border-left: 4px solid #f59e0b; padding: 12px 14px; border-radius: 6px; }
    code { display: block; background: #0f172a; color: #7dd3fc; padding: 14px; border-radius: 8px; word-break: break-all; font-size: 14px; margin: 12px 0; }
    input[type=text] { width: 100%; padding: 10px 12px; font-size: 15px; border: 1px solid #cbd5e1; border-radius: 8px; box-sizing: border-box; }
    button { margin-top: 10px; padding: 10px 18px; font-size: 15px; background: #1c4fa1; color: #fff; border: 0; border-radius: 8px; cursor: pointer; }
    label { font-weight: 600; font-size: 14px; }
  </style>
</head>
<body>
  <h1>Générateur de hachage de mot de passe (admin)</h1>

  <?php if ($password === ''): ?>
    <form method="post">
      <label for="p">Mot de passe souhaité</label>
      <input type="text" id="p" name="p" autocomplete="off" autofocus />
      <button type="submit">Générer le hachage</button>
    </form>
  <?php else: ?>
    <p>Hachage à coller dans <code>api/config.php</code> (clé <code>admins</code>) :</p>
    <code><?= htmlspecialchars(password_hash($password, PASSWORD_BCRYPT), ENT_QUOTES, 'UTF-8') ?></code>
    <div class="warn">
      <strong>À faire maintenant :</strong> supprimez le fichier <code>api/hash.php</code>
      de votre hébergement (gestionnaire de fichiers Hostinger → dossier <code>api</code>).
    </div>
  <?php endif; ?>
</body>
</html>
