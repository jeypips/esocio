<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../db.php';

$con = new pdo_db("parameter_items");

$item_groups = $_POST['item_groups'];
unset($_POST['item_groups']);

$dels = $_POST['dels'];
unset($_POST['dels']);

$_POST['is_group_item'] = ($_POST['is_group_item'])?1:0;

if ($_POST['item_id']) {
		
	$parameter_id = $_POST['item_parameter']['parameter_id'];
	$_POST['item_parameter'] = $parameter_id;
	$parameter_item = $con->updateData($_POST,'item_id');
	$item_id = $_POST['item_id'];
	
} else {
	
	unset($_POST['item_id']);
	$parameter_id = $_POST['item_parameter']['parameter_id'];
	$_POST['item_parameter'] = $parameter_id;
	$parameter_item = $con->insertData($_POST);
	$item_id = $con->insertId;

}

if (count($dels)) {

	$con->table = "parameter_table_row";
	$delete = $con->deleteData(array("item_group_id"=>implode(",",$dels)));		
	
}

if (count($item_groups)) {

	$con->table = "items_groups";
	
	foreach ($item_groups as $index => $value) {
		
		$item_groups[$index]['item_group_item'] = $item_id ;		
		
	}
	
	foreach ($item_groups as $index => $value) {

		if ($value['item_group_id']) {
			
			$item_group = $con->updateData($item_groups[$index],'item_group_id');
			
		} else {
			
			unset($item_groups[$index]['item_group_id']);
			$item_group = $con->insertData($item_groups[$index]);
			
		}
	
	}
	
}

?>