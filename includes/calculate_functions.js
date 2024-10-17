window.addEventListener('load',async function () {
    //linking objects

    let questions = fetch("includes/questions.json");
    console.log(questions);
    if ((await questions).statusText != "OK") {
        console.log("error with getting JSON")
    }

    let obj = await (await resp).json(); //waiting for respons
    let answers =JSON.parse(sessionStorage.getItem('output'));

    
    let high = new Map();
    let unnaceptable = new Map();
    let stamp = [];

    questions.array.forEach(element => {
        if(element.stamp == "1"){ //checking that all these have been answered
            high.push(element.id)
        }

        if(element.risk.length > 0){ //pushing all possible risks into array variables
            element.risk.length.forEach(([key,val]) =>{
                let identification = element.id
                if(key=="u"){
                    unnaceptable.set(identification,val);
                }else{
                    high.set(identification,val);
                }
            })
        }        
    });

    

    console.log("hello world")
    console.log(answers)

    Object.entries(answers).forEach(([ind,val]) =>{
        console.log("key:"+ind+" val:"+val)

        if(high.has(ind)){
            if(val == high.get(ind)){
                console.log("HIGH RISK DETECTED!!!")
                console.log("it has id:"+ind)
            }
        }
        if(unnaceptable.has(ind)){
            if(val == unnaceptable.get(ind)){
                console.log("UNACCEPTABLE DETECTED!!!")
                console.log("it has id:"+ind)
            }
        }
    })

    //du måste skriva någonting
    //unnaceptable risk
    //high risk

    //low risk / transparency req / minimal risk
})
