<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$parameter_items = $con->getData("SELECT * FROM parameter_items WHERE item_id = $_POST[item_id]");
$parameter = $con->getData("SELECT parameter_id, parameter_name FROM parameters WHERE parameter_id = ".$parameter_items[0]['item_parameter']);

$parameter_items[0]['is_group_item'] = ($parameter_items[0]['is_group_item'])?true:false;
$parameter_items[0]['item_parameter'] = $parameter[0];

$item_groups = $con->getData("SELECT * FROM items_groups WHERE item_group_item = ".$parameter_items[0]['item_id']);

$parameter_items[0]['item_groups'] = $item_groups;
$parameter_items[0]['dels'] = [];

echo json_encode($parameter_items[0]);

?>

