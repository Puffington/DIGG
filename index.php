<?php
    #include("includes/connect.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" type="text/css" href="css/style.css"> <!-- external css, a general css theme from the "style.css" -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Digg Förtroendemodellen</title>

    
</head>

<body>

    <!-- Header Section -->
    <?php
        include("includes/templates/header.php");
    ?>
    

    <!-- Main Content and Sidebar -->
    <main>
        <div class="theMainDiv">
            <nav>
                <i class="fa-light fa-house"></i>
                <a href="#">Förtroendemodellen</a>
            </nav>
            <div class="headline">
                <h1>Förtroendemodellen</h1>
            </div>
            <div class="horizontal">
                <div class="card">
                    <h2>guidelines</h2>
                    <button type="button" class="menuButton" onclick="location.href='guidelines.php';" >go to</button>
                </div>
                <div class="card">
                    <h2>search form</h2>
                    <button type="button" class="menuButton" onclick="location.href='search.php';" >go to</button>
                </div>
                <div class="card">
                    <h2>Create form</h2>
                    <button type="button" class="menuButton" onclick="location.href='create.php';" >go to</button>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer Section -->
    <?php
        include("includes/templates/footer.php");
    ?>

</body>
</html>
