<?php

function notify($con,$mode,$profile_id,$sector_id) {

	$profiles = $con->getData("SELECT municipality FROM municipal WHERE id = $profile_id");
	$profile = "";
	foreach ($profiles as $p) {
		$profile = $p['municipality'];
	}
	$sectors = $con->getData("SELECT sector_description FROM sectors WHERE sector_id = $sector_id");	
	foreach ($sectors as $s) {
		$sector = $s['sector_description'];
	}
	
	$con->table = "notifications";
	
	switch ($mode) {
		
		case "add":

			$description = "$profile has added new profile";			

			if (count($sectors) > 0) {
				$description = "$profile has added $sector";
			}

			$data = array(
				"sector_no"=>$sector_id,
				"account_no"=>$profile_id,
				"description"=>$description,
				"system_date"=>"CURRENT_TIMESTAMP",
				"is_hidden"=>0
			);

		break;
		
		case "update":

			$description = "$profile has updated its profile";

			if (count($sectors) > 0) {
				$description = "$profile has updated $sector Info";
			}
		
			$data = array(
				"sector_no"=>$sector_id,
				"account_no"=>$profile_id,
				"description"=>$description,
				"system_date"=>"CURRENT_TIMESTAMP",
				"is_hidden"=>0
			);		

		break;
	
	};
	
	$con->insertData($data);	
	
}

?>