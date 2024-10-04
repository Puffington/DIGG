<?php
    #include("includes/connect.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" type="text/css" href="css/style.css"> <!-- external css, a general css theme from the "style.css" -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Digg Förtroendemodellen</title>
</head>

<body>

    <!-- Header Section -->
    <?php
        include("templates/header.php");
    ?>

    
    
    <a href="test.php">you can also press me, though i'm techincally not a button</a>
    
    <div onclick="location.href='test.php';" style="background-color:darksalmon;">or try me, i äm a div</div>

    

    <!-- Main Content and Sidebar -->
    <main>
        <div class="horizontal">
            <div class="card">
                <h2>guidelines</h2>
                <button type="button" class="menuButton" onclick="location.href='test.php';" >go to</button>
            </div>
            <div class="card">
                <h2>search form</h2>
                <button type="button" class="menuButton" onclick="location.href='test.php';" >go to</button>
            </div>
            <div class="card">
                <h2>Create form</h2>
                <button type="button" class="menuButton" onclick="location.href='test.php';" >go to</button>
            </div>
        </div>
        

        <!--
        <div class="content">
            <h2>Main Content Area</h2>
            <p>This is where the main content of the page goes. You can add text, images, videos, or any other type of content here.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mollis lacus a velit pharetra, at tempus eros aliquam.</p>
        </div>

        <div class="sidebar">
            <h2>Sidebar</h2>
            <p>This is the sidebar where you can place additional content like links, advertisements, or other widgets.</p>
        </div>-->
    </main>

    <!-- Footer Section -->
    <?php
        include("templates/footer.php");
    ?>

</body>
</html>
