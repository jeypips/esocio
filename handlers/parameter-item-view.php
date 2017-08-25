<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$parameter_items = $con->getData("SELECT * FROM parameter_items WHERE item_id = $_POST[item_id]");

echo json_encode($parameter_items[0]);

?>