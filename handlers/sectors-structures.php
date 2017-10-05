<?php

header("Content-Type: application/json");

require_once '../db.php';

$con = new pdo_db();

$sectors = $con->getData("SELECT sector_id id , sector_description description, sector_shortname shortname  FROM sectors");

foreach ($sectors as $i => $sector) {

	$parameters = $con->getData("SELECT parameter_id id, parameter_name description, is_tabular, is_tabular_multiple FROM parameters WHERE parameter_no = $sector[id]");

	$sectors[$i]['parameters'] = $parameters;
	
	foreach($sectors[$i]['parameters'] as $ii => $parameter) {

		$items = $con->getData("SELECT item_id id, item_attribute description, '' item_value FROM parameter_items WHERE item_parameter = $parameter[id]");

		$sectors[$i]['parameters'][$ii]['items'] = $items;
		
		foreach($sectors[$i]['parameters'][$ii]['items'] as $iii => $item) {

			$item_groups = $con->getData("SELECT item_group_id id, item_group_description description, '' item_group_value FROM items_groups WHERE item_group_item = $item[id]");
			
			$sectors[$i]['parameters'][$ii]['items'][$iii]['has_group'] = false;
			
			if (count($item_groups)) {
				
				$sectors[$i]['parameters'][$ii]['items'][$iii]['has_group'] = true;
				$sectors[$i]['parameters'][$ii]['items'][$iii]['group_items'] = $item_groups;
				
			}
			
		}
		
		# multiple rows table
		if ($sectors[$i]['parameters'][$ii]['is_tabular_multiple']) {
			
			$rows = $con->getData("SELECT table_row_id id, table_row_description description FROM parameter_table_row WHERE table_row_item = $parameter[id]");
			
			$sectors[$i]['parameters'][$ii]['rows'] = $rows;
		}

	}
	
}

echo json_encode($sectors);

?>