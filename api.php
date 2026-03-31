<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

function isErtekIdValid($pdo, $ertekid) {
    $stmt = $pdo->prepare("SELECT id FROM ertek WHERE id = ?");
    $stmt->execute([$ertekid]);
    return $stmt->rowCount() > 0;
}

function isKatIdValid($pdo, $katid) {
    $stmt = $pdo->prepare("SELECT id FROM kategoria WHERE id = ?");
    $stmt->execute([$katid]);
    return $stmt->rowCount() > 0;
}

$hibaUzenetErtek = "Ilyen Érték ID nincs! Ellenőrizze itt: http://webfeladat.nhely.hu/fetchapi.html";
$hibaUzenetKat = "Ilyen Kategória ID nincs! Ellenőrizze itt: http://webfeladat.nhely.hu/javascript.html";

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM allat");
    $allatok = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'readData' => $allatok,
        'status' => 'Adatok betöltve'
    ]);

} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!isErtekIdValid($pdo, $data['ertekid'])) {
        http_response_code(422);
        echo json_encode(['error' => $hibaUzenetErtek]);
        exit;
    }

    if (!isKatIdValid($pdo, $data['katid'])) {
        http_response_code(422);
        echo json_encode(['error' => $hibaUzenetKat]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO allat (nev, ertekid, ev, katid) VALUES (:nev, :ertekid, :ev, :katid)");
    $stmt->execute([
        ':nev' => $data['nev'],
        ':ertekid' => $data['ertekid'],
        ':ev' => $data['ev'],
        ':katid' => $data['katid']
    ]);
    
    echo json_encode(['status' => 'Állat sikeresen hozzáadva']);

} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isErtekIdValid($pdo, $data['ertekid'])) {
        http_response_code(422);
        echo json_encode(['error' => $hibaUzenetErtek]);
        exit;
    }

    if (!isKatIdValid($pdo, $data['katid'])) {
        http_response_code(422);
        echo json_encode(['error' => $hibaUzenetKat]);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE allat SET nev = :nev, ertekid = :ertekid, ev = :ev, katid = :katid WHERE id = :id");
    $stmt->execute([
        ':id' => $data['id'],
        ':nev' => $data['nev'],
        ':ertekid' => $data['ertekid'],
        ':ev' => $data['ev'],
        ':katid' => $data['katid']
    ]);
    
    echo json_encode(['status' => 'Állat sikeresen frissítve']);

} elseif ($method === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $stmt = $pdo->prepare("DELETE FROM allat WHERE id = :id");
    $stmt->execute([':id' => $data['id']]);
    
    echo json_encode(['status' => 'Állat sikeresen törölve']);
}
?>