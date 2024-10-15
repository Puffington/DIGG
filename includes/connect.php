<?php

    //$dbServerName = "localhost";
    //$dbUserName = "root";
    //$dbPassword = "";
    //$dbName = "DIGG_SIMS";

    $dbServerName = "https://6d88-92-33-209-195.ngrok-free.app/phpmyadmin";
    $dbUserName = "";
    $dbPassword = " ";
    $dbName = "digg";

    $conn = mysqli_connect($dbServerName, $dbUserName, $dbPassword, $dbName);

    //Check connection
    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
    }
    else{
        echo("Successfully connected");
    }

?>
