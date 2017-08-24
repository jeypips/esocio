<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../db.php';

$con = new pdo_db("parameters");

if ($_POST['parameters']['parameter_id']) {
	
	$parameters = $con->updateData($_POST['parameters'],'parameter_id');
	
} else {
	
	$parameters = $con->insertData($_POST['parameters']);
	echo $con->insertId;

}

?>