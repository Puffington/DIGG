

function buttonClick(){
    console.log("you reached me!!")
}

//"let" variables are thrown out the window when outside bounds
async function getQuestions() {
    let resp = fetch("includes/questions.json");
    console.log(resp);
    if((await resp).statusText != "OK"){
        console.log("error with getting JSON")
    }
    

    obj = (await resp).json();
    console.log(obj)
    console.log("you pressed correctly")
}
