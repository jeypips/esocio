<?php

require_once '../db.php';
require_once '../classes.php';

$con = new pdo_db();
$sectorsObj = new sectors($con);
$sectors = $sectorsObj->fetchAll();

header("Content-Type: application/json");
echo json_encode($sectors);

?>