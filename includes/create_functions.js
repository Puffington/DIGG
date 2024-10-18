//BUGS
//recursive hiding of elements
//going back when writing orgnr doesn't trigger event (should be prevented with having number maximum)
//can't see linked variables?

//IMPLEMENTATIONS
// output name - done
// output stuffs - done
// output AI  - done
// sometimes doesn't fill in the organisation_ID, it says it ha too long of a variable?
// being able to double check, if Organisation already exists, if it does, don't resend
// Question 5A: version? what type? (text/number)
// 26A utveckla...
// selected dropdown no answer?
// one question has how the data is stored, another is about data security measures, if you answer not vasing, then question is useless 

//Nikki
// unmark a yes/no answer
// 

window.addEventListener('load', function () {
    output = {};
    AnswerMem = {};

    getQuestions(1)

    //linking objects
    A1 = document.getElementById("cat1Area");
    A2 = document.getElementById("cat2Area");
    A3 = document.getElementById("cat3Area");
    A4 = document.getElementById("cat4Area");
    A5 = document.getElementById("cat5Area");

    cat1 = document.getElementById("cat1");
    cat2 = document.getElementById("cat2");
    cat3 = document.getElementById("cat3");
    cat4 = document.getElementById("cat4");
    cat5 = document.getElementById("cat5");

    A1.link = cat1;
    cat1.link = A1;
    A2.link = cat2;
    cat2.link = A2;
    A3.link = cat3;
    cat3.link = A3;
    A4.link = cat4;
    cat4.link = A4;
    A5.link = cat5;
    cat5.link = A5;

    const options = {
        root: document.querySelector('.scroller'),
        threshold: 0.1,  // At least 50% of the section needs to be visible
        //rootMargin: "0px 0px -90% 0px"
    };

    const observer = new IntersectionObserver(changeCategories, options);

    target = document.querySelectorAll('.categoryArea')
    console.log(target)
    target.forEach(Object => {
        console.log(this)
        observer.observe(Object)
    });

    //change colours depending on intersection amount
    function changeCategories(entries, observer) {
        
        let intersectingEntry = null;  // To track the currently intersecting entry

        // First, reset all category links to their default state
        document.querySelectorAll('.category').forEach((cat) => {
            cat.style.backgroundColor = "";
            cat.style.color = "";
        });
    
        // Check all entries to see which one is intersecting
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                intersectingEntry = entry;  // Store the intersecting entry

            }
            console.log(entry.target.id)
            console.log(entry)
        });
    
        // If we have an intersecting entry, apply the styles
        if (intersectingEntry) {
            intersectingEntry.target.link.style.backgroundColor = "#ffffff";
            intersectingEntry.target.link.style.color = "#6E615A";
            console.log("!!!!!",intersectingEntry);
        }
        else{
            console.log("fel");
        }
        
        /*/ First, reset all category links to their default state
        document.querySelectorAll('.category').forEach((cat) => {
            cat.style.backgroundColor = "";
            cat.style.color = "";
        });
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.link.style.backgroundColor = "#ffffff";
                entry.target.link.style.color = "#6E615A";
                console.log(entry.target.link)
            }
            else {
                entry.target.link.style.backgroundColor = "";
            }
            console.log(entry.target.id)
        })*/
    }
})


function scroller(CategoryButton) {
    CategoryButton.link.scrollIntoView({ behavior: "smooth", block: "center", inline: 'start' });
    //CategoryButton.parentNode.scrollTop = CategoryButton.offsetTop;
}

