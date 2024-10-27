//things to do
//make so that the fetch things happen first, and after they're done, then you can continue
//possibly change so that a specific amount of questions are answered. DUNNO

//  yellow if not answered all questions (being able to keep all questions in check)
//  (stamp questions) - have to be answered to continue
//  red if unnaceptable - what parts? 
//  high risk - requirements?
// dynamic questions- when to count them in to the calculations




/* 
RISK EXPLANATION

the general basis is that in the questions.json the "risk" category has a few options to input

it's a simple array pair, with the first being the mode, and the second being the quetion number

U = unacceptable
H = HIGH RISK   (makes the MODEL into HIGH RISK)
HX = FAIL if you are in HIGH RISK mode

EXAMPLES.
["u",1] = would put the ai into UNACCEPTABLE - if you answer the second answer, or YES

["H",2] = would put you into HIGH RISK MODE if you answer the third question 

["HX",0] = would fail the model if you are in HIGH RISK mode, and you answer the first question

real example
"question": "How is the data stored?",
        "category":"3",
        "type": "dropdown",
        "id": "19",
        "backgroundColor": "lightyellow",
        "linked":"",
        "linkActivation":["0","0","0"],
        "risk":[["u",1]],                    <---
        "stamp":"0",
        "readmore":"Data storage methods must comply with GDPR and the AI Act, ensuring security, transparency, and protection against unauthorized access or data breaches.",
        "options": ["Own servers",
        "we show it publicly, even though it is private data",
        "On the user's device",
        "We do not store any data",
        "None of the above"]

you would go into unacceptable risk if you answered "we show it publicly, even though it is private data""
*/

