<?php

$_POST = json_decode(file_get_contents('php://input'), true);

header("Content-Type: application/json");

require_once '../db.php';

$con = new pdo_db("profile_sectors");

$profile_sector = array(
	"profile_id"=>1,
	"sector_id"=>$_POST['sectors']['macro']['id']
);

$con->insertData($profile_sector);
$profile_sector_id = $con->insertId;

foreach ($_POST['sectors']['macro']['parameters'] as $i => $parameter) {

	$con->table = "profile_sector_parameters";	

	$profile_sector_parameter = array(
		"profile_sector_id"=>$profile_sector_id,
		"parameter_id"=>$parameter['id']
	);

	$con->insertData($profile_sector_parameter);
	
	$con->table = "profile_sector_parameter_items";
	$profile_sector_parameter_id = $con->insertId;
	
	foreach ($_POST['sectors']['macro']['parameters'][$i]['items'] as $ii => $item) {
		
		$profile_sector_parameter_item = array(
			"profile_sector_parameter_id"=>$profile_sector_parameter_id,
			"item_id"=>$item['id'],
			"item_value"=>$item['item_value'],
			"item_table_row"=>0
		);
		
		$con->insertData($profile_sector_parameter_item);
		
	}
	
}

// $con->table = "profile_item_groups";

?>