/// (type of question, the id of the question, the value of the question)
function addToMem(type, id, value) {
    console.log("addtomem:" + type + " " + id + " " + value)
    switch (type) {
        case "0":
            output.orgnr = value;
            break;
        case "1": //boolean
        case "2": //dropdowns
            AnswerMem[id] = value
            break;
        case "3": //multi value is divided into [index,maxArraySize]
            if (AnswerMem[id] == undefined) {
                AnswerMem[id] = Array(value[1]).fill(0)
            }
            console.log(AnswerMem[id])
            AnswerMem[id][value[0]] = +!AnswerMem[id][value[0]]
            console.log(AnswerMem[id])
            break;
        case "4": //ORG NAME
            output.orgName = value
            break;
        case "5": //AI NAME
            output.aiName = value
            break;
        case "6": //URL
            output.url = value
            break;

    }
    console.log("answermem: ")
    console.log(AnswerMem)
}

function checkIfNumber(event) {
    console.log("recieved " + event)

    if (event.target.value.length >= 10) {
        return false
    }

    if (isNaN(event.key) || event.key == " ") {
        console.log("NEIN, STAHP IT")
        return false;
    } else {
        //console.log("testing something: ")
        //console.log(event.target.value + event.key)
        addToMem("0", event.target.id, event.target.value + event.key)
        return true;
    }
}

function dropRevelio(selector) {
    //console.log(selector.linked)
    //console.log(selector)
    console.log(selector.parentNode)
    console.log(selector.getAttribute("data-linked"))
    let options = selector.options
    let element = document.getElementById(selector.parentNode.getAttribute("data-linked"))

    if (options[selector.value].dataset.activate == "1") {
        element.hidden = false;
    } else {
        if (element != null) {
            element.hidden = true;
        }
    }

    let arraaay = Array(options.length).fill(0);
    arraaay[selector.value] = 1

    addToMem("2", selector.parentNode.id, arraaay)
}

function multiRevelio(select) {
    let parent = select.parentNode
    let boxes = parent.querySelectorAll("input[type=checkbox]")
    let stay = 0;
    //console.log(parent)
    //console.log(boxes)
    //console.log(parent.getAttribute("data-linked"))

    boxes.forEach(object => {
        if (object.checked) {
            console.log("it is" + object.getAttribute('data-activate'))
            if (object.getAttribute('data-activate') == 1) {
                console.log("it is" + object.getAttribute('data-activate'))
                stay++
            }
        }
    })
    //console.log("stay is " + stay)
    if (stay >= 1) {
        document.getElementById(parent.getAttribute("data-linked")).hidden = false;
    } else {
        document.getElementById(parent.getAttribute("data-linked")).hidden = true;
    }
    addToMem("3", parent.id, [select.value, boxes.length])
}

function radioRevelio(button) {
    let parent = button.parentNode;
    let link = parent.getAttribute('data-linked');
    //console.log(parent.getAttribute('data-linked'))
    //console.log("link length: ", link.length)
    if (link.length != 0) {
        if (button.getAttribute('data-activate') == 1) {
            document.getElementById(parent.getAttribute('data-linked')).hidden = false;
        } else {
            document.getElementById(parent.getAttribute('data-linked')).hidden = true;
        }
    }
    addToMem("1", parent.id, button.value)
}

function typing(event) {
    //console.log(event.target.value)
    //print(event.target.)
    console.log("typing!!")
    console.log(event.target.dataset)
    addToMem(event.target.dataset.texttype, event.target.id, event.target.value + event.key)
    return true;
}

function buttonClick() {
    console.log("you reached me!!")
}
// create html element dynamically, or use show hide
//"let" variables are thrown out the window when outside bounds

