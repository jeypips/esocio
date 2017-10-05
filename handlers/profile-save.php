<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../db.php';

$con = new pdo_db("profile");

if ($_POST['profile']['profile_id']) {
	
	$profile = $con->updateData($_POST['profile'],'profile_id');	
	$profile_id = $_POST['profile']['profile_id'];
	
} else {
	
	$profile = $con->insertData($_POST['profile']);		
	$profile_id = $con->insertId;

}

echo $profile_id;

?>