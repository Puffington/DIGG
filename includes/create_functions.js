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
// 


window.addEventListener('load', function () {
    output = {};
    AnswerMem = {};

    getQuestions(1)

    // Check if we enter "Test mode" or "Register mode"
    modes = JSON.parse(sessionStorage.getItem("mode"));
    console.log("mode is  " + modes);
    if (modes == "test") {
        document.getElementById('submitFormButton').setAttribute('onclick', 'submitAndTest()')
        document.getElementById("submitFormButton").value = "Submit";
    } else {
        document.getElementById('submitFormButton').setAttribute('onclick', 'submitAndSend()')
        document.getElementById("submitFormButton").value = "Submit and register";
    }

    // Linking objects
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
        threshold: 0.1,
    };

    const observer = new IntersectionObserver(changeCategories, options);

    target = document.querySelectorAll('.categoryArea')
    console.log(target)
    target.forEach(Object => {
        console.log(this)
        observer.observe(Object)
    });

    /**
     * Change colours depending on intersection amount
     * @param {*} entries the category
     * @param {*} observer the options
     */
    function changeCategories(entries, observer) {

        let intersectingEntry = null;  // To track the currently intersecting entry

        // Check all entries to see which one is intersecting
        entries.forEach((entry) => {
            entry.target.link.style.transition = "background-color 500ms linear";
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

/**
 * Behaviour of the button-categories when scrolling
 * @param {HTMLDivElement} CategoryButton 
 */
function scroller(CategoryButton) {
    CategoryButton.link.scrollIntoView({ behavior: "smooth", block: "start", inline: 'nearest' });
    //CategoryButton.parentNode.scrollTop = CategoryButton.offsetTop;
}

/**
 * Saving a question and the answer to 'addToMem'
 * @param {*} type type of question
 * @param {number} id the id of the question
 * @param {string} value the value of the question
 */
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

/**
 * Saving the input of question type: Number
 * @param {InputEvent} event the input of a user
 * @returns only true if the input contains digits and has the length less than 11 digits
 */
function checkIfNumber(event) {
    console.log("recieved " + event)
    if (event.target.value.length >= 10) {
        return false
    }
    if (isNaN(event.key) || event.key == " ") {
        console.log("NEIN, STAHP IT")
        return false;
    } else {
        addToMem("0", event.target.id, event.target.value + event.key)
        return true;
    }
}

/**
 * Saving the input of question type: Dropdown
 * @param {HTMLSelectElement} selector 
 */
function dropRevelio(selector) {
    if (selector.value) {
        selector.style.backgroundColor = '#6E615A';
        selector.style.border = '1px solid #6E615A';
        selector.style.color = '#FFFFFF';
    }
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

/**
 * Saving the input of question type: Multi
 * @param {HTMLButtonElement} select 
 */
function multiRevelio(select) {
    let parent = select.parentNode
    let boxes = parent.querySelectorAll("input[type=checkbox]")
    let stay = 0;

    boxes.forEach(object => {
        if (object.checked) {
            console.log("it is" + object.getAttribute('data-activate'))
            if (object.getAttribute('data-activate') == 1) {
                console.log("it is" + object.getAttribute('data-activate'))
                stay++
            }
        }
    })
    if (parent.dataset.linked != "") {
        if (stay >= 1) {
            document.getElementById(parent.getAttribute("data-linked")).hidden = false;
        } else {
            document.getElementById(parent.getAttribute("data-linked")).hidden = true;
        }
    }

    addToMem("3", parent.id, [select.value, boxes.length])
}


let lastClickedButton = null;
/**
 * Saving the input of question type: Bool
 * @param {*} button 
 */
function radioRevelio(button) {
    let parent = button.parentNode;
    parent = parent.parentNode;
    let linkedElement = document.getElementById(parent.getAttribute('data-linked'));

    if (lastClickedButton === button) {
        button.checked = false;
        lastClickedButton = null;
        if (linkedElement) {
            linkedElement.hidden = true;
        }
        addToMem("1", parent.id, null);
    } else {
        lastClickedButton = button;
        if (button.getAttribute('data-activate') == 1) {
            if (linkedElement) {
                linkedElement.hidden = false;
            }
        } else {
            if (linkedElement) {
                linkedElement.hidden = true;
            }
        }
        addToMem("1", parent.id, button.value);
    }
}

/**
 * Saving the input of question type: Text
 * @param {*} event 
 * @returns 
 */
function typing(event) {
    console.log("typing!!")
    console.log(event.target.dataset)
    addToMem(event.target.dataset.texttype, event.target.id, event.target.value + event.key)
    return true;
}

/**
 * Displays/hides additional information about the question
 * @param {*} thing the div that says "Show more information"
 */
function readmore(thing) {
    console.log("pressed");
    let textbox = thing.querySelector('p');
    let botton = thing.querySelector('button');

    console.log(textbox);
    if (textbox.hidden) {
        textbox.hidden = false;
        //botton.textContent = "Show less information";
    } else {
        textbox.hidden = true;
        //botton.textContent = "Show more information";
    }
}

/**
 * Generates html code for different types of questions (Number, Text, Bool, Multi, Dropdown)
 * @param {*} obj a question from the file question.json
 * @returns the html code for the specific type of question we want to print
 */
function builderOfElements(obj) {
    let htmltxt = "";
    var readmorediv = "<div onclick='readmore(this)'><button class='readmoreButton'> <i class='fa-solid fa-circle-info'></i> Show more information <i class='fa-solid fa-caret-down'></i> </button><p class='readmore' hidden='true' >" + obj.readmore + "</p></div>";
    switch ((obj.type).toLowerCase()) {
        // Number
        case "number":
            if (modes == "register") { // register mode
                htmltxt = "<div class='divtxtInput'> <p>" + "<span style='color:red;'>*</span>" + obj.id + ". " + obj.question + "</p>" +
                    readmorediv +
                    "<input type='number' name=" + obj.id + " onkeypress='return checkIfNumber(event)' /><div>";
            } else { // test mode
                htmltxt = "<div class='divtxtInput-test'> <p>" + obj.id + ". " + obj.question + "</p>" +
                    readmorediv +
                    "<input type='number' value='000' disabled name=" + obj.id + " onkeypress='return checkIfNumber(event)' value='Disabled'/><div>";
            }
            break;
        // Text
        case "text":
            if (modes == "register") { // register mode
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
                htmltxt = "<div class='divtxtInput'> <p>" + "<span style='color:red;'>*</span>" + obj.id + ". " + obj.question + "</p>" +
                    readmorediv + "<input type='text' maxlength=200' data-texttype=" + tempElement + " name=" + obj.id + " onkeypress='return typing(event)' /><div>";
            } else { // test mode
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
                htmltxt = "<div class='divtxtInput-test'> <p>" + obj.id + ". " + obj.question + "</p>" +
                    readmorediv + "<input type='text' disabled value='DISABLED' maxlength=200' data-texttype=" + tempElement + " name=" + obj.id + " onkeypress='return typing(event)' /><div>";
            }
            break;
        // Bool
        case "boolean":
            htmltxt = "<div class='radioQuestion' data-linked='" + obj.linked + "' id=" + obj.id + "><p>" + obj.id + ". " + obj.question + "</p>" +
                readmorediv +
                "<div class='yn-div'><input type='radio' id=" + obj.id + "Y" + " name=" + obj.id + " value='1' data-activate=" + obj.linkActivation[0] + " data-inex=1 onclick='radioRevelio(this)'>" + "<label for='" + obj.id + "Y' class='ynQ'>Yes</label></div>" +
                "<div class='yn-div'><input type='radio' id=" + obj.id + "N" + " name=" + obj.id + " value='0' data-activate=" + obj.linkActivation[1] + " data-inex=0 onclick='radioRevelio(this)'>" + "<label for='" + obj.id + "N' class='ynQ'>No&nbsp</label></div></div>";
            break;
        // Dropdown
        case "dropdown":
            htmltxt = "<div class='dropdownQuestion' id=" + obj.id + " data-linked=" + obj.linked + "> <label  for=" + obj.id + "><p>" + obj.id + ". " + obj.question + "</p></label> " +
                readmorediv +
                "<select name=" + obj.id + " onchange='dropRevelio(this)' >";  // Default option;
            obj.options.forEach((opti, index) => {
                htmltxt += "<option value=" + index + " data-activate=" + obj.linkActivation[index] + " >" + opti + "</option>";
            })
            htmltxt += "<option value='' hidden selected>Choose category</option></select></div>";
            break;
        // Multi
        case "multi":
            htmltxt = "<div class='multiQuestions' id='" + obj.id + "' data-linked='" + obj.linked + "'> <p>" + obj.id + ". " + obj.question + "</p>" +
                readmorediv;
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
    return htmltxt;
}

/**
 * 
 * @param {boolean} mode 1 is you want to show all the questions, or make the questions have functionality
 */
async function getQuestions(mode) {
    let resp = fetch("includes/questions.json");
    console.log(resp);
    if ((await resp).statusText != "OK") {
        console.log("error with getting JSON")
    }

    let obj = await (await resp).json(); //waiting for respons
    let invisimaker = [];

    obj.forEach(object => {
        if (object.linked != "") {
            invisimaker.push(object.linked)
        }
        cat = ("cat" + object.category + "Area")
        document.getElementById(cat).insertAdjacentHTML("beforeend", builderOfElements(object));
    });

    if (mode == "1") {
        console.log("INITIATING INVIBILITY")
        invisimaker.forEach(invisId => {
            //console.log("values are:" + invisId);
            document.getElementById(invisId).hidden = true;
            //document.getElementById(invisId).style.backgroundColor = "black";
        })
    }
    document.getElementById(cat).style.backgroundColor = "";
    console.log("you pressed correctly")
}

/**
 * If 'Test Mode' is chosen
 * @returns goes to the result page
 */
function submitAndTest() {
    console.log("weeey")
    output.answers = AnswerMem;
    sessionStorage.setItem('output', JSON.stringify(output));
    sessionStorage.setItem('dbID', "");
    window.location.href = "result.php"
}

/**
 * If 'Register Mode' is chosen
 * submitting and sending to the next page and database
 * @returns goes to the result page
 */
function submitAndSend() {

    let goodTogGo = true;

    if (!output.orgName || !output.aiName || !output.url || !output.orgnr) {
        goodTogGo = false; // change this value to remove the check
        alert("Fill in the mandantory (*) text fields at the top of the form. \n Copy pasting is not permitted")
    }else{
        //querySelector("input[type=text]")
        testing = document.getElementsByName("1");
        output.orgnr = testing[0].value;   
        
        if(output.orgnr.length > 10){
            alert("too long organisation number");
            goodTogGo = false;
        }
    }

    if (!goodTogGo) {
        return 0
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
            console.log("tempidär:" + temporaryID);
            allTheData = new URLSearchParams();

            allTheData.append('AI', "somevalue")
            //parameters.append("organisation","somevalue")
            allTheData.append('NAME', output.aiName)
            allTheData.append("ORGANISATION_ID", temporaryID)
            allTheData.append("URL", output.url)
            allTheData.append("VERSION", 1)
            allTheData.append("STAMP", 0)
            allTheData.append("CREATED_DATE", currentDate)
            allTheData.append("ANSWERS", JSON.stringify(output.answers))

            fetch('includes/db_functions.php', {
                method: 'POST', //or GET, your choice ---UPDATE
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: allTheData
            }).then(response => response.text()) //error handling from gpt, because of reasons
                .then(data => {
                    sessionStorage.setItem('dbID', JSON.stringify(data));
                    window.location.href = "result.php"
                })
                .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
}

