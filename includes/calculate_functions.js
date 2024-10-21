//things to do
//make so that the fetch things happen first, and after they're done, then you can continue
//possibly change so that a specific amount of questions are answered. DUNNO

//  yellow if not answered all questions (being able to keep all questions in check)
//  (stamp questions) - have to be answered to continue
//  red if unnaceptable - what parts? 
//  high risk - requirements?
// dynamic questions- when to count them in to the calculations

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

    questions.forEach(element => {

        if ("text" in element || element.type == "number") { // don't count names and numbers
        } else {
            answerchecks[element.category - 1].push(element.id);
        }

        if (element.stamp == "1") { //checking that all these have been answered
            stamp.push(element.id)
        }
        if (element.risk.length > 0) { //pushing all possible risks into array variables
            console.log(element.risk.length) //temporarily one question can only have one unacc or h
            let identification = element.id

            if (element.risk[0][0] == "u") {
                unnaceptable.set(identification, element.risk[0][1]);
            } else {
                high.set(identification, element.risk[0][1]);
            }
        }
    });

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

    if (stamp.length != 0) {
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
        buttonForm.textContent = "Go to The From";
        buttonForm.classList.add("menuButton");
        buttonForm.onclick = function () {
            window.location.href = "create.php";
        };
        document.getElementById("option_buttons").appendChild(buttonForm);
    } else {
        this.document.getElementById("resultText").textContent = "YOUR AI HAS BEEN ACCEPTED!"//YE DID IT, GOOD ON YA!!
        this.document.getElementById("explanationText").textContent = "Now, your AI-system can be found in our record. Feel free to use our Stamp of Quality." //Something more perhaps
        //this.document.getElementById("suggestion").textContent = ""

        // Add an image
        let img = document.createElement("img");
        img.src = "images/stampel.png";
        img.width = 100;
        img.height = 120;
        document.getElementById("left_result").appendChild(img);
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


function qrCode(){
    console.log("hello")
    let leID = JSON.parse(sessionStorage.getItem("dbID"))
    console.log("THE ID IS");
    console.log(leID);
    //JSON.parse(sessionStorage.getItem('output'));
    htmlTxt = "<h3>Here is a qr code for your database ID</h3>"
    htmlTxt += "<img src='https://api.qrserver.com/v1/create-qr-code/?data="+ 6 +"&amp;size=100x100' alt='' title='' />"
    document.getElementById("left_result").insertAdjacentHTML("beforeend",htmlTxt)


    




}
