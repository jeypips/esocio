<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$profile = [];
<<<<<<< HEAD
$sql = "SELECT account_id, CONCAT(account_firstname, ' ', account_lastname) fullname FROM account_info WHERE account_id = $_SESSION[account_id]";
=======
<<<<<<< HEAD
$sql = "SELECT account_id, CONCAT(account_firstname, ' ', account_lastname) fullname FROM account_info WHERE account_id = $_SESSION[account_id]";
=======
$sql = "SELECT account_id, CONCAT(account_username, ' ', accoount_username) fullname FROM account_info WHERE account_id = $_SESSION[accunt_id]";
>>>>>>> origin/jp
>>>>>>> refs/remotes/origin/jp
$staff = $con->getData($sql);

$profile['fullname'] = $staff[0]['fullname'];

$dir = "pictures/";
$avatar = $dir."avatar.png";

$picture = $dir.$staff[0]['account_id'].".jpg";
if (!file_exists("../".$picture)) $picture = $avatar;

$profile['picture'] = $picture;

echo json_encode($profile);

?>