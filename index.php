
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
                <a href="index.php">Förtroendemodellen</a>
            </nav>
            <div class="headline">
                <h1>Förtroendemodellen</h1>
            </div>
            <div class="horizontal">
                <div class="card">
                    <h2>Riktlinjer</h2>
                    <button type="button" class="menuButton" onclick="location.href='guidelines.php';" >go to</button>
                </div>
                <div class="card">
                    <h2>Register</h2>
                    <button type="button" class="menuButton" onclick="location.href='search.php';" >go to</button>
                </div>
                <div class="card">
                    <h2>Formuläret</h2>
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
