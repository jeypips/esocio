<?php

class sectors {
	
	var $sectors;
	var $con;
	
	function __construct($con) {
		
		$this->con = $con;
		$this->sectors = $con->getData("SELECT sector_id id , sector_description description, sector_shortname shortname FROM sectors");

		foreach ($this->sectors as $i => $sector) {

			$parameters = $this->con->getData("SELECT parameter_id id, parameter_name description, is_tabular, is_tabular_multiple FROM parameters WHERE parameter_no = $sector[id]");

			$this->sectors[$i]['parameters'] = $parameters;
			
			foreach($this->sectors[$i]['parameters'] as $ii => $parameter) {

				$items = $this->con->getData("SELECT item_id id, item_attribute description, '' item_value FROM parameter_items WHERE item_parameter = $parameter[id]");

				$this->sectors[$i]['parameters'][$ii]['items'] = $items;
				
				foreach($this->sectors[$i]['parameters'][$ii]['items'] as $iii => $item) {

					$item_groups = $this->con->getData("SELECT item_group_id id, item_group_description description, '' item_group_value FROM items_groups WHERE item_group_item = $item[id]");
					
					$this->sectors[$i]['parameters'][$ii]['items'][$iii]['has_group'] = false;

					$this->sectors[$i]['parameters'][$ii]['items'][$iii]['row'] = 0;
				
					if (count($item_groups)) {
						
						$this->sectors[$i]['parameters'][$ii]['items'][$iii]['has_group'] = true;
						$this->sectors[$i]['parameters'][$ii]['items'][$iii]['group_items'] = $item_groups;
						
					}
					
				}
				
				# multiple rows table
				if ($this->sectors[$i]['parameters'][$ii]['is_tabular_multiple']) {
					
					$rows = $this->con->getData("SELECT table_row_id id, table_row_description description FROM parameter_table_row WHERE table_row_item = $parameter[id]");					

					foreach ($this->sectors[$i]['parameters'][$ii]['items'] as $n => $value) {

						if ($n == 0) continue;					
					
						foreach ($rows as $row) {				
							
							$value['row'] = $row['id'];
							$this->sectors[$i]['parameters'][$ii]['items'][] = $value;

						}

					}
					
					$this->sectors[$i]['parameters'][$ii]['rows'] = $rows;
					
				}

			}
			
		}		
	
	}
	
	function fetchAll() {

		return $this->sectors;

	}
	
	function fetchSector($s) {
		
		$sector = [];

		foreach ($this->sectors as $i => $_sector) {
			
			if ($_sector['shortname'] == $s) {
				
				$sector = $_sector;
				
			}
			
		}
		
		return $sector;
		
	}
	
	function profileSector($profile_id,$sector_shortname) {
		
		$sector_id = $this->sector_id($sector_shortname);
		
		# for contructions
		$items_values = $this->con->getData("SELECT profile_sector_parameter_items.item_id, profile_sector_parameter_items.item_value, profile_sector_parameter_items.item_table_row FROM profile_sector_parameter_items LEFT JOIN profile_sector_parameters ON profile_sector_parameter_items.profile_sector_parameter_id = profile_sector_parameters.id LEFT JOIN profile_sectors ON profile_sector_parameters.profile_sector_id = profile_sectors.id WHERE profile_sectors.profile_id = $profile_id AND profile_sectors.sector_id = $sector_id");
		$item_group_values = $this->con->getData("SELECT profile_item_groups.item_group_id, profile_item_groups.item_group_value FROM profile_item_groups LEFT JOIN profile_sector_parameter_items ON profile_item_groups.profile_parameter_item_id = profile_sector_parameter_items.id LEFT JOIN profile_sector_parameters ON profile_sector_parameter_items.profile_sector_parameter_id = profile_sector_parameters.id LEFT JOIN profile_sectors ON profile_sector_parameters.profile_sector_id = profile_sectors.id WHERE profile_sectors.profile_id = $profile_id AND profile_sectors.sector_id = $sector_id");
		#
		
		$sector = $this->con->getData("SELECT sector_id id, sector_description description, sector_shortname shortname FROM sectors WHERE sector_shortname = '$sector_shortname'");
		
		$parameters = $this->con->getData("SELECT parameter_id id, parameter_name description, is_tabular, is_tabular_multiple FROM parameters WHERE parameter_no = ".$sector[0]['id']);

		$sector[0]['parameters'] = $parameters;
		
		foreach($sector[0]['parameters'] as $i => $parameter) {

			$items = $this->con->getData("SELECT item_id id, item_attribute description, '' item_value, 0 row FROM parameter_items WHERE item_parameter = $parameter[id]");
			
			# assign item values
			foreach($items as $n => $item) {
				$items[$n]['item_value'] = $this->item_value($items_values,$item['id'],0);
			};
			#
			
			$sector[0]['parameters'][$i]['items'] = $items;
			
			foreach($sector[0]['parameters'][$i]['items'] as $ii => $item) {

				$item_groups = $this->con->getData("SELECT item_group_id id, item_group_description description, '' item_group_value FROM items_groups WHERE item_group_item = $item[id]");
				
				$sector[0]['parameters'][$i]['items'][$ii]['has_group'] = false;
				
				if (count($item_groups)) {
					
					# assign item group values
					foreach($item_groups as $n => $item_group) {
						$item_groups[$n]['item_group_value'] = $this->item_group_value($item_group_values,$item_group['id']);
					}
					#
					
					$sector[0]['parameters'][$i]['items'][$ii]['has_group'] = true;
					$sector[0]['parameters'][$i]['items'][$ii]['group_items'] = $item_groups;
					
					$sector[0]['parameters'][$i]['items'][$ii]['row'] = 0;				
					
				}
				
			}			
			
			# multiple rows table
			if ($sector[0]['parameters'][$i]['is_tabular_multiple']) {
				
				$rows = $this->con->getData("SELECT table_row_id id, table_row_description description FROM parameter_table_row WHERE table_row_item = $parameter[id]");
				
				foreach ($sector[0]['parameters'][$i]['items'] as $n => $value) {
					
					if ($n == 0) continue;
					
					foreach ($rows as $row) {				
						
						$value['row'] = $row['id'];
						$value['item_value'] = $this->item_value($items_values,$value['id'],$row['id']);
						$sector[0]['parameters'][$i]['items'][] = $value;

					}

				}				
				
				$sector[0]['parameters'][$i]['rows'] = $rows;
				
			}

		}
		
		return $sector[0];
		
	}
	
	function sector_id($sector_shortname) {
		
		$sector = $this->con->getData("SELECT sector_id id, sector_description description, sector_shortname shortname FROM sectors WHERE sector_shortname = '$sector_shortname'");
		
		return $sector[0]['id'];
		
	}
	
	function item_value($items_values,$id,$row) {
		
		$value = null;
		
		foreach($items_values as $i => $iv) {
			
			if (($iv['item_id'] == $id) && ($iv['item_table_row'] == $row)) {
					
				$value = $iv['item_value'];
				break;
					
			}
			
		}
		
		return $value;
		
	}
	
	function item_group_value($item_group_values,$id) {
		
		$value = null;
		
		foreach($item_group_values as $i => $igv) {
			
			if ($igv['item_group_id'] == $id) {
					
				$value = $igv['item_group_value'];
				break;
					
			}
			
		}
		
		return $value;
		
	}	

}

?>