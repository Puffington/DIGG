<?php

require("connect.php");

#error_reporting(E_ALL);
#ini_set('display_errors', '1');
$database = new Connect("localhost", "root", "", "DIGG");
$database->connect();
print("HEEEEEY YOU MADE IT i can post errors here!!!");
print("post:");
print(json_encode($_POST));

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (isset($_POST["AI"])) {

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        print("AI worked!!!");

        #$data = json_decode(file_get_contents("php://input"), true); // decoding the json data, might use this for later

        $ID = !empty($_POST["ID"]) ? $_POST["ID"] : NULL;
        $ORGANISATION_ID = !empty($_POST["ORGANISATION_ID"]) ? $_POST["ORGANISATION_ID"] : NULL;
        $NAME = !empty($_POST["NAME"]) ? $_POST["NAME"] : NULL;
        $URL = !empty($_POST["URL"]) ? $_POST["URL"] : NULL;
        $VERSION = !empty($_POST["VERSION"]) ? $_POST["VERSION"] : NULL;
        $STAMP = !empty($_POST["STAMP"]) ? $_POST["STAMP"] : NULL;
        $CREATED_DATE = !empty($_POST["CREATED_DATE"]) ? $_POST["CREATED_DATE"] : NULL;

        $database->insertIntoAiTable($ID, $ORGANISATION_ID, $NAME, $URL, $VERSION, $STAMP, $CREATED_DATE);
    }
      exit(); 

  } elseif (isset($_POST["Organisation"])) {

        print("ORG worked");
      if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["Send"]) ) {
        $ID = !empty($_POST["ID"]) ? $_POST["ID"] : NULL;
        $ORGN_NR = !empty($_POST["ORGN_NR"]) ? $_POST["ORGN_NR"] : NULL;
        $NAME = !empty($_POST["NAME"]) ? $_POST["NAME"] : NULL;
        $database->insertIntoOrganisationTable($ID, $ORGN_NR, $NAME);
    }
      exit(); 
  }
}

?>

<div>this is the database page</div>