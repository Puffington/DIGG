//Filter the list of organizations with the searchbar
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

//Displaying the info about an AI when clicked on
function toggleAiInfo(aiId) {
    var x = document.getElementById(aiId);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}