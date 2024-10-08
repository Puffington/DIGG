

function buttonClick(){
    console.log("you reached me!!")
}


async function getQuestions() {
    Responses = await fetch("includes\questions.json")
    console.log(JSON.stringify(Responses))
}
