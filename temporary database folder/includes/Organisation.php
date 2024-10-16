<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require("Connect.php");

$database = new Connect("localhost", "root", "", "DIGG");
$database->connect();

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["Send"])) {
    $ID = !empty($_POST["ID"]) ? $_POST["ID"] : NULL;
    $ORGN_NR = !empty($_POST["ORGN_NR"]) ? $_POST["ORGN_NR"] : NULL;
    $NAME = !empty($_POST["NAME"]) ? $_POST["NAME"] : NULL;

    $database->insertIntoOrganisationTable($ID, $ORGN_NR, $NAME);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Organisation Form</title>
    <link rel="stylesheet" href="../css/style.css" />
</head>
<body>
    <nav>
        <ul class="nav-elements">
            <li><a href="../index.php" class="btn nav-link">Home</a></li>
            <li><a href="AiOrOrganisation.php" class="btn nav-link">AI or Organisation</a></li>
        </ul>
    </nav>

    <section class="custom-box">
        <div class="contact-container">
            <form class="contact" action="Organisation.php" method="post">
                <input type="text" name="ID" placeholder="ID">
                <input type="text" name="ORGN_NR" placeholder="ORGN_NR">
                <input type="text" name="NAME" placeholder="NAME">
                <button class="send-button" type="submit" name="Send">Send</button>
            </form>
        </div>
    </section>
</body>
</html>
