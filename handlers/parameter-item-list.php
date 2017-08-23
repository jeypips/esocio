<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$parameterItem = $con->getData("SELECT * FROM parameter_items");

echo json_encode($parameterItem);

?>