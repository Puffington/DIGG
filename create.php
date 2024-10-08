<!-- Header Section -->
<?php
include("includes/templates/header.php");
?>

<head>
    <script src="includes\functions.js"></script>
</head>

<style> 
.horizontal{
    background-color: aqua;
}
.horizontal nav{
    width: 30%;
    background-color: brown;
}
.scroller{
background-color: cadetblue;
overflow-y: auto;
width: 70%;
height: 30em;
margin: 5px;
padding: 5px;
row-gap: 2px;
}
.el{
    background-color: blue;
    padding:1em;
    height: 10em;
    width: 5em;
    margin:5px;
}
.category{
    background-color: bisque;
    margin: 5px;
}
.categoryArea{
    background-color: cornflowerblue;
}
</style>

<!-- Main Content -->
<main>
    <div class="breadcrums">
        <nav>
            <i class="fa-solid fa-house"></i>
            <a href="index.php">Förtroendemodellen</a>
            <i class="fa-solid fa-chevron-right"></i>
            <a href="#">Formuläret</a>
        </nav>
        <div class="headline">
            <h1>Förtroendemodellen</h1>
        </div>
        <div class="horizontal">
            <nav>
                <div class="category">first</div>
                <div class="category">second</div>
                <div class="category">third</div>
                <div class="category">fourth</div>
            </nav>
            <div class="scroller">
                <div class="categoryArea">
                    <button id="111" onclick="buttonClick()">try me</button>    
                    <button id="111" onclick="getQuestions()">questions me</button>    
                    <div class="el">element</div>
                    <div class="el">element</div>
                    <div class="el">element</div>
                    <div class="el">element</div>
                </div>
                <div class="el">element</div>
                <div class="el">element</div>
                <div class="el">element</div>
                <div class="el">element</div>
            </div>


        </div>
    </div>
</main>

<!-- Footer Section -->
<?php
include("includes/templates/footer.php");
?>