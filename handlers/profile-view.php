<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$profile = $con->getData("SELECT * FROM profile WHERE profile_id = $_POST[profile_id]");
$municipality = $con->getData("SELECT * FROM municipal WHERE id = ".$profile[0]['municipality']);

$profile[0]['municipality'] = $municipality[0];

echo json_encode($profile[0]);

?>