<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$account_infos = $con->getData("SELECT * FROM account_info");

echo json_encode($account_infos);

?>