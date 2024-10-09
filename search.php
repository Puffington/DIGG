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
            <i class="fa-solid fa-house"></i>
            <a href="index.php">The Trust Model</a>
            <i class="fa-solid fa-chevron-right"></i>
            <a href="#">Record</a>
        </nav>
        <div class="headline">
            <h1>Search for an AI</h1>
        </div>
        <div class="horizontal">
            <div class="searchList">

                <!-- Search Bar -->
                <div class="search-container">
                    <input type="text" id="searchBar" class="search-input" placeholder="Sök..." onkeyup="filterList()">
                </div>

                <!-- List of names -->
                <ul id="nameList">
                    <?php
                    // Prepare to fetch data from database, but for now, we'll use hardcoded data
                    // Example database query:
                    // $query = "SELECT name FROM users";
                    // $result = mysqli_query($conn, $query);
                    // while ($row = mysqli_fetch_assoc($result)) {
                    //     echo '<li>' . $row['name'] . '</li>';
                    // }

                    // HARD CODED
                    $organizations = [
                        ["id" => 1, "name" => "Skatteverket", "info" => "Skatteverket is the tax agency in Sweden."],
                        ["id" => 2, "name" => "Göteborgs komun", "info" => "Göteborgs komun is the municipality of Gothenburg."],
                        ["id" => 3, "name" => "Digg", "info" => "Digg is the Agency for Digital Government in Sweden."],
                        ["id" => 4, "name" => "Sundsvalls komun", "info" => "Sundsvalls komun is the municipality of Sundsvall."],
                        ["id" => 5, "name" => "Polisen", "info" => "Polisen is the national police force in Sweden."]
                    ];

                    foreach ($organizations as $org) {
                        echo "<li><a href='?orgId=" . $org['id'] . "'>" . $org['name'] . "</a></li>";
                    }
                    ?>
                </ul>
            </div>

            <div class="orgAIinfo-container">
                <?php
                // Check if 'orgId' is present in the URL
                if (isset($_GET['orgId'])) {
                    $orgId = $_GET['orgId'];

                    // Loop through organizations to find the matching one
                    foreach ($organizations as $org) {
                        if ($org['id'] == $orgId) {
                            echo "<h2>" . $org['name'] . "</h2>";
                            echo "<p>" . $org['info'] . "</p>";
                            break;
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