window.addEventListener('load', async function () {

    let questions = fetch("includes/questions.json");
    console.log(questions);
    if ((await questions).statusText != "OK") {
        console.log("error with getting JSON")
    }

    questions = await (await questions).json(); //waiting for respons
    let output = JSON.parse(sessionStorage.getItem('output'));
    let answers = output.answers
    let high = new Map();
    let unnaceptable = new Map();
    let stamp = [];

    let fail = false;

    //this part could be made more dynamically, but not necessary right now
    answerchecks = [[], [], [], [], []];
    links = []; //insert the id and in which category the thing is in

    for (let i = 0; i < questions.length; i++) {
        //questions.forEach(element => {
        let element = questions[i]
        if ("text" in element || element.type == "number" || links.some(a => a[0] === element.id)) { // don't count names/numbers and linked elements
        } else {
            answerchecks[element.category - 1].push(element.id);
        }
        if (element.stamp == "1") { //checking that all these have been answered
            stamp.push(element.id)
        }
        if (element.linked.length != 0) {
            links.push([element.linked, element.category])
        }

        if (element.risk.length > 0) { //pushing all possible risks into array variables
            //temporarily one question can only have one unacc or h
            let identification = element.id
            if (element.risk[0][0] == "u") {
                unnaceptable.set(identification, element.risk[0][1]);
            } else {
                high.set(identification, element.risk[0][1]);
            }
        }
    };

    answerMemory = structuredClone(answerchecks);

    console.log("hello world")
    console.log(answers)

    let HIGHRISK = [];
    let UNACCEPTABLE = [];

    //for (const key in OBJECT)

    for (const key in answers) {

        for (let thing in answerchecks) {  //checks all available answers, and if answered
            if (answerchecks[thing].includes(key)) {
                answerchecks[thing].splice(answerchecks[thing].indexOf(key), 1);
            }
        }
        console.log("key:" + key + " val:" + answers[key])


        let linkexistance = links.findIndex(sub => sub[0] == key);
        if (linkexistance !== -1) {
            answerMemory[links[linkexistance][1] - 1].push(links[linkexistance][0]) //add something to the category?
        }

        if (stamp.includes(key)) {
            stamp.splice(stamp.indexOf(key), 1);
        }

        if (high.has(key)) {
            console.log(answers[key][high.get(key)])
            if (answers[key].length == 1) {
                if (answers[key] == high.get(key)) {
                    console.log("HIGH RISK DETECTED!!!")
                    console.log("it has id:" + key)
                    HIGHRISK.push(key);
                }
            } else {

                if (answers[key][high.get(key)] == "1") {
                    console.log("HIGH RISK DETECTED!!!")
                    console.log("it has id:" + key)
                    HIGHRISK.push(key);
                }
            }
        }
        if (unnaceptable.has(key)) {
            if (answers[key].length == 1) {
                if (answers[key] == unnaceptable.get(key)) {
                    console.log("UNACC DETECTED!!!")
                    console.log("it has id:" + key)
                    UNACCEPTABLE.push(key)
                }
            } else {

                if (answers[key][unnaceptable.get(key)] == "1") {
                    console.log("UNACC DETECTED!!!")
                    console.log("it has id:" + key)
                    UNACCEPTABLE.push(key)
                }
            }
        }
    }

    //will now check what parts worked... or not

    let cats = ["cat1", "cat2", "cat3", "cat4", "cat5"];

    for (let i = 0; i < cats.length; i++) {
        //htmlTxt = "<div>" +answerMemory[i].length +" / "+ answerchecks[i].length +"</div>";
        htmlTxt = "<div class='nrAnsweredQ'>" + (answerMemory[i].length - answerchecks[i].length) + " out of " + answerMemory[i].length + " answered</div>"
        document.getElementById(cats[i]).insertAdjacentHTML("beforeend", htmlTxt);
    };

    console.log(stamp);
    console.log("THE STAMP LENGTH" + stamp.length);

    if (stamp.length != 0 || UNACCEPTABLE.length > 0) {
        this.document.getElementById("resultText").textContent = "YOUR AI HAS BEEN DENIED."//ALL STAMPS ARE NOT DONE, YE SHOITE
        this.document.getElementById("explanationText").textContent = "Your AI-system is not fulfilling all requirements." //Something more perhaps
        this.document.getElementById("suggestion").textContent = "Retake the test or go back to main."

        // Create a Home button element
        let buttonHome = document.createElement("button");
        buttonHome.textContent = "Go to Homepage";
        buttonHome.classList.add("menuButton");
        buttonHome.onclick = function () {
            window.location.href = "index.php";
        };
        document.getElementById("option_buttons").appendChild(buttonHome);

        // Create a Form button element
        let buttonForm = document.createElement("button");
        buttonForm.textContent = "Go back to The Form";
        buttonForm.classList.add("menuButton");
        buttonForm.onclick = function () {
            window.location.href = "create.php";
        };
        document.getElementById("option_buttons").appendChild(buttonForm);
    } else {
        this.document.getElementById("resultText").textContent = "YOUR AI HAS BEEN ACCEPTED!"//YE DID IT, GOOD ON YA!!
        this.document.getElementById("explanationText").textContent = "Your AI-system can be found in our record. Feel free to use our Stamp of Quality." //Something more perhaps
        //this.document.getElementById("suggestion").textContent = ""

        // Add an image
        let img = document.createElement("img");
        img.src = "images/stampel.png";
        img.width = 100;
        img.height = 120;
        document.getElementById("left_result").appendChild(img);

        let dbID = JSON.parse(sessionStorage.getItem('dbID'));

        var theRisk = "Low risk"; // NIKKI TESTAR
        if (HIGHRISK.length > 0) { // NIKKI TESTAR
            theRisk = "High risk"; // NIKKI TESTAR
        } // NIKKI TESTAR
        //updating stamp

        console.log("changing stamp " + dbID)

        allTheData = new URLSearchParams();
        allTheData.append("CHANGE", "AI")
        //parameters.append("organisation","somevalue")
        allTheData.append("ID", dbID) //works
        allTheData.append("VARIABLE", "CATEGORIES")
        allTheData.append("VALUE", theRisk)
        fetch('includes/db_functions.php', {
            method: 'POST', //or GET, your choice ---UPDATE
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: allTheData
        }).then(response => response.text()) //error handling from gpt, because of reasons
            .then(data => {
                console.log(data)
            })
            .catch(error => console.error('Error:', error));

        allTheData = new URLSearchParams();
        allTheData.append("CHANGE", "AI")
        //parameters.append("organisation","somevalue")
        allTheData.append("ID", dbID) //works
        allTheData.append("VARIABLE", "STAMP")
        allTheData.append("VALUE", "1")
        fetch('includes/db_functions.php', {
            method: 'POST', //or GET, your choice ---UPDATE
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: allTheData
        }).then(response => response.text()) //error handling from gpt, because of reasons
            .then(data => {
                console.log(data)
            })
            .catch(error => console.error('Error:', error));
    }

    console.log(answerchecks)

    if (HIGHRISK.length > 0) {
        //it is highrisk
        htmlTxt = "<div> This AI has been deemed high risk because of question ";

        for (val in HIGHRISK) {
            htmlTxt += HIGHRISK[val] + " ";
        }

        htmlTxt += "</div>";
        document.getElementById("messageHolder").insertAdjacentHTML("beforeend", htmlTxt);
    }
    if (UNACCEPTABLE.length > 0) {
        htmlTxt = "<div> This AI has been deemed AN UNACCEPTABLE RISK because of question ";
        for (val in UNACCEPTABLE) {
            htmlTxt += UNACCEPTABLE[val] + " ";
        }
        htmlTxt += "</div>";
        document.getElementById("messageHolder").insertAdjacentHTML("beforeend", htmlTxt);
    }

    //du måste skriva någonting
    //unnaceptable risk
    //high risk
    //low risk / transparency req / minimal risk
})

/**
 * Generates a pdf containing the answered questions and their answers
*/
async function pdfing() {
    let output = JSON.parse(sessionStorage.getItem('output'));
    let answers = output.answers
    allTheData = new URLSearchParams();
    allTheData.append("PDF", "test")
    //allTheData.append("QUESTIONS",await objQuestions)
    allTheData.append("ANSWERS", JSON.stringify(answers)) //not implemented
    //allTheData.append("CATEGORIES",JSON.stringify(output)) //not implemented

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
}


function qrCode() {
    console.log("hello")
    let leID = JSON.parse(sessionStorage.getItem("dbID"))
    console.log("THE ID IS");
    console.log(leID);
    //JSON.parse(sessionStorage.getItem('output'));
    htmlTxt = "<h3>Here is a qr code for your database ID</h3>"
    htmlTxt += "<img src='https://api.qrserver.com/v1/create-qr-code/?data=" + "http://195.26.252.179/DIGG/search.php?orgId=" + leID + "&amp;size=100x100' alt='' title='' />"
    document.getElementById("left_result").insertAdjacentHTML("beforeend", htmlTxt)
}
