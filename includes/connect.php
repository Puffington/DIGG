<?php
class Connect
{
    private $server = "localhost";
    private $username = "root";
    private $password = "";
    private $database_name = "digg";
    private $conn;

    public function __construct($server, $username, $password, $database_name)
    {
        $this->server = $server;
        $this->username = $username;
        $this->password = $password;
        $this->database_name = $database_name;
    }
    public function connect()
    {
        $this->conn = new mysqli($this->server, $this->username, $this->password, $this->database_name);

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function getConnection()
    {
        return $this->conn;
    }

    //$ID, $ORGANISATION_ID, $NAME, $URL, $VERSION, $STAMP, $CREATED_DATE
    public function insertIntoAiTable($ID, $ORGANISATION_ID, $NAME, $URL, $VERSION, $STAMP, $CREATED_DATE,$ANSWERS)
    {
        $sql = "INSERT INTO AI (ID, ORGANISATION_ID, NAME, URL, VERSION, STAMP, CREATED_DATE,ANSWERS) 
                    VALUES (?, ?, ?, ?, ?, ?, ?,?)";
        if ($stmt = $this->conn->prepare($sql)) {
            $stmt->bind_param("iissssss", $ID, $ORGANISATION_ID, $NAME, $URL, $VERSION, $STAMP, $CREATED_DATE,$ANSWERS);
            
            if ($stmt->execute()) {
                echo "Data successfully inserted into AI table.";
                $new_id = $this->conn->insert_id;
                echo $new_id;
                return true;
            } else {
                echo "Error executing query: " . $stmt->error;
                return false;
            }
        } else {
            echo "Error preparing statement: " . $this->conn->error;
            return false;
        }
    }
    public function insertIntoOrganisationTable($ID, $ORGN_NR, $NAME)
    {
        $sql = "INSERT INTO Organisation (ID, ORGN_NR, NAME) 
                    VALUES (?, ?, ?)";
        if ($stmt = $this->conn->prepare($sql)) {
            $stmt->bind_param("iis", $ID, $ORGN_NR, $NAME);

            if ($stmt->execute()) {
                echo "Data successfully inserted into Organisation table.";
                return true;
            } else {
                echo "Error executing query: " . $stmt->error;
                return false;
            }
        } else {
            echo "Error preparing statement: " . $this->conn->error;
            return false;
        }
    }
}
?>


