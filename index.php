<!DOCTYPE html>
<html lang="en">

<script>
function toFOrm(abc){
    if(abc){
        sessionStorage.setItem('mode', JSON.stringify("test"));
        window.location.href = "create.php"
    }else{
        sessionStorage.setItem('mode', JSON.stringify("register"));
        window.location.href = "create.php"
    }
}
</script>

<body>
    <!-- Header Section -->
    <?php
        include("includes/templates/header.php");
    ?>
    
    <!-- Main Content -->
    <main>
        <div class="breadcrums">
            <nav>
                <a href="index.php"><i class="fa-solid fa-house"></i> </a>&emsp;
                <a href="index.php">The Trust Model</a>
            </nav>
            
            <div class="headline">
                <h1>Welcome to the Trust Model!</h1>
            </div>

            <div class="horizontal">
                <div class="card">
                    <h2>Learn About AI Guidelines</h2>
                    <p>What does it mean to receive the Stamp of Quality? Discover the distinctions between high-risk and low-risk AI systems.</p>
                    <button type="button" class="menuButton" onclick="location.href='guidelines.php';" >Guidelines</button>
                </div>
                <div class="card">
                    <h2>Explore Our AI Registry</h2>
                    <p>We maintain a comprehensive record of public administrations and their AI systems. Click here to learn more!</p>
                    <button type="button" class="menuButton" onclick="location.href='search.php';" >Our Record</button>
                </div>
                <div class="card">
                    <h2>Complete the Form</h2>
                    <p>After submitting our form, we’ll assess your AI’s compliance with the AI Act and relevant laws. You may be eligible for the Stamp of Quality!</p>
                    <button type="button" class="menuButton" onclick="toFOrm(0)"  >Register your AI</button>
                    <button type="button" class="menuButton" onclick="toFOrm(1)" >Test the Form</button>
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
