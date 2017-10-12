<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$filter = "";

if ($_SESSION['account']['groups'] == "user") {
	$filter.=" WHERE municipality = ".$_SESSION['account']['account_name_municipality'];
}

$profiles = $con->getData("SELECT * FROM profile$filter");

foreach ($profiles as $key => $profile) {
	
$municipality = $con->getData("SELECT * FROM municipal WHERE id = ".$profile['municipality']);
$profiles[$key]['municipality'] = $municipality[0];
	
}

header("Content-Type: application/json");
echo json_encode($profiles);

?>