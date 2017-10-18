<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

require_once '../classes.php';

$con = new pdo_db();

$sectorsObj = new sectors($con);

$profile_id = $_POST['profile_id'];

$sectors = $con->getData("SELECT * FROM sectors");

$profile_sectors = [];


$profile = $con->getData("SELECT *, (SELECT municipal.municipality FROM municipal WHERE municipal.id = profile.municipality) municipality_name FROM profile WHERE profile_id = $profile_id");
$profile_sectors['profile'] = $profile[0];


foreach ($sectors as $sector) {
	
	$profile_sector = $sectorsObj->profileSector($profile_id,$sector['sector_shortname']);
	
	$profile_sectors[$sector['sector_shortname']] = $profile_sector;
	
}

header("Content-Type: application/json");
echo json_encode($profile_sectors);

?>