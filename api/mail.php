<?php

declare(strict_types=1);

function sendContactEmails(array $message): void {
  global $CONFIG;

  $autoload = __DIR__ . '/vendor/autoload.php';
  if (!is_file($autoload)) {
    throw new RuntimeException('Composer dependencies are missing.');
  }
  require_once $autoload;

  $host = trim((string)($CONFIG['smtp_host'] ?? ''));
  $username = trim((string)($CONFIG['smtp_user'] ?? ''));
  $password = (string)($CONFIG['smtp_pass'] ?? '');
  $from = trim((string)($CONFIG['mail_from'] ?? ''));
  $recipient = trim((string)($CONFIG['mail_to'] ?? ''));
  $port = (int)($CONFIG['smtp_port'] ?? 587);
  $encryption = strtolower(trim((string)($CONFIG['smtp_encryption'] ?? 'tls')));

  if (
    $host === '' || $username === '' || $password === '' ||
    !filter_var($from, FILTER_VALIDATE_EMAIL) ||
    !filter_var($recipient, FILTER_VALIDATE_EMAIL) ||
    !in_array($encryption, ['tls', 'ssl'], true) ||
    $port < 1 || $port > 65535
  ) {
    throw new RuntimeException('SMTP configuration is incomplete or invalid.');
  }

  $clientEmail = (string)($message['email'] ?? '');
  if (!filter_var($clientEmail, FILTER_VALIDATE_EMAIL)) {
    throw new RuntimeException('Contact email address is invalid.');
  }

  $name = trim((string)($message['name'] ?? ''));
  $phone = trim((string)($message['phone'] ?? ''));
  $branch = trim((string)($message['branch'] ?? ''));
  $body = trim((string)($message['message'] ?? ''));

  $notification = new \PHPMailer\PHPMailer\PHPMailer(true);
  $notification->isSMTP();
  $notification->Host = $host;
  $notification->SMTPAuth = true;
  $notification->Username = $username;
  $notification->Password = $password;
  $notification->Port = $port;
  $notification->SMTPSecure = $encryption === 'ssl'
    ? \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS
    : \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
  $notification->CharSet = 'UTF-8';
  $notification->setFrom($from, 'D-SOMAGUE INGÉNIERIE');
  $notification->addAddress($recipient);
  $notification->addReplyTo($clientEmail, $name);
  $notification->Subject = 'Nouvelle demande depuis le site';
  $notification->Body = "Nouvelle demande de contact\n\n"
    . "Nom : {$name}\n"
    . "E-mail : {$clientEmail}\n"
    . "Téléphone : {$phone}\n"
    . "Branche : {$branch}\n\n"
    . "Message :\n{$body}\n";
  $notification->send();

  if (!empty($CONFIG['mail_send_receipt'])) {
    $receipt = new \PHPMailer\PHPMailer\PHPMailer(true);
    $receipt->isSMTP();
    $receipt->Host = $host;
    $receipt->SMTPAuth = true;
    $receipt->Username = $username;
    $receipt->Password = $password;
    $receipt->Port = $port;
    $receipt->SMTPSecure = $notification->SMTPSecure;
    $receipt->CharSet = 'UTF-8';
    $receipt->setFrom($from, 'D-SOMAGUE INGÉNIERIE');
    $receipt->addAddress($clientEmail, $name);
    $receipt->Subject = 'Nous avons bien reçu votre demande';
    $greeting = $name !== '' ? "Bonjour {$name}," : 'Bonjour,';
    $receipt->Body = "{$greeting}\n\n"
      . "Nous avons bien reçu votre message et notre équipe vous répondra "
      . "dans les meilleurs délais.\n\n"
      . "Cordialement,\nD-SOMAGUE INGÉNIERIE";
    $receipt->send();
  }
}
