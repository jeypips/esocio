<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../db.php';
include_once 'notifications.php';

$con = new pdo_db("profile");

unset($_POST['profile']['sectors']);

$_POST['profile']['municipality'] = $_POST['profile']['municipality']['id'];

if ($_POST['profile']['profile_id']) {
	
	$profile = $con->updateData($_POST['profile'],'profile_id');	
	$profile_id = $_POST['profile']['profile_id'];
	notify($con,'update',$profile_id,0);
	
} else {
	
	$profile = $con->insertData($_POST['profile']);		
	$profile_id = $con->insertId;
	notify($con,'add',$profile_id,0);
	
}

$profile = $con->getData("SELECT * FROM profile WHERE profile_id = $profile_id");
$municipality = $con->getData("SELECT * FROM municipal WHERE id = ".$profile['municipality']);
$profile[0]['municipality'] = $municipality[0];

echo json_encode($profile[0]);

?>