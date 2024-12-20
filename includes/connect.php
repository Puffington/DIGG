<?php
class Connect
{
    private $server = "195.26.252.179";
    private $username = "digg2024";
    private $password = "diggsims24";
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
        } else {
            //echo "Connection successfully established!";
        }
    }

    public function getConnection()
    {
        return $this->conn;
    }

    //$ID, $ORGANISATION_ID, $NAME, $URL, $VERSION, $STAMP, $CREATED_DATE
    public function insertIntoAiTable($ID, $ORGANISATION_ID, $NAME, $URL, $VERSION, $STAMP, $CREATED_DATE, $ANSWERS)
    {
        $sql = "INSERT INTO AI (ID, ORGANISATION_ID, NAME, URL, VERSION, STAMP, CREATED_DATE,ANSWERS) 
                    VALUES (?, ?, ?, ?, ?, ?, ?,?)";
        if ($stmt = $this->conn->prepare($sql)) {
            $stmt->bind_param("iissssss", $ID, $ORGANISATION_ID, $NAME, $URL, $VERSION, $STAMP, $CREATED_DATE, $ANSWERS);

            if ($stmt->execute()) {
                //echo "Data successfully inserted into AI table.";
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
        //check for duplicates first
        $check_sql = "SELECT ID FROM Organisation WHERE ORGN_NR = '$ORGN_NR'";
        $result = $this->conn->query($check_sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $currentID = $row['ID'];
            echo ($currentID);
            return $currentID;
        }

        $sql = "INSERT INTO Organisation (ID, ORGN_NR, NAME) 
                    VALUES (?, ?, ?)";
        if ($stmt = $this->conn->prepare($sql)) {
            $stmt->bind_param("iis", $ID, $ORGN_NR, $NAME);

            if ($stmt->execute()) {
                #echo "Data successfully inserted into Organisation table.";
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

    public function getSpecific($TABLE,$VARIABLE,$VALUE){
        $sql = "SELECT * FROM $TABLE WHERE $VARIABLE = $VALUE";
        $res = $this->conn->query($sql);
        $objects = [];

        if ($res->num_rows > 0) {
            
            while ($row = $res->fetch_assoc()){
                $objects[] = $row;
            }
            echo(json_encode($objects));
            return true;
        } else {
            echo "Error in the sql";
            return false;
        }
    }

    public function updateVariable($TABLE, $ID, $VARIABLE, $VALUE)
    {
        $temp = $VALUE;
        if(!is_int($VALUE)){
            $temp = "'$VALUE'";
        }

        $sql = "UPDATE $TABLE SET $VARIABLE = $temp WHERE ID = '$ID'";

        //"UPDATE `$TABLE` SET `$VARIABLE` = :value WHERE `id` = :id";
        $stmt = $this->conn->prepare($sql);
        if ($stmt->execute()) {
            return true;
        } else {
            echo "Error executing query: " . $stmt->error;
            return false;
        }
    }
}
