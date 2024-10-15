<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require("Connect.php");

$database = new Connect("localhost", "root", "", "DIGG");
$database->connect();

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["Submit"])) {
    $ID = !empty($_POST["ID"]) ? $_POST["ID"] : NULL;
    $ORGANISATION_ID = !empty($_POST["ORGANISATION_ID"]) ? $_POST["ORGANISATION_ID"] : NULL;
    $NAME = !empty($_POST["NAME"]) ? $_POST["NAME"] : NULL;
    $URL = !empty($_POST["URL"]) ? $_POST["URL"] : NULL;
    $VERSION = !empty($_POST["VERSION"]) ? $_POST["VERSION"] : NULL;
    $STAMP = !empty($_POST["STAMP"]) ? $_POST["STAMP"] : NULL;
    $CREATED_DATE = !empty($_POST["CREATED_DATE"]) ? $_POST["CREATED_DATE"] : NULL;

    $database->insertIntoAiTable($ID, $ORGANISATION_ID, $NAME, $URL, $VERSION, $STAMP, $CREATED_DATE);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Form</title>
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
        <form class="create-account" action="AI.php" method="post">
            <input type="text" name="ID" placeholder="ID">
            <input type="text" name="ORGANISATION_ID" placeholder="ORGANISATION_ID">
            <input type="text" name="NAME" placeholder="NAME">
            <input type="text" name="URL" placeholder="URL">
            <input type="text" name="VERSION" placeholder="VERSION">
            <input type="text" name="STAMP" placeholder="STAMP">
            <input type="text" name="CREATED_DATE" placeholder="CREATED_DATE">
            <button class="Submit" type="submit" name="Submit">Submit</button>
        </form>
    </section>
</body>
</html>
