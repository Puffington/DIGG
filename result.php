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

        <!-- Navigation -->
        <nav>
            <i class="fa-solid fa-house"></i>&emsp;
            <a href="index.php">The Trust Model</a>&emsp;
            <i class="fa-solid fa-chevron-right"></i>&emsp;
            <a href="create.php">Form of the Trust Model</a>&emsp;
            <i class="fa-solid fa-chevron-right"></i>&emsp;
            <a href="#">Result</a>
        </nav>

        <div class="headline">
            <h1>The Trust Model: Results</h1>
        </div>

        <!-- Content -->
        <div class="horizontal" id="horizontal_result">

            <!-- Categories -->
            <nav id="formNav_result">
                <div class="category" id="cat1">General Information</div>
                <div class="category" id="cat2">Law and Justice</div>
                <div class="category" id="cat3">Security</div>
                <div class="category" id="cat4">Performance</div>
                <div class="category" id="cat5">Transparency</div>
            </nav>

            <!-- Left Side of the Result Page -->
            <div class="left_res" id="left_result">
                
                <!-- Info depending on the result -->
                <div class="cat_res">
                    <h2 id="resultText"></h2>
                    <p id="explanationText"></p>
                    <div id="suggestion"></div>
                    <div id="messageHolder"></div>
                </div>
                
                <!-- Options depending on the result -->
                <div id="option_buttons">
                    <button class='menuButton'>Download Answers</botton>
                </div>

                
            </div>

        </div>
    </div>
    
</main>

<!-- Footer Section -->
<?php
include("includes/templates/footer.php");
?>