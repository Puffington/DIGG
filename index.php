<?php
    #include("includes/connect.php");
?>

<!DOCTYPE html>
<html lang="en">


<body>

    <!-- Header Section -->
    <?php
        include("includes/templates/header.php");
    ?>
    

    <!-- Main Content -->
    <main>
        <div class="breadcrums">
            <nav>
                <i class="fa-solid fa-house"></i>
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
