<?php

$filters = array(
	"All"=>array(
		array("table"=>"all","fields"=>"","macro_physical"=>"all")
	),
	"Macro Sector"=>array(
		array("table"=>"parameter","fields"=>"p_id id, p_description label",
		
		"macro_physical"=>"p_code")
	)
);

?>