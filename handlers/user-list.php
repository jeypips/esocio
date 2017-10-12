<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$account_infos = $con->getData("SELECT * FROM account_info");

foreach ($account_infos as $key => $account_info) {
	
$municipality = $con->getData("SELECT * FROM municipal WHERE id = ".$account_info['account_name_municipality']);
$account_infos[$key]['account_name_municipality'] = $municipality[0];	
	
}

header("Content-Type: application/json");
echo json_encode($account_infos);

?>