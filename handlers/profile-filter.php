<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

require_once 'profile-filters.php';

$selections = [];

if (isset($filters[$_POST['filter']])) {
	
	if ($_POST['filter'] == "All") $selections[] = array("id"=>0,"label"=>"All");
	else $selections[] = array("id"=>0,"label"=>$_POST['filter']." - (Select)");
	
};

foreach ($filters[$_POST['filter']] as $value) {
	
	if ($_POST['filter'] == "All") break;
	
	$con = new pdo_db();
	$results = $con->getData("SELECT $value[fields] FROM $value[table]");
	foreach ($results as $result) {
		
		$selections[] = $result;
		
	}

};

echo json_encode($selections);

?>