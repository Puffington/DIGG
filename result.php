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
    padding: 10px;
    margin:2px;
}
</style>
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
            <h1>The Trust Model</h1>
        </div>
        <div class="horizontal">
            
            <h1></h1>


        </div>
    </div>
    
</main>

<!-- Footer Section -->
<?php
include("includes/templates/footer.php");
?>