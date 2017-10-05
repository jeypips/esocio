<?php

$_POST = json_decode(file_get_contents('php://input'), true);

header("Content-Type: application/json");

require_once '../db.php';

$con = new pdo_db("profile_sectors");
$profile_id = $_POST['profile_id'];
$sector_id = $_POST['sectors']['employment']['id'];

$parameters = $_POST['sectors']['employment']['parameters'];

if (doesProfileExist($con,$profile_id,$sector_id)) updateProfile($con,$parameters,$profile_id,$sector_id);
else addProfile($con,$parameters,$profile_id,$sector_id);

function addProfile($con,$parameters,$profile_id,$sector_id) {
	
	$profile_sector = array(
		"profile_id"=>$profile_id,
		"sector_id"=>$sector_id
	);

	$con->insertData($profile_sector);
	$profile_sector_id = $con->insertId;

	foreach ($parameters as $i => $parameter) {

		$con->table = "profile_sector_parameters";	

		$profile_sector_parameter = array(
			"profile_sector_id"=>$profile_sector_id,
			"parameter_id"=>$parameter['id']
		);

		$con->insertData($profile_sector_parameter);
		$profile_sector_parameter_id = $con->insertId;
		
		foreach ($parameters[$i]['items'] as $ii => $item) {
			
			$con->table = "profile_sector_parameter_items";		
			$profile_sector_parameter_item = array(
				"profile_sector_parameter_id"=>$profile_sector_parameter_id,
				"item_id"=>$item['id'],
				"item_value"=>$item['item_value'],
				"item_table_row"=>0
			);
			
			$con->insertData($profile_sector_parameter_item);
			$profile_parameter_item_id = $con->insertId;
			
			if ($item['has_group']) {

				$con->table = "profile_item_groups";
				
				foreach ($item['group_items'] as $iii => $gi) {

					$profile_item_group = array(
						"profile_parameter_item_id"=>$profile_parameter_item_id,
						"item_group_id"=>$gi['id'],
						"item_group_value"=>$gi['item_group_value']
					);
					
					$con->insertData($profile_item_group);
				
				}
			
			}			
			
		}
		
	}

}

function updateProfile($con,$parameters,$profile_id,$sector_id) {

	$items_values = $con->getData("SELECT profile_sector_parameter_items.id, profile_sector_parameter_items.item_id FROM profile_sector_parameter_items LEFT JOIN profile_sector_parameters ON profile_sector_parameter_items.profile_sector_parameter_id = profile_sector_parameters.id LEFT JOIN profile_sectors ON profile_sector_parameters.profile_sector_id = profile_sectors.id WHERE profile_sectors.profile_id = $profile_id AND profile_sectors.sector_id = $sector_id");	
	$item_group_values = $con->getData("SELECT profile_item_groups.id, profile_item_groups.item_group_id FROM profile_item_groups LEFT JOIN profile_sector_parameter_items ON profile_item_groups.profile_parameter_item_id = profile_sector_parameter_items.id LEFT JOIN profile_sector_parameters ON profile_sector_parameter_items.profile_sector_parameter_id = profile_sector_parameters.id LEFT JOIN profile_sectors ON profile_sector_parameters.profile_sector_id = profile_sectors.id WHERE profile_sectors.profile_id = $profile_id AND profile_sectors.sector_id = $sector_id");

	foreach ($parameters as $i => $parameter) {
		
		foreach ($parameters[$i]['items'] as $ii => $item) {
			
			$con->table = "profile_sector_parameter_items";
			$profile_sector_parameter_item = array(
				"id"=>profile_sector_parameter_item_id($items_values,$item['id']),
				"item_value"=>$item['item_value']
			);
			
			$con->updateData($profile_sector_parameter_item,'id');
			
			if ($item['has_group']) {

				$con->table = "profile_item_groups";

				foreach ($item['group_items'] as $iii => $gi) {

					$profile_item_group = array(
						"id"=>profile_item_group_id($item_group_values,$gi['id']),
						"item_group_value"=>$gi['item_group_value']
					);
					
					$con->updateData($profile_item_group,'id');
				
				}
			
			}		
			
		}
		
	}

}

function profile_sector_parameter_item_id($items_values,$item_id) {
	
	$id = null;
	
	foreach ($items_values as $i => $iv) {
		
		if ($iv['item_id'] == $item_id) {

			$id = $iv['id'];
			break;
		
		}
		
	};
	
	return $id;
	
}

function profile_item_group_id($item_group_values,$item_group_id) {
	
	$id = null;
	
	foreach ($item_group_values as $i => $igv) {
		
		if ($igv['item_group_id'] == $item_group_id) {

			$id = $igv['id'];
			break;
		
		}
		
	};
	
	return $id;
	
}

function doesProfileExist($con,$profile_id,$sector_id) {

$exists = false;

$profile_sector = $con->getData("SELECT * FROM profile_sectors WHERE profile_id = $profile_id AND sector_id = $sector_id");

if (count($profile_sector)) $exists = true;

return $exists;
	
}

?>