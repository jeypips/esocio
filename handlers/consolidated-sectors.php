<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

require_once '../classes.php';

$con = new pdo_db();

$sectorsObj = new sectors($con);

$sectors = $con->getData("SELECT * FROM sectors");
$municipalities = $con->getData("SELECT * FROM municipal");

$consolidated = [];

foreach ($municipalities as $municipality) {
	
	$consolidated[$municipality['municipality']] = [];
	
	$profiles = $con->getData("SELECT * from profile WHERE municipality = $municipality[id]");
	
	foreach ($profiles as $p) {
		
		$consolidated[$municipality['municipality']][$p['profile_year']] = [];
		
		$profile_id = $p['profile_id'];

		$profile_sectors = [];

		$profile = $con->getData("SELECT *, (SELECT municipal.municipality FROM municipal WHERE municipal.id = profile.municipality) municipality_name FROM profile WHERE profile_id = $profile_id");
		$profile_sectors['profile'] = $profile[0];

		foreach ($sectors as $sector) {
			
			$profile_sector = $sectorsObj->profileSector($profile_id,$sector['sector_shortname']);
			
			$profile_sectors[$sector['sector_shortname']] = $profile_sector;
			
		}

		$consolidated[$municipality['municipality']][$p['profile_year']] = $profile_sectors;
		
	}
	
}

header("Content-Type: application/json");
echo json_encode($consolidated);

?>