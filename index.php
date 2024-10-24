

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
                <i class="fa-solid fa-house"></i>&emsp;
                <a href="index.php">The Trust Model</a>
            </nav>
            
            <div class="headline">
                <h1>Welcome to the Trust Model!</h1>
            </div>

            <div class="horizontal">
                <div class="card">
                    <h2>Read more about AI guidelines</h2>
                    <p>What does it mean to get the Stamp of Quality? What is meant by high and low risk?</p>
                    <button type="button" class="menuButton" onclick="location.href='guidelines.php';" >Guidelines</button>
                </div>
                <div class="card">
                    <h2>See our record of AI's</h2>
                    <p>We store all public administrations and their AI systems, read more about them here!</p>
                    <button type="button" class="menuButton" onclick="location.href='search.php';" >Our Record</button>
                </div>
                <div class="card">
                    <h2>Fill in the form</h2>
                    <p>When you have filled in our form, we will check if your AI is aligned with the AI Act and laws of AI, and you might be able to get the Stamp of Quality!</p>
                    <button type="button" class="menuButton" onclick="location.href='create.php';" >The Form</button>
                </div>
            </div>

            <div class="headline">
                <h1>What is the Trust Model?</h1>
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
