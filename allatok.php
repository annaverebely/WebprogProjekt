<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost"; 
$dbname = "webfeladat"; 
$user = "webfeladat";    
$pass = "NeumannGamf+1";           

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Kapcsolódási hiba: " . $e->getMessage()]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    try {
        $sql = "SELECT a.id, a.nev, a.ev, k.nev AS kategoria, e.forint AS ertek 
                FROM allat a 
                LEFT JOIN kategoria k ON a.katid = k.id 
                LEFT JOIN ertek e ON a.ertekid = e.id 
                ORDER BY a.id DESC";
        $stmt = $pdo->query($sql);
        $eredmeny = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($eredmeny);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
}

if ($method == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!empty($input['nev'])) {
        try {
            $sql = "INSERT INTO allat (nev, ev, katid, ertekid) VALUES (?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $input['nev'], 
                $input['ev'], 
                $input['katid'], 
                $input['ertekid']
            ]);
            echo json_encode(["status" => "success", "message" => "Adat sikeresen mentve!"]);
        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Hiányzó adatok!"]);
    }
}

if ($method == 'DELETE') {
    if (isset($_GET['id'])) {
        try {
            $stmt = $pdo->prepare("DELETE FROM allat WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            echo json_encode(["status" => "success", "message" => "Sikeres törlés!"]);
        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
    }
}
?>