
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

            <div class="headline">
                <h1>Vad är förtroendemodellen?</h1>
            </div>

            <div  class="textTrustModel">
                <p>The trust model for artificial intelligence (AI) is a tool for self-evaluation of the use of AI by actors in the public sector. The model has several purposes. The main aim is to preserve, and even increase, the openness and transparency that exists within Swedish public administration. As a general rule, a completed trust model must be able to be shown to supervisory authorities and the interested public. In some cases, an actor is required to show that AI has been used. By using the trust model, you who want to use AI in your business also get increased security that rules and approaches that need to be taken into account when using AI are taken into account. Thus, the trust model can also serve the internal business development.</p>
            </div>

        </div>
    </main>

    <!-- Footer Section -->
    <?php
        include("includes/templates/footer.php");
    ?>

</body>
</html>
