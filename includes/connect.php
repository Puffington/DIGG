<?php

    //$dbServerName = "localhost";
    //$dbUserName = "root";
    //$dbPassword = "";
    //$dbName = "DIGG_SIMS";

    $dbServerName = "studentmysql.miun.se";
    $dbUserName = "dane2200";
    $dbPassword = "hezron23";
    $dbName = "DIGG_SIMS";

    $conn = mysqli_connect($dbServerName, $dbUserName, $dbPassword, $dbName);

    //Check connection
    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
    }
    else{
        echo("Successfully connected");
    }

?>
