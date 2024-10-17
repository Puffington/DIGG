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
            <a href="#">Form of the Trust Model</a>
        </nav>
        <div class="headline">
            <h1>The Form of the Trust Model</h1>
        </div>
        <div class="horizontal">
            <nav id="formNav">
                <div class="category" id="cat1" onclick="scroller(this)">Allmän Info</div>
                <div class="category" id="cat2" onclick="scroller(this)">Juridik & Etik</div>
                <div class="category" id="cat3" onclick="scroller(this)">Säkerhet</div>
                <div class="category" id="cat4" onclick="scroller(this)">Prestanda</div>
                <div class="category" id="cat5" onclick="scroller(this)">Transparens</div>
            </nav>
            <div class="scroller">
                <div class="categoryArea" id="cat1Area">
                
                </div>
                <div class="categoryArea" id="cat2Area">

                </div>
                <div class="categoryArea" id="cat3Area">

                </div>
                <div class="categoryArea" id="cat4Area">

                </div>
                <div class="categoryArea" id="cat5Area">

                </div> <!--  action="result.php" -->
                <form type="hidden" onclick="submitAndSend(this)">
                    <input type="button" class="submitFormButton" value="Submit">
                </form>
            </div>
        </div>

    </div>
    <div id="examples"></div>
</main>

<!-- Footer Section -->
<?php
include("includes/templates/footer.php");
?>