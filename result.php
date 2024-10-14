<!DOCTYPE html>
<!-- Header Section -->
<?php
include("includes/templates/header.php");
?>

<head>
    <script src="includes\create_functions.js"></script>
</head>


<!-- Main Content -->
<main>
    <div class="breadcrums">
        <nav>
            <i class="fa-solid fa-house"></i>
            <a href="index.php">The Trust Model</a>
            <i class="fa-solid fa-chevron-right"></i>
            <a href="create.php">Form of the Trust Model</a>
            <i class="fa-solid fa-chevron-right"></i>
            <a href="#">Result</a>
        </nav>
        <div class="headline">
            <h1>The Trust Model: Results</h1>
        </div>
        <div class="horizontal">
            
            <div class="cat_res">
                <h2>General Information</h2>
                <img src="images/handlike.png" width="50" height="60"> 
        
            </div>

            <div class="cat_res">
                <h2>Law of AI</h2>
                <img src="images/dislike.png" width="50" height="60">
            </div>

            <div class="cat_res">
                <h2>Security</h2>
                <img src="images/handlike.png" width="50" height="60">
            </div>

            <div class="cat_res">
                <h2>Performance</h2>
                <img src="images/dislike.png" width="50" height="60">
            </div>

            <div class="cat_res">
                <h2>Transparance</h2>
                <img src="images/handlike.png" width="50" height="60">
            </div>

            <div class="cat_res">
                <h2>Your AI is approved!</h2>
                <!-- if program.result = true 
                then print(congratulations heres your stamp)
                else print(denied)-->
                <img src="images/stampel.png" width="100" height="120">
            </div>

            <button class='menuButton'>Download Answers</botton>


        </div>
    </div>
    
</main>

<!-- Footer Section -->
<?php
include("includes/templates/footer.php");
?>