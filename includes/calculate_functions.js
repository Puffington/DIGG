//things to do
//make so that the fetch things happen first, and after they're done, then you can continue
//possibly change so that a specific amount of questions are answered. DUNNO

//  yellow if not answered all questions (being able to keep all questions in check)
//  (stamp questions) - have to be answered to continue
//  red if unnaceptable - what parts? 
//  high risk - requirements?
//  

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

    //this part could be made more dynamically, but not necessary right now
    answerchecks = [[],[],[],[],[]];

    questions.forEach(element => {

        if("text" in element){
        }else{
            answerchecks[element.category -1].push(element.id);
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

    console.log("hello world")
    console.log(answers)

    if("orgName" in output){
        answerchecks
    }




    //for (const key in OBJECT)

    for(const key in answers) {
        answerchecks.forEach(element => {
            if(element.includes(key)){
                element.splice(element.indexOf(key),1)
            }
        })
       console.log("key:" + key + " val:" + answers[key])
        if(stamp.includes(key)){
            stamp.splice(stamp.indexOf(key),1);
        }

        if (high.has(key)) {
            console.log(answers[key][high.get(key)])
            if(answers[key].length == 1){
                if (answers[key] == high.get(key)) {
                    console.log("HIGH RISK DETECTED!!!")
                    console.log("it has id:" + key)
                }
            }else{
                
                if (answers[key][high.get(key)] == "1") {
                    console.log("HIGH RISK DETECTED!!!")
                    console.log("it has id:" + key)
                }
            }
        }
        if (unnaceptable.has(key)) {
            if(answers[key].length == 1){
                if (answers[key] == unnaceptable.get(key)) {
                    console.log("UNACC DETECTED!!!")
                    console.log("it has id:" + key)
                }
            }else{

                if (answers[key][unnaceptable.get(key)] == "1") {
                    console.log("UNACC DETECTED!!!")
                    console.log("it has id:" + key)
                }
            }
        }
    }

    if(stamp.length != 0){
        console.log("DIDNT answer important questions");
        console.log(stamp)
    }else{
        console.log("ALL IMPORTANT ANSWERS DONE");
    }

    console.log(answerchecks)

    //du måste skriva någonting
    //unnaceptable risk
    //high risk
    //low risk / transparency req / minimal risk
})