function builderOfElementsAddBlueprint() {
    blueprint = {};
    blueprint.question = "number plz?"
    blueprint.type = "number"
    blueprint.id = "0"
    blueprint.linked = "3"
    blueprint.options = ["yes", "no"];
    document.getElementById("examples").insertAdjacentHTML("beforeend", builderOfElements(blueprint));

    blueprint.question = "do you have eyes?"
    blueprint.type = "boolean"
    blueprint.id = "1"
    blueprint.linked = "3"
    blueprint.options = ["yes", "no"];
    console.log("this is blueprint" + blueprint.question);
    document.getElementById("examples").insertAdjacentHTML("beforeend", builderOfElements(blueprint));

    blueprint.question = "how many eyes?"
    blueprint.type = "dropdown"
    blueprint.id = "2"
    blueprint.linked = "0"
    blueprint.options = ["seven", "thirteen", "zero"];
    console.log("this is blueprint" + blueprint.question);
    document.getElementById("examples").insertAdjacentHTML("beforeend", builderOfElements(blueprint));

    blueprint.question = "how many eyes?"
    blueprint.type = "multi"
    blueprint.id = "2"
    blueprint.linked = "0"
    blueprint.options = ["seven", "thirteen", "zero"];
    console.log("this is blueprint" + blueprint.question);
    document.getElementById("examples").insertAdjacentHTML("beforeend", builderOfElements(blueprint));
}

function builderOfElements(obj) {
    let htmltxt = "";
    let temp = "";
    if (obj.stamp == 1) {
        temp = "*";
    }

    switch ((obj.type).toLowerCase()) {
        // Number
        case "number":
            htmltxt = "<div class='divtxtInput'> <p>" + temp + obj.id + ". " + obj.question + "</p>  <input type='number' name=" + obj.id + " onkeypress='return checkIfNumber(event)' /><div>";
            break;

        // Text
        case "text":
            let tempElement;
            switch (obj.text.toLowerCase()) {
                case "url":
                    tempElement = "6"
                    break;
                case "ai":
                    tempElement = "5"
                    break;
                case "org":
                    tempElement = "4"
                    break;
                default:
                    tempElement = "1"
            }

            htmltxt = "<div class='divtxtInput'> <p>" + temp + obj.id + ". " + obj.question + "</p>  <input type='text' maxlength=200' data-texttype=" + tempElement + " name=" + obj.id + " onkeypress='return typing(event)' /><div>";

            break;

        // Bool
        case "boolean":
            htmltxt = "<div class='radioQuestion' data-linked='" + obj.linked + "' id=" + obj.id + "><p>" + temp + obj.id + ". " + obj.question + "</p>" +
                "<input type='radio' id=" + obj.id + "Y" + " name=" + obj.id + " value='1' data-activate=" + obj.linkActivation[0] + " data-inex=1 onclick='radioRevelio(this)'>" +
                "<label for='" + obj.id + "Y' class='ynQ'>Yes</label>" +
                "<input type='radio' id=" + obj.id + "N" + " name=" + obj.id + " value='0' data-activate=" + obj.linkActivation[1] + " data-inex=0  onclick='radioRevelio(this)' >" +
                "<label for='" + obj.id + "N' class='ynQ'>No</label></div>";
            break;

        // Dropdown
        case "dropdown":
            htmltxt = "<div class='dropdownQuestion' id=" + obj.id + " data-linked=" + obj.linked + "> <label  for=" + obj.id + "><p>" + temp + obj.id + ". " + obj.question + "</p></label> " +
                "<select name=" + obj.id + " onchange='dropRevelio(this)' >";  // Default option;
            obj.options.forEach((opti, index) => {
                htmltxt += "<option value=" + index + " data-activate=" + obj.linkActivation[index] + " >" + opti + "</option>";
            })
            htmltxt += "<option value='' hidden selected>Choose category</option></select></div>";
            break;

        // Multi
        case "multi":
            htmltxt = "<div class='multiQuestions' id='" + obj.id + "' data-linked='" + obj.linked + "'> <p>" + temp + obj.id + ". " + obj.question + "</p>";
            obj.options.forEach((opti, index) => {
                if (obj.linkActivation.length == 0) {
                    htmltxt += "<input type='checkbox' id='" + obj.id + index + "' name='" + opti + "' value='" + index + "' onclick='multiRevelio(this)' hidden>" +
                        "<label for='" + obj.id + index + "' class='button-like'>" + opti + "</label>";
                } else {
                    htmltxt += "<input type='checkbox' id='" + obj.id + index + "' name='" + opti + "' value='" + index + "' data-activate='" + obj.linkActivation[index] + "' onclick='multiRevelio(this)' hidden>" +
                        "<label for='" + obj.id + index + "' class='button-like'>" + opti + "</label>";
                }
            });
            htmltxt += "</div>";

            break;
        default:
            alert("question id" + obj.id + " has a wrong questions type")
            break;
    }
    //console.log("question:" + obj.question);
    return htmltxt;
}

