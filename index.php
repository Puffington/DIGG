
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
                    <h2>Läs mer om riktlinjer för AI</h2>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptate doloremque lantium, totam rem aperiam</p>
                    <button type="button" class="menuButton" onclick="location.href='guidelines.php';" >Riktlinjer</button>
                </div>
                <div class="card">
                    <h2>Se vårt register med AI's</h2>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptate doloremque lantium, totam rem aperiam</p>
                    <button type="button" class="menuButton" onclick="location.href='search.php';" >Register</button>
                </div>
                <div class="card">
                    <h2>Fyll i formuläret</h2>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptate doloremque lantium, totam rem aperiam</p>
                    <button type="button" class="menuButton" onclick="location.href='create.php';" >Formuläret</button>
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
