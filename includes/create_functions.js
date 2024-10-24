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
// css yes/no button
// readmore button
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
        //root: document.querySelector('.scroller'),
        threshold: 0.1,
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

        // Check all entries to see which one is intersecting
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                intersectingEntry = entry;  // Store the intersecting entry
            } else {
                entry.target.link.style.backgroundColor = "";
                entry.target.link.style.color = "";
            }
        });

        // If we have an intersecting entry, apply the styles
        if (intersectingEntry) {
            intersectingEntry.target.link.style.backgroundColor = "#000000";
            intersectingEntry.target.link.style.color = "#FFFFFF";
        }
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


let lastClickedButton = null; // Track the last clicked button
function radioRevelio(button) {
    let parent = button.parentNode;
    let linkedElement = document.getElementById(parent.getAttribute('data-linked'));

    // If the same button is clicked again, deselect it
    if (lastClickedButton === button) {
        button.checked = false; // Deselect the radio button
        lastClickedButton = null; // Clear the tracking
        if (linkedElement) {
            linkedElement.hidden = true; // Hide linked element, if any
        }
        addToMem("1", parent.id, null); // Handle the case where no value is selected
    } else {
        // If a different button is clicked, proceed normally
        lastClickedButton = button;
        if (button.getAttribute('data-activate') == 1) {
            if (linkedElement) {
                linkedElement.hidden = false; // Show linked element
            }
        } else {
            if (linkedElement) {
                linkedElement.hidden = true; // Hide linked element
            }
        }
        addToMem("1", parent.id, button.value); // Track selected value
    }
}
/*ORIGINAL: function radioRevelio(button) {
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
}*/

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
    let mandantoryQ = "";
    if (obj.stamp == 1) {
        mandantoryQ = "<span style='color:red;'>*</span>";
    }

    switch ((obj.type).toLowerCase()) {
        // Number
        case "number":
            htmltxt = "<div class='divtxtInput'> <p>" + mandantoryQ + obj.id + ". " + obj.question + "</p>  <input type='number' name=" + obj.id + " onkeypress='return checkIfNumber(event)' /><div>";
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

            htmltxt = "<div class='divtxtInput'> <p>" + mandantoryQ + obj.id + ". " + obj.question + "</p>  <input type='text' maxlength=200' data-texttype=" + tempElement + " name=" + obj.id + " onkeypress='return typing(event)' /><div>";

            break;

        // Bool
        case "boolean":
            htmltxt = "<div class='radioQuestion' data-linked='" + obj.linked + "' id=" + obj.id + "><p>" + mandantoryQ + obj.id + ". " + obj.question + "</p>" +
                "<div><button class='readmoreButton' onclick='readmore(this)'>Read more</button><p class='readmore' hidden='true' >" + obj.readmore + "</p></div>" +
                
                "<div class='yn-div'><input type='radio' id=" + obj.id + "Y" + " name=" + obj.id + " value='1' data-activate=" + obj.linkActivation[0] + " data-inex=1 onclick='radioRevelio(this)'>" + "<label for='" + obj.id + "Y' class='ynQ'>Yes</label></div>" +
                "<div class='yn-div'><input type='radio' id=" + obj.id + "N" + " name=" + obj.id + " value='0' data-activate=" + obj.linkActivation[1] + " data-inex=0 onclick='radioRevelio(this)'>" + "<label for='" + obj.id + "N' class='ynQ'>No!</label></div></div>";
                
            break;

        // Dropdown
        case "dropdown":
            htmltxt = "<div class='dropdownQuestion' id=" + obj.id + " data-linked=" + obj.linked + "> <label  for=" + obj.id + "><p>" + mandantoryQ + obj.id + ". " + obj.question + "</p></label> " +
                "<div><button class='readmoreButton' onclick='readmore(this)'>Read more</button><p class='readmore' hidden='true' >" + obj.readmore + "</p></div>" +
                "<select name=" + obj.id + " onchange='dropRevelio(this)' >";  // Default option;
            obj.options.forEach((opti, index) => {
                htmltxt += "<option value=" + index + " data-activate=" + obj.linkActivation[index] + " >" + opti + "</option>";
            })
            htmltxt += "<option value='' hidden selected>Choose category</option></select></div>";
            break;

        // Multi
        case "multi":
            htmltxt = "<div class='multiQuestions' id='" + obj.id + "' data-linked='" + obj.linked + "'> <p>" + mandantoryQ + obj.id + ". " + obj.question + "</p>" +
                "<div><button class='readmoreButton' onclick='readmore(this)'>Read more</button><p class='readmore' hidden='true' >" + obj.readmore + "</p></div>";
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


function readmore(thing) {
    console.log("pressed");
    let parent = thing.parentNode;
    let textbox = parent.querySelector('p');

    console.log(textbox);
    if (textbox.hidden) {
        textbox.hidden = false;
        thing.textContent = "Read less";  
    } else {
        textbox.hidden = true;
        thing.textContent = "Read more";  
    }
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


async function pdfing() {
    allTheData = new URLSearchParams();
    allTheData.append("PDF", "test")
    //allTheData.append("QUESTIONS",await objQuestions)
    allTheData.append("ANSWERS", JSON.stringify(AnswerMem)) //not implemented
    //allTheData.append("CATEGORIES",JSON.stringify(output)) //not implemented

    console.log(AnswerMem)

    fetch('includes/pdf_functions.php', {
        method: 'POST', //or GET, your choice ---UPDATE
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: allTheData
    }).then(response => response.text()) //error handling from gpt, because of reasons
        .then(data => {
            console.log(data)
        })
        .catch(error => console.error('Error:', error));
}


// submitting and sending to the next page
function submitAndSend() {

    let goodTogGo = true;


    if(!output.orgName || !output.aiName || !output.url || !output.orgnr){
        goodTogGo = false; // change this value to remove the check

        if(!goodTogGo){
            alert("fill in all the text fields at the top of the form")
            return 0
        }
    }

    output.answers = AnswerMem;
    //let sender = document.getElementById("submit")

    let t = new Date();

    //this part is inefficient, but should work for now
    let currentDate = t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds()
    console.log(currentDate)
    console.log("orgid::" + output.orgnr)

    //sending to organisation
    allTheData = new URLSearchParams();
    allTheData.append("ORGANISATION", "")
    allTheData.append("ORGN_NR", output.orgnr)
    allTheData.append("NAME", output.orgName)

    let temporaryID;

    fetch('includes/db_functions.php', {
        method: 'POST', //or GET, your choice
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: allTheData
    }).then(response => response.text()) //error handling from gpt, because of reasons
        .then(data => {
            sessionStorage.setItem('output', JSON.stringify(output));
            //window.location.href = "result.php"
            console.log(data)
            temporaryID = data;
            allTheData = new URLSearchParams();

            allTheData.append('AI', "somevalue")
            //parameters.append("organisation","somevalue")
            allTheData.append('NAME', output.aiName) //works
            allTheData.append("ORGANISATION_ID", temporaryID) //works

            console.log("tempidär:" + temporaryID);
            sessionStorage.setItem('dbID', JSON.stringify(structuredClone(temporaryID)));

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
            }).then(response => response.text()) //error handling from gpt, because of reasons
                .then(data => {

                    window.location.href = "result.php"
                    //console.log(data)
                })
                .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));

    /*
    allTheData = new URLSearchParams();
    allTheData.append("ID", "")
    allTheData.append("VARIABLE", "URL")
    allTheData.append("VALUE", "THINGAMABOB")

    fetch('includes/db_functions.php', {
        method: 'UPDATE', //or GET, your choice
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: allTheData
    }).then(response => response.text()) //error handling from gpt, because of reasons
        .then(data => {
            console.log("orgdata:"+data)
            sessionStorage.setItem('output', JSON.stringify(output));
            //window.location.href = "result.php"
        })
        .catch(error => console.error('Error:', error));
*/
    //sender.submit() //will send data inside to anoteher php file
    //console.log(JSON.stringify(output.answers))


}

