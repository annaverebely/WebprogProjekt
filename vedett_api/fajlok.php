<?php
// Engedélyezzük a kérést bármilyen portról (a 5173-ról is)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Ha a böngésző csak ellenőriz (preflight), itt álljon meg
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once "config.php";
// ... a többi kódod ...

//$sql = "SELECT id, nev FROM allat"; // Leegyszerűsített lekérdezés tesztnek
$sql = "SELECT 
            allat.id, 
            allat.nev, 
            allat.ev, 
            ertek.forint AS eszmei_ertek, 
            kategoria.nev AS kategoria_nev 
        FROM allat 
        LEFT JOIN ertek ON allat.ertekid = ertek.id 
        LEFT JOIN kategoria ON allat.katid = kategoria.id";
$result = $conn->query($sql);

if (!$result) {
    die(json_encode(["hiba" => $conn->error]));
}

$fajok = [];
while($row = $result->fetch_assoc()) {
    $fajok[] = $row;
}
echo json_encode($fajok);
?>