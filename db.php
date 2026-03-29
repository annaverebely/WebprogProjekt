<?php
$host = "localhost";
$db   = "webfeladat";     // Pl. nhely_felhasznalonev_db
$user = "webfeladat";      // Pl. nhely_felhasznalonev
$pass = "NeumannGamf+1";              // Az adatbázishoz beállított jelszó

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=UTF8", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    // Fejlesztés alatt kiírathatod a hibát, de élesben jobb a silent error
    die(json_encode(["status" => "Database connection failed: " . $e->getMessage()]));
}
?>