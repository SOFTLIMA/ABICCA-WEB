<?php

// Permitir requisições de outras origens
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

// Verifica se o método de requisição é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Método não permitido"]);
    exit;
}

// Verifica se o arquivo foi enviado e não teve erro no upload
if (!isset($_FILES['imagem']) || $_FILES['imagem']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(["error" => "Erro ao enviar a imagem", "error_code" => $_FILES['imagem']['error']]);
    exit;
}

// Definindo o caminho para o diretório de destino (uma pasta antes da raiz da API)
$uploadDir = dirname(__DIR__) . '/Galeria/Noticias/'; // Caminho antes da raiz da API
if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0777, true)) {
        http_response_code(500);
        echo json_encode(["error" => "Falha ao criar diretório de upload"]);
        exit;
    }
}

// Define um nome único para o arquivo, usando o nome original e evitando sobrescritas
$filename = basename($_FILES['imagem']['name']);
$targetFile = $uploadDir . $filename;

// Verifica se o arquivo já existe no diretório
if (file_exists($targetFile)) {
    // Se o arquivo já existe, retorna o caminho absoluto
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Arquivo já existe",
        "file_path" => realpath($targetFile)  // Caminho absoluto do arquivo existente
    ]);
    exit;
}

// Move o arquivo para o diretório de destino
if (move_uploaded_file($_FILES['imagem']['tmp_name'], $targetFile)) {
    // Gera o caminho do arquivo que será retornado
    $filePath = 'Galeria/Noticias/' . $filename;

    // Retorna resposta de sucesso com o caminho do arquivo
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Imagem enviada com sucesso",
        "file_path" => $filePath,
        "file_name" => $filename
    ]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Falha ao mover o arquivo", "details" => error_get_last()]);
}
