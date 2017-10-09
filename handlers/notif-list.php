<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$notifications = $con->getData("SELECT * FROM notifications JOIN account_info ON account_info.account_id = notifications.account_no JOIN sectors ON sectors.sector_id = notifications.sector_no");

echo json_encode($notifications);

?>