<?php

    //$dbServerName = "localhost";
    //$dbUserName = "root";
    //$dbPassword = "";
    //$dbName = "DIGG_SIMMS";

    $dbServerName = "studentmysql.miun.se";
    $dbUserName = "DIGG_SIMMS";
    $dbPassword = "hezron23";
    $dbName = "DIGG_SIMMS";

    $conn = mysqli_connect($dbServerName, $dbUserName, $dbPassword, $dbName);

    //Check connection
    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
    }
    else{
        echo("Successfully connected");
    }

?>
