<?php

require("connect.php");

#error_reporting(E_ALL);
#ini_set('display_errors', '1');
$database = new Connect("195.26.252.179", "digg2024", "diggsims24", "digg");
$database->connect();

#print(json_encode($_POST));


///Does NOT require ID, in fact DON'T put in an ID!! 

if (isset($_POST["AI"])) {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        #$data = json_decode(file_get_contents("php://input"), true); // decoding the json data, might use this for later
        $ID = !empty($_POST["ID"]) ? $_POST["ID"] : NULL; //not actually needed
        $ORGANISATION_ID = !empty($_POST["ORGANISATION_ID"]) ? $_POST["ORGANISATION_ID"] : NULL;
        $NAME = !empty($_POST["NAME"]) ? $_POST["NAME"] : NULL;
        $URL = !empty($_POST["URL"]) ? $_POST["URL"] : NULL;
        $VERSION = !empty($_POST["VERSION"]) ? $_POST["VERSION"] : NULL;
        $STAMP = !empty($_POST["STAMP"]) ? $_POST["STAMP"] : 0;
        $CREATED_DATE = !empty($_POST["CREATED_DATE"]) ? $_POST["CREATED_DATE"] : NULL;
        $CATEGORIES = !empty($_POST["CATEGORIES"]) ? $_POST["CATEGORIES"] : NULL; // NIKKI TESTAR
        $ANSWERS = !empty($_POST["ANSWERS"]) ? $_POST["ANSWERS"] : NULL;

        $database->insertIntoAiTable($ID, $ORGANISATION_ID, $NAME, $URL, $VERSION, $STAMP, $CREATED_DATE,  $ANSWERS); // NIKKI TESTAR
    }
    exit();
} elseif (isset($_POST["ORGANISATION"])) {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $ID = !empty($_POST["ID"]) ? $_POST["ID"] : NULL;
        $ORGN_NR = !empty($_POST["ORGN_NR"]) ? $_POST["ORGN_NR"] : NULL;
        $NAME = !empty($_POST["NAME"]) ? $_POST["NAME"] : NULL;

        $database->insertIntoOrganisationTable($ID, $ORGN_NR, $NAME);
    }
    exit();
}elseif( isset($_POST["CHANGE"]) ){
    echo("you are changing things");
    $TABLE = $_POST["CHANGE"];
    $ID = $_POST['ID'];
    $VARIABLE = $_POST['VARIABLE'];
    $VALUE = $_POST['VALUE'];
    $database->updateVariable($TABLE,$ID,$VARIABLE,$VALUE);
}

/// TABLE VARIABLE VALUE
if(isset($_POST["GET"])){
    $TABLE = $_POST["TABLE"];
    $VARIABLE = $_POST["VARIABLE"];
    $VALUE = $_POST["VALUE"];
    $database->getSpecific($TABLE,$VARIABLE,$VALUE);
}

/*
///Requires (ID , VARIABLE, NewVALUE)
if($_SERVER["REQUEST_METHOD"] == "UPDATE") {

    $ID = $_POST["ID"];
    $VARIABLE = $_POST["VARIABLE"];
    $VALUE = $_POST["VALUE"];
    $database->updateVariable($ID,$VARIABLE,$VALUE); 
}*/


#IF NOT EXISTS(Select ProductName from Productsnew where ProductName='Jeera Rice')
#BEGIN
#INSERT INTO Productsnew (ProductName,SupplierID,CategoryID,Unit,Price) Values ('Jeera Rice',1,7,'7,5 kg',120)
#END
