<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../db.php';

$con = new pdo_db("parameter_items");

if ($_POST['item_id']) {
		
	$parameter_id = $_POST['item_parameter']['parameter_id'];
	$_POST['item_parameter'] = $parameter_id;
	$parameter_items = $con->updateData($_POST,'item_id');
	
} else {
	
	unset($_POST['item_id']);
	$parameter_id = $_POST['item_parameter']['parameter_id'];
	$_POST['item_parameter'] = $parameter_id;
	$parameter_items = $con->insertData($_POST,'item_id');

}

?>