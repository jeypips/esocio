<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$parameters = $con->getData("SELECT * FROM parameters WHERE parameter_id = $_POST[parameter_id]");

echo json_encode($parameters[0]);

?>