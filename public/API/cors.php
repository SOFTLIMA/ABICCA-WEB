<?php

// Carrega .env manualmente (formato: CHAVE=valor)
$env = parse_ini_file(__DIR__ . '/.env');
$SITE_ORIGIN   = $env['SITE_ORIGIN'] ?? 'https://abicca.com.br';
$ACCESS_TOKEN  = $env['ACCESS_TOKEN'] ?? '';

// Informações da requisição
$method         = $_SERVER['REQUEST_METHOD'];
$origin         = $_SERVER['HTTP_ORIGIN']        ?? '';
$referer        = $_SERVER['HTTP_REFERER']       ?? '';
$receivedToken  = $_SERVER['HTTP_X_ACCESS_TOKEN'] ?? '';

header('Content-Type: application/json');

// Requisição GET é pública
if ($method === 'GET') {
    header('Access-Control-Allow-Origin: *');
    return;
}

// Pré-vôo (OPTIONS) - permite se for do domínio
if ($method === 'OPTIONS') {
    if ($origin && strpos($origin, $SITE_ORIGIN) === 0) {
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Methods: POST, PUT, DELETE');
        header('Access-Control-Allow-Headers: Content-Type, X-ACCESS-TOKEN');
        header('Access-Control-Max-Age: 86400');
        exit;
    } else {
        http_response_code(403);
        echo json_encode([
            'status' => 'erro',
            'mensagem' => 'Origem não permitida (pré-vôo)',
            'origin_recebido' => $origin
        ]);
        exit;
    }
}

// Validação da origem para métodos sensíveis
$valido = false;

if ($origin && strpos($origin, $SITE_ORIGIN) === 0) {
    $valido = true;
} elseif ($referer && strpos($referer, $SITE_ORIGIN) === 0) {
    $valido = true;
}

if (!$valido) {
    http_response_code(403);
    echo json_encode([
        'status' => 'erro',
        'mensagem' => 'Origem não permitida',
        'origin_recebido' => $origin
    ]);
    exit;
}

// Validação do token para métodos sensíveis
if ($receivedToken !== $ACCESS_TOKEN) {
    http_response_code(403);
    echo json_encode([
        'status' => 'erro',
        'mensagem' => 'Token de acesso inválido'
    ]);
    exit;
}

// Tudo certo, libera acesso com origem
header("Access-Control-Allow-Origin: $origin");
