<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../db.php';

$con = new pdo_db("parameters");

$_POST['is_tabular'] = ($_POST['is_tabular'])?1:0;

if ($_POST['parameter_id']) {
		
	$sector_id = $_POST['parameter_no']['sector_id'];
	$_POST['parameter_no'] = $sector_id;
	$parameter = $con->updateData($_POST,'parameter_id');
	
} else {
	
	unset($_POST['parameter_id']);
	$sector_id = $_POST['parameter_no']['sector_id'];
	$_POST['parameter_no'] = $sector_id;
	$parameter = $con->insertData($_POST);

}

?>