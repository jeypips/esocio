<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$account_info = $con->getData("SELECT * FROM account_info WHERE account_id = $_POST[account_id]");
$municipality = $con->getData("SELECT * FROM municipal WHERE id = ".$account_info[0]['account_name_municipality']);
$account_info[0]['account_name_municipality'] = $municipality[0];

echo json_encode($account_info[0]);

?>