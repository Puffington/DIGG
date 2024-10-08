<!DOCTYPE html>
<!-- Header Section -->
<?php
include("includes/templates/header.php");
?>

<head>
    <script src="includes\create_functions.js"></script>
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
.radioQuestion{
    background-color: chartreuse;
}
.dropdownQuestion{
    background-color:goldenrod;
}
.multiQuestions{
    background-color: burlywood;
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
                <div class="category" id="cat1" onclick="scroller(this)">Allmän Info</div>
                <div class="category" id="cat2" onclick="scroller(this)">Juridik & Etik</div>
                <div class="category" id="cat3" onclick="scroller(this)">Säkerhet</div>
                <div class="category" id="cat4" onclick="scroller(this)">Prestanda</div>
                <div class="category" id="cat5" onclick="scroller(this)">Transparens</div>
            </nav>
            <div class="scroller">
                <div class="categoryArea" id="cat1Area">
                    <button id="111" onclick="buttonClick()">try me</button>    
                    <button id="111" onclick="getQuestions()">show all questions</button>
                    <button id="111" onclick="builderOfElementsAddBlueprint()">question examples</button>
                </div>
                <div class="categoryArea" id="cat2Area">

                </div>
                <div class="categoryArea" id="cat3Area">
       
                </div>
                <div class="categoryArea" id="cat4Area"> 
            
                </div>
                <div class="categoryArea" id="cat5Area"> 
            
                </div>
            </div>


        </div>
    </div>
    <div id="examples"></div>
</main>

<!-- Footer Section -->
<?php
include("includes/templates/footer.php");
?>