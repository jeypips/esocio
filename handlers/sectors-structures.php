<?php

header("Content-Type: application/json");

require_once '../db.php';
require_once '../classes.php';

$con = new pdo_db();
$sectorsObj = new sectors($con);
$sectors = $sectorsObj->fetchAll();

echo json_encode($sectors);

?>