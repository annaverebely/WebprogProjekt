<?php
header("Content-Type: application/json");
require_once "db.php";

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET': 
        $stmt = $pdo->query("SELECT * FROM ertek ORDER BY id DESC");
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST': 
        $data = json_decode(file_get_contents("php://input"), true);
        if(!empty($data['forint'])) {
            $stmt = $pdo->prepare("INSERT INTO ertek (forint) VALUES (?)");
            $stmt->execute([$data['forint']]);
            echo json_encode(["status" => "Sikeres mentés"]);
        }
        break;

    case 'PUT': 
        $data = json_decode(file_get_contents("php://input"), true);
        if(!empty($data['id']) && !empty($data['forint'])) {
            $stmt = $pdo->prepare("UPDATE ertek SET forint = ? WHERE id = ?");
            $stmt->execute([$data['forint'], $data['id']]);
            echo json_encode(["status" => "Sikeres frissítés"]);
        }
        break;

    case 'DELETE': 
        if(isset($_GET['id'])) {
            $stmt = $pdo->prepare("DELETE FROM ertek WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            echo json_encode(["status" => "Sikeres törlés"]);
        }
        break;
}
?>