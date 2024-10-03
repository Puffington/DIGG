
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Typical Website Layout</title>
    <style>
        /* Basic reset to remove default margins and paddings */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }

        header {
            background-color: #333;
            color: #fff;
            padding: 10px 0;
            text-align: center;
        }

        header h1 {
            margin: 0;
        }

        nav {
            background-color: #444;
            padding: 10px;
        }

        nav ul {
            list-style-type: none;
            display: flex;
            justify-content: center;
        }

        nav ul li {
            margin: 0 15px;
        }

        nav ul li a {
            color: white;
            text-decoration: none;
            font-weight: bold;
        }

        main {
            display: flex;
            padding: 20px;
        }

        /* Main content */
        .content {
            flex: 3;
            padding: 20px;
        }

        /* Sidebar */
        .sidebar {
            flex: 1;
            background-color: #f4f4f4;
            padding: 20px;
            margin-left: 20px;
        }

        footer {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 10px;
            margin-top: 20px;
        }
    </style>
</head>
<body>

    <!-- Header Section -->
    <header>
        <h1>Welcome to Our Website</h1>
    </header>

    <!-- Navigation Bar -->
    <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav>

    <!-- Main Content and Sidebar -->
    <main>
        <div class="content">
            <h2>Main Content Area</h2>
            <p>This is where the main content of the page goes. You can add text, images, videos, or any other type of content here.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mollis lacus a velit pharetra, at tempus eros aliquam.</p>
        </div>

        <div class="sidebar">
            <h2>Sidebar</h2>
            <p>This is the sidebar where you can place additional content like links, advertisements, or other widgets.</p>
        </div>
    </main>

    <!-- Footer Section -->
    <footer>
        <p>&copy; 2024 Our Website | All rights reserved.</p>
    </footer>

</body>
</html>
