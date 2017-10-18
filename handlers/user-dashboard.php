<?php



$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

$con = new pdo_db();

$profile = $con->getData("SELECT profile_id FROM profile WHERE municipality = ".$_POST['account_name_municipality']." ORDER BY profile_year DESC");

header("Content-Type: application/json");
echo $profile[0]['profile_id'];

?>