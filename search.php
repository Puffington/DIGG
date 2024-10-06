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
            <i class="fa-solid fa-chevron-right"></i>
            <a href="#">Register</a>
        </nav>
        <div class="headline">
            <h1>Sök efter en offentlig förvaltnings AI</h1>
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

                    // Hardcoded data for now
                    $names = ["Skatteverket", "Göteborgs komun", "Digg", "Sundsvalls komun", "Polisen"];
                    foreach ($names as $name) {
                        echo "<li><button onclick=\"chooseName('$name')\">" . $name . "</button></li>";
                    }
                    ?>
                </ul>

                <!-- Display the selected name -->
                <div class="selected-name" id="selectedName"></div>

                <!-- JavaScript to filter the list -->
                <script>
                    function filterList() {
                        let input = document.getElementById('searchBar').value.toLowerCase();
                        let listItems = document.getElementById('nameList').getElementsByTagName('li');

                        for (let i = 0; i < listItems.length; i++) {
                            let item = listItems[i].textContent || listItems[i].innerText;
                            if (item.toLowerCase().indexOf(input) > -1) {
                                listItems[i].style.display = "";
                            } else {
                                listItems[i].style.display = "none";
                            }
                        }
                    }

                    function chooseName(name) {
                        document.getElementById('selectedName').innerHTML = "You have chosen: " + name;
                    }
                </script>
            </div>
        </div>
    </div>
</main>

<!-- Footer Section -->
<?php
include("includes/templates/footer.php");
?>