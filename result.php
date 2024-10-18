<!DOCTYPE html>
<!-- Header Section -->
<?php
include("includes/templates/header.php");
?>

<head>
    <script src="includes\create_functions.js"></script>
    <script src="includes\calculate_functions.js"></script>
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
            <nav id="formNav">
                <div class="category" id="cat1" onclick="scroller(this)">General Information</div>
                <div class="category" id="cat2" onclick="scroller(this)">Law and Justice</div>
                <div class="category" id="cat3" onclick="scroller(this)">Security</div>
                <div class="category" id="cat4" onclick="scroller(this)">Performance</div>
                <div class="category" id="cat5" onclick="scroller(this)">Transparancy</div>
            </nav>
            <div class="left_res">
                
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
    </div>
    
</main>

<!-- Footer Section -->
<?php
include("includes/templates/footer.php");
?>