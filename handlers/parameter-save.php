<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../db.php';

$con = new pdo_db("parameters");

$table_rows = $_POST['table_rows'];
unset($_POST['table_rows']);

$dels = $_POST['dels'];
unset($_POST['dels']);

$_POST['is_tabular'] = ($_POST['is_tabular'])?1:0;

if ($_POST['parameter_id']) {
		
	$sector_id = $_POST['parameter_no']['sector_id'];
	$_POST['parameter_no'] = $sector_id;
	$parameter = $con->updateData($_POST,'parameter_id');
	$parameter_id = $_POST['parameter_id'];
	
} else {
	
	unset($_POST['parameter_id']);
	$sector_id = $_POST['parameter_no']['sector_id'];
	$_POST['parameter_no'] = $sector_id;
	$parameter = $con->insertData($_POST);
	$parameter_id = $con->insertId;

}

if (count($dels)) {

	$con->table = "parameter_table_row";
	$delete = $con->deleteData(array("table_row_id"=>implode(",",$dels)));		
	
}

if (count($table_rows)) {

	$con->table = "parameter_table_row";
	
	foreach ($table_rows as $index => $value) {
		
		$table_rows[$index]['table_row_item'] = $parameter_id ;		
		
	}
	
	foreach ($table_rows as $index => $value) {

		if ($value['table_row_id']) {
			
			$table_row = $con->updateData($table_rows[$index],'table_row_id');
			
		} else {
			
			unset($table_rows[$index]['table_row_id']);
			$table_row = $con->insertData($table_rows[$index]);
			
		}
	
	}
	
}

?>