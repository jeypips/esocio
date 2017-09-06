<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$parameter = $con->getData("SELECT * FROM parameters WHERE parameter_id = $_POST[parameter_id]");
$sector = $con->getData("SELECT sector_id, sector_description FROM sectors WHERE sector_id = ".$parameter[0]['parameter_no']);

$parameter[0]['is_tabular'] = ($parameter[0]['is_tabular'])?true:false;
$parameter[0]['parameter_no'] = $sector[0];

$is_tabular = $con->getData("SELECT * FROM parameters WHERE is_tabular = ".$parameter[0]['parameter_id']);
$parameter[0]['is_tabular'] = $is_tabular;

echo json_encode($parameter[0]);

?>