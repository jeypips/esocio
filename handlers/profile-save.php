<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../db.php';

$con = new pdo_db("profile");

construct_profile($con); exit();

if ($_POST['profile']['profile_id']) {
	
	$profile = $con->updateData($_POST['profile'],'profile_id');
	
} else {
	
	$profile = $con->insertData($_POST['profile']);	
	
	echo $con->insertId;

}

function construct_profile($con) {

	$sectors = $con->getData("SELECT sector_id FROM sectors");
	$parameters = $con->getData("SELECT parameter_id FROM parameters");
	$parameter_items = $con->getData("SELECT item_id FROM parameter_items");
	$items_groups = $con->getData("SELECT item_group_id FROM items_groups");
	
	$profile_sectors = [];
	$profile_sector_parameters = [];
	$profile_sector_parameter_items = [];
	$profile_item_groups = [];
	
	foreach ($sectors as $sector) {
		$profile_sectors[] = array(
			"profile_id"=>0,
			"sector_id"=>$sector['sector_id']
		);
	};
	
	foreach ($parameters as $parameter) {
		$profile_sector_parameters[] = array(
			"profile_sector_id"=>0,
			"parameter_id"=>$parameter['parameter_id']
		);
	};
	
	foreach ($parameter_items as $parameter_item) {
		$profile_sector_parameter_items[] = array(
			"profile_sector_parameter_id"=>0,
			"item_id"=>$parameter_item['item_id']
		);
	};
	
	foreach ($items_groups as $item_group) {
		$profile_item_groups[] = array(
			"profile_parameter_item_id"=>0,
			"item_group_id"=>$item_group['item_group_id']
		);
	};
	
	var_dump($profile_sectors);
	var_dump($profile_sector_parameters);
	var_dump($profile_sector_parameter_items);
	var_dump($profile_item_groups);
	
};

?>