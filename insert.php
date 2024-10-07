
<?php

    include("includes/connect.php");

    if($_SERVER["REQUEST_METHOD"] == "POST"){

        $org_nr = $_POST["org_nr"];
        $org_name = $_POST["org_name"];

        $sql_org = "INSERT INTO ORGANISATION (ORG_NR, NAME) VALUE ('$org_nr', '$org_name'";

        if (mysqli_query($conn, $sql_org)){
            $organisation_id = mysqli_insert_id($conn);

            $name = $_POST['name'].
            $url = $_POST['url'];
            $version = $_POST['version'];
            $stamp = $_POST['stamp'];

            $sql_ai = "INSERT INTO AI (ORGANISATION_ID, NAME, URL, VERSION, STAMP, CREATED_DATE, UPDATED_DATE) VALUES ('$organisation_id', '$name', '$url', '$version', '$stamp', NOW(), NOW())";

            if (mysqli_query($conn, $sql_ai)){

                echo "Data inserted.";

            }else{

                echo "Error: " . $sql_ai . "<br>" . mysqli_error($conn);
            }
        }else{
            echo "Error: " . $sql_org . "<br>" . mysqli_error($conn);
        }
    }

    mysqli_close($conn);
?>

