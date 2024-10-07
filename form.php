<?php

    include("includes/templates/header.php");

?>

<body>
    <h1>Form</h1>
    <form action="insert.php" method="POST">

        <h3>Organisation</h3>
        <label for="org_nr">Organisationsnummer:</label>
        <input type="text" id="org_nr" name="org_nr" placeholder="Organisation number" required><br>

        <label for="org_name">Organisationsnamn:</label>
        <input type="text" id="org_name" name="org_name" placeholder="Organisation name"required><br>

        <h3>AI-information</h3>
        <label for="name">Namn:</label>
        <input type="text" id="name" name="name" placeholder="AI name"required><br>

        <label for="url">URL:</label>
        <input type="text" id="url" name="url" placeholder="AI url"required><br>

        <label for="version">Version:</label>

        <label for="stamp">Stamp(0 eller 1):</label>
        <input type="number" id="stamp" name="stamp" min="0" max="1"required><br>

        <input type="submit" value="Submit">
    </form>

    <?php

    include("includes/templates/footer.php");

?>
</body>
</html>

