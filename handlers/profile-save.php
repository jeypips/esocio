<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../db.php';

$con = new pdo_db("profile");

if ($_POST['profile']['profile_id']) {
	
	$profile = $con->updateData($_POST['profile'],'profile_id');	
	$profile_id = $_POST['profile']['profile_id'];
	
} else {
	
	$profile = $con->insertData($_POST['profile']);		
	$profile_id = $con->insertId;
	
	construct_profile($con,$profile_id);

}

echo $profile_id;

function construct_profile($con,$profile_id) {

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
			"profile_id"=>$profile_id,
			"sector_id"=>$sector['sector_id']
		);
	};
	
	$con->table = "profile_sectors";	
	$con->insertDataMulti($profile_sectors);
	$profile_sector_id = $con->insertId;
	var_dump($profile_sector_id);
	foreach ($parameters as $parameter) {
		$profile_sector_parameters[] = array(
			"profile_sector_id"=>$profile_sector_id,
			"parameter_id"=>$parameter['parameter_id']
		);
	};
	
	$con->table = "profile_sector_parameters";	
	$con->insertDataMulti($profile_sector_parameters);
	$profile_sector_parameter_id = $con->insertId;	
	exit();
	foreach ($parameter_items as $parameter_item) {
		$profile_sector_parameter_items[] = array(
			"profile_sector_parameter_id"=>$profile_sector_parameter_id,
			"item_id"=>$parameter_item['item_id']
		);
	};
	
	$con->table = "profile_sector_parameter_items";	
	$con->insertDataMulti($profile_sector_parameter_items);
	$profile_parameter_item_id = $con->insertId;	
	
	foreach ($items_groups as $item_group) {
		$profile_item_groups[] = array(
			"profile_parameter_item_id"=>$profile_parameter_item_id,
			"item_group_id"=>$item_group['item_group_id']
		);
	};
	
	$con->table = "profile_item_groups";	
	$con->insertDataMulti($profile_item_groups);
	
};

?>