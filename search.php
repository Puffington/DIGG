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
            <h1>Search for an public administration</h1>
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
                    // Prepare to fetch data from database, but for now, we'll use hardcoded data
                    // Example database query:
                    // $query = "SELECT name FROM users";
                    // $result = mysqli_query($conn, $query);
                    // while ($row = mysqli_fetch_assoc($result)) {
                    //     echo '<li>' . $row['name'] . '</li>';
                    // }

                    // Load the JSON file
                    $json_data = file_get_contents('includes/nikki.json'); // Replace with the actual path to your JSON file
                    $data = json_decode($json_data, true);

                    // Fetch organizations from JSON file
                    $organizations = $data['organizations'];
                    
                    // Loop through the organizations and display them as a list
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

                    foreach ($organizations as $org) {
                        if ($org['id'] == $orgId) {
                            echo "<h2>" . $org['name'] . "</h2>";
                            echo "<p>" . $org['name'] . " is selected.</p>";
        
                            // Fetch the associated AIs from the JSON data
                            $ais = $data['ais'];
                            $aiList = array_filter($ais, function ($ai) use ($orgId) {
                                return $ai['orgId'] == $orgId;
                            });
        
                            // Display the AI systems
                            if (!empty($aiList)) {
                                echo "<h3>AI Systems:</h3><ul>";
                                foreach ($aiList as $ai) {
                                    echo "<li>" . $ai['name'] . "</li>";
                                }
                                echo "</ul>";
                            } else {
                                echo "<p>No AI systems found for this organization.</p>";
                            }
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