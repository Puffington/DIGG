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
            <a href="index.php"><i class="fa-solid fa-house"></i> </a>&emsp;
            <a href="index.php">The Trust Model</a>&emsp;
            <i class="fa-solid fa-chevron-right"></i>&emsp;
            <a href="#">Form of the Trust Model</a>
        </nav>
        <div class="headline">
            <h1>The Form of the Trust Model</h1>
        </div>
        <div class="horizontal">
            <nav id="formNav">
                <div class="category" id="cat1" onclick="scroller(this)">General Information</div>
                <div class="category" id="cat2" onclick="scroller(this)">Law and Justice</div>
                <div class="category" id="cat3" onclick="scroller(this)">Security</div>
                <div class="category" id="cat4" onclick="scroller(this)">Performance</div>
                <div class="category" id="cat5" onclick="scroller(this)">Transparency</div>
            </nav>
            <div class="scroller">
                <div class="categoryArea" id="cat1Area">
                    <h1>General Information</h1>
                </div>
                <div class="categoryArea" id="cat2Area">
                    <h1>Law and Justice</h1>
                </div>
                <div class="categoryArea" id="cat3Area">
                    <h1>Security</h1>
                </div>
                <div class="categoryArea" id="cat4Area">
                    <h1>Performance</h1>
                </div>
                <div class="categoryArea" id="cat5Area">
                    <h1>Transparancy</h1>
                </div>
                <input type="button" onclick="" class="menuButton" id="submitFormButton" value="Submit your answers!">
            </div>
        </div>
    </div>
</main>

<!-- Footer Section -->
<?php
include("includes/templates/footer.php");
?>