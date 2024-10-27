
/**
 * Filter the list of organizations with the searchbar
 */
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

/**
 * Creates and downloads a pdf containing all answers
 * @param {*} leID the id of an AI from the database
 */
async function pdfing(leID) {
    allTheData = new URLSearchParams();
    allTheData.append('GET', "somevalue")
    allTheData.append('TABLE', "AI")
    allTheData.append('VARIABLE', "ID")
    allTheData.append("VALUE", leID)

    fetch('includes/db_functions.php', {
        method: 'POST', //or GET, your choice ---UPDATE
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: allTheData
    }).then(response => response.text()) //error handling from gpt, because of reasons
        .then(data => {
            let AI = JSON.parse(data)
            allTheData = new URLSearchParams();
            allTheData.append("PDF", "test")
            allTheData.append("ANSWERS",AI[0]["ANSWERS"])

            fetch('../includes/pdf_functions.php', {
                method: 'POST', //or GET, your choice ---UPDATE
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: allTheData
            }).then(response => response.blob()) //error handling from gpt, because of reasons
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'AIPDF.pdf';  // Name of the downloaded file
                    document.body.appendChild(a);
                    a.click();  // Trigger the download
                    a.remove();
                    //console.log(blob)
                })
                .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
}

/**
 * Displaying the info about an AI when clicked on
 * @param {*} aiId 
 */
function toggleAiInfo(aiId) {
    var x = document.getElementById(aiId);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

