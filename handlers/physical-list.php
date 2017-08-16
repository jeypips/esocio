<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

<<<<<<< HEAD
$physicals = $con->getData("SELECT * FROM macro_physical");
=======
$physicals = $con->getData("SELECT * FROM macros");
>>>>>>> refs/remotes/origin/jp

echo json_encode($physicals);

?>