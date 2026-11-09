<?php
/**
 * ============================================================================
 *  D-SOMAGUE INGÉNIERIE — API PHP + MySQL pour Hostinger
 * ============================================================================
 *
 *  Ce fichier est le POINT D'ENTRÉE UNIQUE de l'API. Le site React l'appelle
 *  via des requêtes HTTP :
 *
 *      POST /api/index.php?action=login
 *      GET  /api/index.php?action=properties
 *      POST /api/index.php?action=property.create
 *      ...
 *
 *  Il remplace entièrement Supabase : base de données MySQL, stockage des
 *  images dans le dossier /uploads, authentification par jeton signé.
 *
 *  ── INSTALLATION ────────────────────────────────────────────────────────────
 *  1. Copier api/config.php.example → api/config.php et remplir les identifiants
 *  2. Importer api/schema.sql dans phpMyAdmin (voir le guide de déploiement)
 *  3. Créer le dossier /uploads (droits d'écriture) pour les images
 */

// ============================ Réglages de base ============================

declare(strict_types=1);

// En production, les erreurs ne doivent pas s'afficher dans le JSON renvoyé.
error_reporting(E_ALL);
ini_set('display_errors', '0');

// Chargement de la configuration (identifiants BDD + clé secrète).
$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
  // Message clair si l'installation n'a pas été terminée.
  header('Content-Type: application/json; charset=utf-8');
  http_response_code(500);
  echo json_encode([
    'ok'    => false,
    'error' => "API non configurée : copiez api/config.php.example en api/config.php.",
  ]);
  exit;
}
$CONFIG = require $configFile;

date_default_timezone_set($CONFIG['timezone'] ?? 'Africa/Lome');

// ============================ En-têtes CORS / JSON ============================

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Le site est hébergé sur le MÊME domaine que l'API : les requêtes sont donc
// "same-origin" et aucune autorisation CORS particulière n'est nécessaire.
// On répond toutefois aux pré-vols OPTIONS pour être tolérant.
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
  http_response_code(204);
  exit;
}

// ============================ Utilitaires ============================

/** Envoie une réponse JSON et termine le script. */
function respond($data, int $code = 200): void {
  http_response_code($code);
  echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

/** Réponse d'erreur normalisée. */
function fail(string $message, int $code = 400): void {
  respond(['ok' => false, 'error' => $message], $code);
}

/** Corps de la requête : accepte JSON ou formulaire. */
function input(): array {
  static $cache = null;
  if ($cache !== null) return $cache;

  $raw = file_get_contents('php://input');
  $data = [];
  if ($raw !== false && $raw !== '') {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
      $data = $decoded;
    } else {
      parse_str($raw, $parsed);
      if (is_array($parsed)) $data = $parsed;
    }
  }
  // Les paramètres d'URL complètent (utiles pour GET).
  if (!empty($_GET)) $data += $_GET;
  $cache = $data;
  return $cache;
}

/** Lit une valeur du corps de la requête, avec valeur par défaut. */
function param(string $key, $default = null) {
  $d = input();
  return array_key_exists($key, $d) ? $d[$key] : $default;
}

