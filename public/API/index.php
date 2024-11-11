<?php

require __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

// Inicializa o Dotenv e carrega as variáveis de ambiente
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Acessando uma variável de ambiente para teste
$email = $_ENV['APP_EMAIL'];
$senha = $_ENV['APP_SENHA'];


header('Content-Type: text/html; charset=utf-8');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Método não permitido"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['subject']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(["error" => "Dados incompletos"]);
    exit;
}


$mail = new PHPMailer(true);

try {
    // Configurações do servidor SMTP

    $mail->isSMTP();
    $mail->Host = 'email-ssl.com.br'; // Servidor SMTP
    $mail->SMTPAuth = true;
    $mail->Username = $email; // Seu e-mail SMTP
    $mail->Password = $senha; // Sua senha
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    // Configurações do e-mail
    $mail->CharSet = 'UTF-8';
    $mail->setFrom('marketing@abicca.com.br', 'ABICCA');
    $mail->addAddress('marketing@abicca.com.br', 'ABICCA');
    $mail->Subject = htmlspecialchars($data['subject'], ENT_QUOTES, 'UTF-8');
    $mail->Body = htmlspecialchars($data['message'], ENT_QUOTES, 'UTF-8');

    // Enviar o e-mail
    $mail->send();
    http_response_code(200);
    echo json_encode(["success" => "E-mail enviado com sucesso!"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Falha ao enviar o e-mail: " . $mail->ErrorInfo]);
}
?>
