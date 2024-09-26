<?php

    $dbServerName = "localhost";
    $dbUserName = "root";
    $dbPassword = "";
    $dbName = "DIGG";

    $conn = mysqli_connect($dbServerName, $dbUserName, $dbPassword, $dbName);

    //Check connection
    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
    }
    else{
        echo("Successfully connected");
    }

?>