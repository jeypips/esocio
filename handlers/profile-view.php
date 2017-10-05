<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$profile = $con->getData("SELECT * FROM profile WHERE profile_id = $_POST[profile_id]");

echo json_encode($profile[0]);

?>