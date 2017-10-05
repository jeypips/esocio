<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../db.php';
require_once '../classes.php';

$con = new pdo_db("profile");
$sectorsObj = new sectors($con);
$sector_id = $sectorsObj->sector_id($_POST['sector']);

$profile_sector = $con->getData("SELECT * FROM profile_sectors WHERE profile_id = $_POST[profile_id] AND sector_id = $sector_id");

if (count($profile_sector)) {
	$agriculture = $sectorsObj->profileSector($_POST['profile_id'],$_POST['sector']);	
} else {
	$agriculture = $sectorsObj->fetchSector($_POST['sector']);	
}

$response = array("agriculture"=>$agriculture);

echo json_encode($response);

?>