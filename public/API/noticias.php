<?php
// Permitir acesso de qualquer origem (ou você pode restringir a origem, se preferir)
header("Access-Control-Allow-Origin: http://localhost:4200");

// Permitir métodos
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Permitir cabeçalhos
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Se for uma requisição OPTIONS (preflight), apenas retorna e encerra
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
require __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

// Inicializa o Dotenv e carrega as variáveis de ambiente
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Acessando uma variável de ambiente para teste
$host = $_ENV['DB_HOST'];
$db = $_ENV['DB_DB'];
$user = $_ENV['DB_USER'];
$pass = $_ENV['DB_PASS'];

header("Content-Type: application/json");
$charset = 'utf8mb4';

$pdo = new PDO("mysql:host=$host;dbname=$db;charset=$charset", $user, $pass, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
]);

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

$tabela = isset($_GET['tabela']) ? $_GET['tabela'] : 'noticias_dev';

$permitidas = ['noticias', 'noticias_dev'];
if (!in_array($tabela, $permitidas)) {
    http_response_code(400);
    exit('Tabela inválida');
}

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM `$tabela` ORDER BY data DESC");
        $dados = $stmt->fetchAll();
    
        foreach ($dados as &$item) {
            // Converte a data de "YYYY-MM-DD" para "DD/MM/YYYY"
            $item['data'] = DateTime::createFromFormat('Y-m-d', $item['data'])->format('d/m/Y');
    
            // Decodifica as imagens do JSON
            $item['link_Imgs'] = json_decode($item['link_imgs'], true);
        }
    
        echo json_encode($dados);
        break;

    case 'POST':
        $dataFormatada = DateTime::createFromFormat('d/m/Y', $input['data'])->format('Y-m-d');
        $stmt = $pdo->prepare("INSERT INTO `$tabela` (id, titulo, data, descricao, link_imgs) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $input['id'],
            $input['titulo'],
            $dataFormatada,
            $input['descricao'],
            json_encode($input['link_Imgs'])
        ]);
        echo json_encode(["status" => "Criado com sucesso"]);
        break;     

    case 'PUT':
        $dataFormatada = DateTime::createFromFormat('d/m/Y', $input['data'])->format('Y-m-d');
        $stmt = $pdo->prepare("UPDATE `$tabela` SET titulo=?, data=?, descricao=?, link_imgs=? WHERE id=?");
        $stmt->execute([
            $input['titulo'],
            $dataFormatada,
            $input['descricao'],
            json_encode($input['link_Imgs']),
            $input['id']
        ]);
        echo json_encode(["status" => "Atualizado com sucesso"]);
        break;

    case 'DELETE':
        $id = $input['id'] ?? null;
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM `$tabela` WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["status" => "Deletado com sucesso"]);
        } else {
            echo json_encode(["error" => "ID não informado"]);
        }
        break;
}
?>
