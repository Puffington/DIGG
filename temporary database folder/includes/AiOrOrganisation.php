<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');


if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (isset($_POST["AI"])) {
      header("Location: ./Ai.php");
      exit(); 
  } elseif (isset($_POST["Organisation"])) {
      header("Location: ./Organisation.php");
      exit(); 
  }
}







?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css" />
    <title>Ai Or Organisation</title>


</head>
<body>

    <nav>
      <ul class="nav-elements">
     
        <li><a href="../index.php" class="btn nav-link">Home</a></li>
         <li><a href="contact.php" class="btn nav-link">Ai Or Organisation</a></li>
      </ul>
    </nav>
  


    

    <section class="custom-box">
        <form class="Ai-Or-Organisation" action="" method="post">
            <h2>Ai Or Organisation</h2>
            <button class="AI" name="AI">AI</button>
            <button class="Organisation" name="Organisation">Organisation</button>
        </form>
    </section>




 

</body>

</html>




<?php

?>