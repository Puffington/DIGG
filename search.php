<!DOCTYPE html>
<!-- Header Section -->
<?php
include("includes/templates/header.php");
?>

<head>
    <script src="includes\search_functions.js"></script>
</head>

<!-- Main Content -->
<main>
    <div class="breadcrums">
        <nav>
            <a href="index.php"><i class="fa-solid fa-house"></i> </a>&emsp;
            <a href="index.php">The Trust Model</a>&emsp;
            <i class="fa-solid fa-chevron-right"></i>&emsp;
            <a href="#">Record</a>
        </nav>
        <div class="headline">
            <h1>Search for a Public Administration</h1>
        </div>
        <div class="horizontal">
            <div class="searchList">

                <!-- Search Bar -->
                <div class="search-container">
                    <input type="text" id="searchBar" class="search-input" placeholder="Search..." onkeyup="filterList()">
                </div>

                <!-- List of names -->
                <ul id="nameList">
                    <?php
                    require("includes/connect.php");
                    $database = new Connect("195.26.252.179", "digg2024", "diggsims24", "digg");
                    $database->connect();

                    $query = "SELECT * FROM Organisation";
                    $result = mysqli_query($database->getConnection(), $query);

                    // List all organizations
                    while ($row = mysqli_fetch_assoc($result)) {
                        echo "<li> <a href='?orgId=" . $row['ID'] . "'>" . $row['NAME'] . "</a></li>";
                    }
                    ?>
                </ul>
            </div>

            <div class="orgAIinfoList">
                <?php
                // Check if 'orgId' is present in the URL
                if (isset($_GET['orgId'])) {
                    $orgId = $_GET['orgId'];
                    $orgQuery = "SELECT * FROM Organisation WHERE ID = $orgId";

                    // Execute the query and fetch the organization name
                    $orgResult = mysqli_query($database->getConnection(), $orgQuery);
                    $orgName = mysqli_fetch_assoc($orgResult);

                    // Output the organization name
                    echo '<h2>' . $orgName['NAME'] . '</h2>';
                    echo "<h3>AI Systems:</h3>";

                    // Query to fetch AI systems for the organization
                    $query2 = "SELECT * FROM AI WHERE ORGANISATION_ID = $orgId";
                    $result2 = mysqli_query($database->getConnection(), $query2);
                    while ($ai = mysqli_fetch_assoc($result2)) {
                        if (!empty($ai)) {
                            echo "<ul id='aiList'><li>";
                            echo "<a class='aiList-a' onclick=\"toggleAiInfo('ai-" . $ai['ID'] . "')\">" . $ai['NAME'] . "</a>";
                            echo "<div id='ai-" . $ai['ID'] . "' class='ai-info' style='display:none;'>";
                            echo "<p>test" . $ai['ID'] . "</p>";
                            echo "<p>URL: <a href=" . $ai['URL'] . " target='_blank'>" . $ai['URL'] . "</a></p>";
                            echo "<p>Date: " . substr($ai['CREATED_DATE'], 0, -9) . "</p>";
                            echo "<button class='menuButton' onclick='pdfing(".$ai['ID'].")' >Download Answers</botton>";
                            echo "</div>";
                            echo "</li>";
                            echo "</ul>";
                        } else {
                            echo "<p>No AI systems found for this organization.</p>";
                        }
                    }
                } else {
                    echo "<p>Please select an organization from the list.</p>";
                }
                ?>

            </div>

        </div>
    </div>
</main>

<!-- Footer Section -->
<?php
include("includes/templates/footer.php");
?>