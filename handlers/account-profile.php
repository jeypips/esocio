<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

header("Content-Type: application/json");

$con = new pdo_db();

$profile = [];

$sql = "SELECT account_id, CONCAT(account_firstname, ' ', account_lastname) fullname, groups FROM account_info WHERE account_id = $_SESSION[account_id]";

$staff = $con->getData($sql);

$profile['fullname'] = $staff[0]['fullname'];
$profile['groups'] = $staff[0]['groups'];

$dir = "pictures/";
$avatar = $dir."avatar.png";

$picture = $dir.$staff[0]['account_id'].".jpg";
if (!file_exists("../".$picture)) $picture = $avatar;

$profile['picture'] = $picture;

echo json_encode($profile);

?>