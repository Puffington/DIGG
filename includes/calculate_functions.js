window.addEventListener('load', function () {
    //linking objects

    let answers =JSON.parse(sessionStorage.getItem('output'));

    console.log("hello world")
    console.log(answers)

    Object.entries(answers).forEach(([key,val]) =>{
        console.log("key:"+key+"  val:"+val)
    })

    //du måste skriva någonting
    //unnaceptable risk
    //high risk
    //low risk


})