/** Connexion PDO à MySQL (singleton). */
function db(): PDO {
  global $CONFIG;
  static $pdo = null;
  if ($pdo instanceof PDO) return $pdo;

  $dsn = sprintf(
    'mysql:host=%s;dbname=%s;charset=utf8mb4',
    $CONFIG['db_host'] ?? 'localhost',
    $CONFIG['db_name'] ?? ''
  );
  try {
    $pdo = new PDO($dsn, $CONFIG['db_user'] ?? '', $CONFIG['db_pass'] ?? '', [
      PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
  } catch (PDOException $e) {
    // On ne divulgue jamais le détail SQL au navigateur.
    fail("Connexion à la base de données impossible. Vérifiez api/config.php.", 500);
  }
  return $pdo;
}

// ============================ Jetons de session admin ============================

/** Encode en base64 URL (sans caractère réservé). */
function b64url(string $bin): string {
  return rtrim(strtr(base64_encode($bin), '+/', '-_'), '=');
}

/** Décode du base64 URL. */
function b64url_decode(string $txt): string {
  $pad = strlen($txt) % 4;
  if ($pad) $txt .= str_repeat('=', 4 - $pad);
  return base64_decode(strtr($txt, '-_', '+/')) ?: '';
}

/**
 * Crée un jeton signé (HMAC-SHA256) contenant l'e-mail et l'expiration.
 * Format : base64(payload).base64(signature)
 */
function makeToken(string $email): string {
  global $CONFIG;
  $payload = json_encode([
    'email' => $email,
    'exp'   => time() + ((int)($CONFIG['session_hours'] ?? 12)) * 3600,
  ]);
  $body = b64url($payload);
  $sig  = b64url(hash_hmac('sha256', $body, (string)($CONFIG['secret_key'] ?? ''), true));
  return $body . '.' . $sig;
}

/** Vérifie un jeton ; renvoie la charge utile ou null. */
function verifyToken(?string $token): ?array {
  global $CONFIG;
  if (!$token || strpos($token, '.') === false) return null;
  [$body, $sig] = explode('.', $token, 2);

  $expected = b64url(hash_hmac('sha256', $body, (string)($CONFIG['secret_key'] ?? ''), true));
  // Comparaison à temps constant (protection contre les attaques temporelles).
  if (!hash_equals($expected, $sig)) return null;

  $payload = json_decode(b64url_decode($body), true);
  if (!is_array($payload)) return null;
  if (($payload['exp'] ?? 0) < time()) return null;
  return $payload;
}

/** Jeton envoyé par le client : en-tête Authorization ou champ "token". */
function bearerToken(): ?string {
  $h = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
  if ($h === '' && function_exists('apache_request_headers')) {
    $headers = apache_request_headers();
    foreach ($headers as $k => $v) {
      if (strcasecmp($k, 'Authorization') === 0) { $h = $v; break; }
    }
  }
  if (preg_match('/Bearer\s+(.+)/i', (string)$h, $m)) return trim($m[1]);
  $t = param('token');
  return is_string($t) && $t !== '' ? $t : null;
}

/**
 * Exige une session admin valide.
 * Vérifie d'abord le jeton signé, puis, en secours, la table `admins`
 * (comptes créés directement en base).
 */
function requireAuth(): array {
  $payload = verifyToken(bearerToken());
  if ($payload && !empty($payload['email'])) return $payload;
  fail('Session expirée ou invalide. Reconnectez-vous.', 401);
  return []; // inatteignable
}

/** Vérifie qu'une adresse e-mail a un format plausible. */
function validEmail(string $email): bool {
  return (bool)filter_var($email, FILTER_VALIDATE_EMAIL);
}

/** Nettoie une chaîne venue du client (longueur bornée). */
function str_field($value, int $max = 255): string {
  $s = is_scalar($value) ? (string)$value : '';
  $s = trim($s);
  if (function_exists('mb_substr')) return mb_substr($s, 0, $max);
  return substr($s, 0, $max);
}

// ============================ Routeur ============================

$action = (string)param('action', '');
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
  switch ($action) {

    // ---------------------------- État de l'API ----------------------------
    case 'ping':
      respond(['ok' => true, 'data' => ['pong' => true, 'time' => date('c')]]);
      break;

    // ---------------------------- Authentification ----------------------------
    case 'login':
      handleLogin();
      break;

    case 'session':
      handleSession();
      break;

    case 'logout':
      respond(['ok' => true]);
      break;

    // ---------------------------- Biens immobiliers ----------------------------
    case 'properties':
      respond(['ok' => true, 'data' => listProperties()]);
      break;

    case 'property.create':
      requireAuth();
      respond(['ok' => true, 'data' => createProperty()]);
      break;

    case 'property.update':
      requireAuth();
      respond(['ok' => true, 'data' => updateProperty()]);
      break;

    case 'property.delete':
      requireAuth();
      deleteProperty();
      respond(['ok' => true]);
      break;

    // ---------------------------- Actualités ----------------------------
    case 'news':
      respond(['ok' => true, 'data' => listNews()]);
      break;

    case 'news.create':
      requireAuth();
      respond(['ok' => true, 'data' => createNews()]);
      break;

    case 'news.update':
      requireAuth();
      respond(['ok' => true, 'data' => updateNews()]);
      break;

    case 'news.delete':
      requireAuth();
      deleteNews();
      respond(['ok' => true]);
      break;

    // ---------------------------- Messages ----------------------------
    // create : PUBLIC (le visiteur n'est pas connecté)
    case 'message.create':
      respond(['ok' => true, 'data' => createMessage()]);
      break;

    case 'messages':
      requireAuth();
      respond(['ok' => true, 'data' => listMessages()]);
      break;

    case 'message.update':
      requireAuth();
      respond(['ok' => true, 'data' => updateMessage()]);
      break;

    case 'message.delete':
      requireAuth();
      deleteMessage();
      respond(['ok' => true]);
      break;

    // ---------------------------- Téléversement d'images ----------------------------
    case 'upload':
      requireAuth();
      respond(['ok' => true, 'data' => handleUpload()]);
      break;

    // ---------------------------- Action inconnue ----------------------------
    default:
      fail("Action inconnue : « $action » ($method).", 404);
  }
} catch (Throwable $e) {
  fail('Erreur serveur. Consultez les journaux Hostinger si le problème persiste.', 500);
}

// ============================================================================
//  AUTHENTIFICATION
// ============================================================================

function handleLogin(): void {
  global $CONFIG;

  $email    = str_field(param('email', ''), 255);
  $password = (string)param('password', '');

  if ($email === '' || $password === '') {
    fail('E-mail et mot de passe sont obligatoires.', 422);
  }
  if (!validEmail($email)) {
    fail('Adresse e-mail invalide.', 422);
  }

  // --- 1. Comptes déclarés dans api/config.php ---
  $admins = $CONFIG['admins'] ?? [];
  foreach ($admins as $knownEmail => $hash) {
    if (strcasecmp($knownEmail, $email) === 0) {
      if (password_verify($password, (string)$hash)) {
        respond(['ok' => true, 'data' => [
          'token' => makeToken($email),
          'user'  => ['email' => $email],
        ]]);
      }
      fail('E-mail ou mot de passe incorrect.', 401);
    }
  }

  // --- 2. Comptes enregistrés dans la table `admins` ---
  try {
    $stmt = db()->prepare('SELECT email, password FROM admins WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $row = $stmt->fetch();
    if ($row && password_verify($password, (string)$row['password'])) {
      respond(['ok' => true, 'data' => [
        'token' => makeToken($email),
        'user'  => ['email' => $email],
      ]]);
    }
  } catch (Throwable $e) {
    // Table absente : on ignore et on retombe sur l'échec d'authentification.
  }

  // Message volontairement identique aux deux cas (on ne révèle pas si le
  // compte existe) + petite temporisation contre le force brute.
  usleep(300000);
  fail('E-mail ou mot de passe incorrect.', 401);
}

function handleSession(): void {
  $payload = verifyToken(bearerToken());
  if (!$payload) fail('Session expirée ou invalide.', 401);
  respond(['ok' => true, 'data' => ['user' => ['email' => $payload['email'] ?? '']]]);
}

// ============================================================================
//  BIENS IMMOBILIERS
// ============================================================================

/** Colonnes de la table properties (whitelist de sécurité). */
function propertyFields(): array {
  return ['title', 'location', 'price', 'offer', 'type', 'image'];
}

/** Prépare les données d'un bien depuis le corps de la requête. */
function readPropertyPayload(): array {
  $d = input();
  $out = [];
  foreach (propertyFields() as $f) {
    if (array_key_exists($f, $d)) {
      $max = ($f === 'image') ? 600 : 255;
      $out[$f] = str_field($d[$f], $max);
    }
  }
  if (empty($out['title'])) fail('Le titre du bien est obligatoire.', 422);
  if (empty($out['offer'])) $out['offer'] = 'location';
  if (empty($out['type']))  $out['type']  = 'maison';
  return $out;
}

function listProperties(): array {
  $rows = db()->query(
    'SELECT id, title, location, price, offer, type, image, created_at
       FROM properties ORDER BY created_at DESC, id DESC'
  )->fetchAll();
  // Les identifiants sont renvoyés en texte, comme les anciens identifiants.
  return array_map(static function ($r) {
    $r['id'] = (string)$r['id'];
    return $r;
  }, $rows);
}

function createProperty(): array {
  $data = readPropertyPayload();
  $cols = array_keys($data);
  $sql  = 'INSERT INTO properties (' . implode(',', $cols) . ') VALUES (' .
          implode(',', array_fill(0, count($cols), '?')) . ')';
  $stmt = db()->prepare($sql);
  $stmt->execute(array_values($data));

  $id = (int)db()->lastInsertId();
  return fetchProperty($id);
}

function updateProperty(): array {
  $id = (int)param('id', 0);
  if ($id <= 0) fail('Identifiant du bien manquant.', 422);

  $data = readPropertyPayload();
  $sets = [];
  foreach (array_keys($data) as $c) $sets[] = "$c = ?";
  $sql  = 'UPDATE properties SET ' . implode(', ', $sets) . ' WHERE id = ?';
  $stmt = db()->prepare($sql);
  $stmt->execute([...array_values($data), $id]);

  return fetchProperty($id);
}

function deleteProperty(): void {
  $id = (int)param('id', 0);
  if ($id <= 0) fail('Identifiant du bien manquant.', 422);
  $stmt = db()->prepare('DELETE FROM properties WHERE id = ?');
  $stmt->execute([$id]);
}

function fetchProperty(int $id): array {
  $stmt = db()->prepare(
    'SELECT id, title, location, price, offer, type, image, created_at
       FROM properties WHERE id = ? LIMIT 1'
  );
  $stmt->execute([$id]);
  $row = $stmt->fetch();
  if (!$row) fail('Bien introuvable.', 404);
  $row['id'] = (string)$row['id'];
  return $row;
}

// ============================================================================
//  ACTUALITÉS
// ============================================================================

function newsFields(): array {
  return ['title', 'category', 'date', 'excerpt', 'body', 'image'];
}

function readNewsPayload(): array {
  $d = input();
  $out = [];
  foreach (newsFields() as $f) {
    if (array_key_exists($f, $d)) {
      if ($f === 'excerpt' || $f === 'body') {
        $out[$f] = str_field($d[$f], 20000);
      } elseif ($f === 'image') {
        $out[$f] = str_field($d[$f], 600);
      } elseif ($f === 'date') {
        // Format attendu : AAAA-MM-JJ ; sinon on prend la date du jour.
        $v = str_field($d[$f], 10);
        $out[$f] = preg_match('/^\d{4}-\d{2}-\d{2}$/', $v) ? $v : date('Y-m-d');
      } else {
        $out[$f] = str_field($d[$f], 255);
      }
    }
  }
  if (empty($out['title'])) fail("Le titre de l'actualité est obligatoire.", 422);
  if (empty($out['date']))  $out['date'] = date('Y-m-d');
  return $out;
}

function listNews(): array {
  $rows = db()->query(
    'SELECT id, title, category, date, excerpt, body, image, created_at
       FROM news ORDER BY date DESC, id DESC'
  )->fetchAll();
  return array_map(static function ($r) {
    $r['id'] = (string)$r['id'];
    return $r;
  }, $rows);
}

function createNews(): array {
  $data = readNewsPayload();
  $cols = array_keys($data);
  $sql  = 'INSERT INTO news (' . implode(',', $cols) . ') VALUES (' .
          implode(',', array_fill(0, count($cols), '?')) . ')';
  $stmt = db()->prepare($sql);
  $stmt->execute(array_values($data));
  return fetchNews((int)db()->lastInsertId());
}

function updateNews(): array {
  $id = (int)param('id', 0);
  if ($id <= 0) fail("Identifiant de l'actualité manquant.", 422);

  $data = readNewsPayload();
  $sets = [];
  foreach (array_keys($data) as $c) $sets[] = "$c = ?";
  $sql  = 'UPDATE news SET ' . implode(', ', $sets) . ' WHERE id = ?';
  $stmt = db()->prepare($sql);
  $stmt->execute([...array_values($data), $id]);

  return fetchNews($id);
}

function deleteNews(): void {
  $id = (int)param('id', 0);
  if ($id <= 0) fail("Identifiant de l'actualité manquant.", 422);
  $stmt = db()->prepare('DELETE FROM news WHERE id = ?');
  $stmt->execute([$id]);
}

function fetchNews(int $id): array {
  $stmt = db()->prepare(
    'SELECT id, title, category, date, excerpt, body, image, created_at
       FROM news WHERE id = ? LIMIT 1'
  );
  $stmt->execute([$id]);
  $row = $stmt->fetch();
  if (!$row) fail('Actualité introuvable.', 404);
  $row['id'] = (string)$row['id'];
  return $row;
}

// ============================================================================
//  MESSAGES
// ============================================================================

function createMessage(): array {
  $d = input();
  $payload = [
    'name'    => str_field($d['name']    ?? '', 255),
    'email'   => str_field($d['email']   ?? '', 255),
    'phone'   => str_field($d['phone']   ?? '', 60),
    'branch'  => str_field($d['branch']  ?? '', 120),
    'message' => str_field($d['message'] ?? '', 20000),
  ];

  if ($payload['name'] === '' && $payload['email'] === '') {
    fail('Veuillez indiquer au moins votre nom ou votre e-mail.', 422);
  }
  if ($payload['message'] === '') {
    fail('Le message est vide.', 422);
  }

  $stmt = db()->prepare(
    'INSERT INTO messages (name, email, phone, branch, message, status)
     VALUES (?, ?, ?, ?, ?, "unread")'
  );
  $stmt->execute(array_values($payload));

  return normalizeMessage(fetchMessage((int)db()->lastInsertId()));
}

function listMessages(): array {
  $rows = db()->query(
    'SELECT id, name, email, phone, branch, message, status, reply, replied_at, created_at
       FROM messages ORDER BY created_at DESC, id DESC'
  )->fetchAll();
  return array_map('normalizeMessage', $rows);
}

function updateMessage(): array {
  $id = (int)param('id', 0);
  if ($id <= 0) fail('Identifiant du message manquant.', 422);

  $d = input();
  $sets = [];
  $vals = [];

  if (array_key_exists('status', $d)) {
    $status = str_field($d['status'], 20);
    if (!in_array($status, ['unread', 'read', 'replied'], true)) {
      $status = 'read';
    }
    $sets[] = 'status = ?';
    $vals[] = $status;
  }
  if (array_key_exists('reply', $d)) {
    $sets[] = 'reply = ?';
    $vals[] = str_field($d['reply'], 20000);
    $sets[] = 'replied_at = NOW()';
  }
  if (!$sets) fail('Aucune modification à enregistrer.', 422);

  $stmt = db()->prepare('UPDATE messages SET ' . implode(', ', $sets) . ' WHERE id = ?');
  $stmt->execute([...$vals, $id]);

  return normalizeMessage(fetchMessage($id));
}

function deleteMessage(): void {
  $id = (int)param('id', 0);
  if ($id <= 0) fail('Identifiant du message manquant.', 422);
  $stmt = db()->prepare('DELETE FROM messages WHERE id = ?');
  $stmt->execute([$id]);
}

function fetchMessage(int $id): array {
  $stmt = db()->prepare(
    'SELECT id, name, email, phone, branch, message, status, reply, replied_at, created_at
       FROM messages WHERE id = ? LIMIT 1'
  );
  $stmt->execute([$id]);
  $row = $stmt->fetch();
  if (!$row) fail('Message introuvable.', 404);
  return $row;
}

/** Uniformise un message pour le front (id en texte, valeurs non nulles). */
function normalizeMessage(array $m): array {
  return [
    'id'         => (string)$m['id'],
    'name'       => (string)($m['name'] ?? ''),
    'email'      => (string)($m['email'] ?? ''),
    'phone'      => (string)($m['phone'] ?? ''),
    'branch'     => (string)($m['branch'] ?? ''),
    'message'    => (string)($m['message'] ?? ''),
    'status'     => (string)($m['status'] ?? 'unread'),
    'reply'      => (string)($m['reply'] ?? ''),
    'replied_at' => $m['replied_at'] ?? null,
    'created_at' => $m['created_at'] ?? null,
  ];
}

// ============================================================================
//  TÉLÉVERSEMENT D'IMAGES
// ============================================================================

/**
 * Reçoit un fichier (champ « file ») et l'enregistre dans /uploads.
 * Renvoie l'URL publique de l'image, utilisable directement dans <img src>.
 */
function handleUpload(): array {
  global $CONFIG;

  if (empty($_FILES['file'])) {
    fail('Aucun fichier reçu.', 422);
  }
  $f = $_FILES['file'];

  if (($f['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    fail('Le téléversement a échoué (code ' . (int)$f['error'] . ').', 422);
  }

  $maxBytes = ((int)($CONFIG['max_upload_mb'] ?? 5)) * 1024 * 1024;
  if (($f['size'] ?? 0) > $maxBytes) {
    fail('Image trop lourde (maximum ' . (int)($CONFIG['max_upload_mb'] ?? 5) . ' Mo).', 422);
  }

  // Vérification du type réel (et non de l'extension annoncée).
  $allowed = [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/webp' => 'webp',
    'image/gif'  => 'gif',
  ];
  $mime = '';
  if (function_exists('finfo_open')) {
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime  = (string)finfo_file($finfo, $f['tmp_name']);
    finfo_close($finfo);
  } elseif (function_exists('getimagesize')) {
    $info = @getimagesize($f['tmp_name']);
    $mime = is_array($info) ? (string)($info['mime'] ?? '') : '';
  }
  if (!isset($allowed[$mime])) {
    fail('Format non autorisé. Utilisez une image JPG, PNG, WEBP ou GIF.', 422);
  }

  $dir = __DIR__ . '/../uploads';
  if (!is_dir($dir) && !@mkdir($dir, 0755, true)) {
    fail("Le dossier /uploads n'existe pas ou n'est pas accessible en écriture.", 500);
  }

  $name = date('Ymd-His') . '-' . bin2hex(random_bytes(4)) . '.' . $allowed[$mime];
  $dest = $dir . '/' . $name;

  if (!move_uploaded_file($f['tmp_name'], $dest)) {
    fail("Impossible d'enregistrer l'image sur le serveur.", 500);
  }
  @chmod($dest, 0644);

  return ['url' => 'uploads/' . $name];
}
