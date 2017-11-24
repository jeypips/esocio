<?php

session_start();

require_once '../db.php';

$con = new pdo_db();

$account_id = $_SESSION['account_id'];

$municipality = $con->getData("SELECT account_name_municipality FROM account_info WHERE account_id = $account_id");

$profile = $con->getData("SELECT * FROM profile WHERE municipality = ".$municipality[0]['account_name_municipality']." LIMIT 1");

$m = $con->getData("SELECT id, municipality FROM municipal WHERE id = ".$municipality[0]['account_name_municipality']);

$response = [];

if (count($profile)) {

$response = array(
	"municipality"=>$m[0],
	"pb_north"=>$profile[0]['pb_north'],
	"pb_east"=>$profile[0]['pb_east'],
	"pb_south"=>$profile[0]['pb_south'],
	"pb_west"=>$profile[0]['pb_west']
);

}

header("Content-Type: application/json");
echo json_encode($response);

?>