function reveal() {

}

//mode is you want to show all the questions, or make the questions have functionality
async function getQuestions(mode) {
    let resp = fetch("includes/questions.json");
    console.log(resp);
    if ((await resp).statusText != "OK") {
        console.log("error with getting JSON")
    }

    let obj = await (await resp).json(); //waiting for respons
    //console.log(obj)
    let invisimaker = [];

    obj.forEach(object => {
        if (object.linked != "") {
            invisimaker.push(object.linked)
        }
        //console.log("uh")
        //console.log(object.category)
        cat = ("cat" + object.category + "Area")
        document.getElementById(cat).insertAdjacentHTML("beforeend", builderOfElements(object));
    });

    //console.log("invisi:" + invisimaker)
    //console.log("mode is" + mode)

    if (mode == "1") {
        console.log("INITIATING INVIBILITY")
        invisimaker.forEach(invisId => {
            //console.log("values are:" + invisId);
            document.getElementById(invisId).hidden = true;
            //document.getElementById(invisId).style.backgroundColor = "black";
        })
    }

    //different insertion methods
    //document.getElementById(cat).innerHTML += builderOfElements();
    document.getElementById(cat).style.backgroundColor = "";

    //document.getElementById(obj.category).append("<div>hello there</div>")
    console.log("you pressed correctly")
}

// submitting and sending to the next page
function submitAndSend() {

    output.answers = AnswerMem;
    let sender = document.getElementById("submit")

    console.log("SUBMITTING YOUR TEXT")

    let t = new Date();

    //this part is inefficient, but should work for now
    let currentDate = t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds()
    console.log(currentDate)

    console.log("orgid::" + output.orgnr)

    allTheData = new URLSearchParams();
    allTheData.append('AI', "somevalue")
    //parameters.append("organisation","somevalue")
    allTheData.append('NAME', output.aiName) //works
    allTheData.append("ORGANISATION_ID", output.orgnr) //works
    allTheData.append("URL", output.url) //works
    allTheData.append("VERSION", 1)
    allTheData.append("STAMP", 1)
    allTheData.append("CREATED_DATE", currentDate) //works
    allTheData.append("ANSWERS", JSON.stringify(output.answers)) //not implemented
    //allTheData.append("CATEGORIES",JSON.stringify(output)) //not implemented

    fetch('includes/db_functions.php', {
        method: 'POST', //or GET, your choice ---UPDATE
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: allTheData
    })

    /*.then(response => response.text()) //error handling from gpt, because of reasons
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
*/
    //sending to organisation
    allTheData = new URLSearchParams();
    allTheData.append("ORGANISATION", "")
    allTheData.append("ORGN_NR", output.orgnr)
    allTheData.append("NAME", output.orgName)

    fetch('includes/db_functions.php', {
        method: 'POST', //or GET, your choice
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: allTheData
    })
    /*.then(response => response.text()) //error handling from gpt, because of reasons
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));


    //
    allTheData = new URLSearchParams();
    allTheData.append("ID", 29)
    allTheData.append("VARIABLE", "URL")
    allTheData.append("VALUE", "THINGAMABOB")

    fetch('includes/db_functions.php', {
        method: 'UPDATE', //or GET, your choice
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: allTheData
    }).then(response => response.text()) //error handling from gpt, because of reasons
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
*/
    //sender.submit() //will send data inside to anoteher php file
    //console.log(JSON.stringify(output.answers))
    sessionStorage.setItem('output', JSON.stringify(output));
    window.location.href = "result.php"
}

