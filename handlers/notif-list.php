<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$notifications = $con->getData("SELECT * FROM notifications ORDER BY id DESC");

header("Content-Type: application/json");

echo json_encode($notifications);


?>