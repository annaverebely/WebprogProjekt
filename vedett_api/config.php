<?php
$host = "127.0.0.1"; // A "localhost" helyett az IP biztosabb
$user = "root";      // Alapértelmezett XAMPP felhasználó
$pass = "";          // Alapértelmezett XAMPP jelszó (üres)
$db   = "vedett_fajok"; // Ellenőrizd a phpMyAdmin-ban, hogy pontosan ez-e a név!

$conn = new mysqli($host, $user, $pass, $db);

// Ha hiba van a csatlakozáskor, azt azonnal írja ki, ne csak pörögjön:
if ($conn->connect_error) {
    header("Content-Type: application/json");
    die(json_encode(["hiba" => "Sikertelen kapcsolódás: " . $conn->connect_error]));
}

$conn->set_charset("utf8");
?>