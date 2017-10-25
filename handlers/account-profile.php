<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

header("Content-Type: application/json");

$con = new pdo_db();

$sql = "SELECT account_id, CONCAT(account_firstname, ' ', account_lastname) fullname, account_password, account_username,account_name_municipality, groups FROM account_info WHERE account_id = $_SESSION[account_id]";

$staff = $con->getData($sql);

$dir = "pictures/";
$avatar = $dir."avatar.png";

$picture = $dir.$staff[0]['account_id'].".jpg";
if (!file_exists("../".$picture)) $picture = $avatar;

$staff[0]['picture'] = $picture;

$_SESSION['account'] = $staff[0];

echo json_encode($staff[0]);

?>