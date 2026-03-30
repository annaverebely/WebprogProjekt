<?php
header("Content-Type: application/json");
require "db.php";
$method = $_SERVER['REQUEST_METHOD'];
$tabla = "allat"; // Az adatbázisodban szereplő táblanév

switch ($method) {
    case 'GET':  
        try {
            $stmt = $pdo->query("SELECT * FROM $tabla ORDER BY id DESC");
            $readData = $stmt->fetchAll();
            echo json_encode(['status' => 'Sikeres olvasás!', "readData" => $readData]);
        } catch(PDOException $e) {
            echo json_encode(['status' => 'Hiba az olvasáskor!']);
        }
        break;
    case 'POST':
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $stmt = $pdo->prepare("INSERT INTO $tabla (nev, ertekid, ev, katid) VALUES (?, ?, ?, ?)");
            $stmt->execute([$data['nev'], $data['ertekid'], $data['ev'], $data['katid']]);
            echo json_encode(['status' => 'Sikeres rögzítés!']);
        } catch(PDOException $e) {
            echo json_encode(['status' => 'Hiba a rögzítéskor!']);
        }
        break;
    case 'PUT':
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $stmt = $pdo->prepare("UPDATE $tabla SET nev=?, ertekid=?, ev=?, katid=? WHERE id=?");
            $stmt->execute([$data['nev'], $data['ertekid'], $data['ev'], $data['katid'], $data['id']]);
            echo json_encode(['status' => 'Sikeres frissítés!']);
        } catch(PDOException $e) {
            echo json_encode(['status' => 'Hiba a frissítéskor!']);
        }
        break;
    case 'DELETE':
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $stmt = $pdo->prepare("DELETE FROM $tabla WHERE id=?");
            $stmt->execute([$data['id']]);
            echo json_encode(['status' => 'Sikeres törlés!']);
        } catch(PDOException $e) {
            echo json_encode(['status' => 'Hiba a törléskor!']);
        }
        break;
}