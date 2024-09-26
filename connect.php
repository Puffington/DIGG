<?php

    //$dbServerName = "localhost";
    //$dbUserName = "root";
    //$dbPassword = "";
    //$dbName = "DIGG";

    $dbServerName = "studentmysql.miun.se";
    $dbUserName = "dane2200";
    $dbPassword = "j1tlo375";
    $dbName = "dane2200";

    $conn = mysqli_connect($dbServerName, $dbUserName, $dbPassword, $dbName);

    //Check connection
    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
    }
    else{
        echo("Successfully connected");
    }

?>