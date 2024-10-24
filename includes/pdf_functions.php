<?php
if(isset($_POST["PDF"])){
    //require('../fpdf186/fpdf.php');
    require('../includes/fpdf186/fpdf.php'); 

    $ANSWERS = json_decode($_POST["ANSWERS"], true);
    $QUESTIONS = json_decode(file_get_contents("questions.json"),true);

    $pdf = new FPDF();
    $pdf->AddPage();

    $pdf->SetFont('Arial', 'B', 16);

    $pdf->Cell(0, 10, 'Trust Model Submission');
    $pdf->Ln(20);

    if ($ANSWERS !== null && is_array($ANSWERS) && $QUESTIONS !== null && is_array($QUESTIONS)) {
        foreach ($ANSWERS as $key => $value) {
            foreach ($QUESTIONS as $question) {
                if (isset($question['id']) && $question['id'] == $key) {
                    $pdf->SetFont('Arial', 'B', 12);
                    $pdf->Cell(0, 10, "Question: " . $question['id']);
                    $pdf->Ln();

                    $pdf->SetFont('Arial', '', 12);
                    if (is_array($value)) {
                        foreach ($value as $option) {
                            $pdf->Cell(0, 10, "Answer: " . $option);
                            $pdf->Ln();
                        }
                    } else {
                        $pdf->Cell(0, 10, "Answer: " . $value);
                        $pdf->Ln();
                    }
                }
            }
        }
    } else {
        echo "Failed to decode JSON or no data available.";
    }

    //$pdf->Output('D', 'Trust_Model_Submission.pdf');
    $pdf->Output();
}


