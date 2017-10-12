<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../db.php';
include_once 'notifications.php';

$con = new pdo_db("profile");

unset($_POST['profile']['sectors']);

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

echo json_encode($profile[0]);

?>