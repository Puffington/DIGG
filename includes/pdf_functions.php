<?php

if(isset($_POST["PDF"])){
    echo("you got to the right area!!! hosam can code here");
    
    //QUESTIONS - has all the JSON questions, Parse them and then create pdf from them
    //ANSWERS - has all the answers from the form, in the form  of {ID,VALUE}, use  a  "for each" os similar to iterate through each answer
    //ex. having OBJECT.ID will give value you can even iterate through every ID from the questions if you want

    $ANSWERS = json_decode($_POST["ANSWERS"], true);
    $QUESTIONS = json_decode(file_get_contents("questions.json"),true);

    #echo("answers:  ". json_encode($ANSWERS)); // uncomment to see the structure of answers
    #echo("   questions:  ".json_encode($QUESTIONS)); //uncomment to see the structure of questions

    foreach ($ANSWERS as $key => $value) { //here we go through all answerss from the form
        if(is_array($value)){
            foreach($value as $option) // dropdown and multi answers are arrays, with a 1 for answered quetsion (example 0,1,0 would show that only the second question is selected)
            echo(" op ". $option);
        }else{
            echo( $key ." - ". $value . "   ");
        }
    }

    if ($QUESTIONS !== null && is_array($QUESTIONS)) { 
        foreach ($QUESTIONS as $object) {
            if(isset($object['id']))
            echo("id ".$object['id']);  // this is how you can access any variable in questions.json (currently only id since all questions have them)
        }
    } else {
        // Handle error (e.g., log, show error message)
        echo "Failed to decode JSON or no data available.";
    }
}


