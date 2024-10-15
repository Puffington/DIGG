//known bugs that i should clear up in the future
//recursive hiding of elements
//going back when writing orgnr doesn't trigger event (should be prevented with having number maximum)

window.addEventListener('load', function () {
    output ={};
    AnswerMem={};

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
        rootMargin: "0px",
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
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                let test = entry.target.link.style.backgroundColor = "blue";
                console.log(entry.target.link)
            }
            else {
                entry.target.link.style.backgroundColor = "brown";
            }
            console.log(entry.target.id)
        })
    }
})


function scroller(CategoryButton) {
    CategoryButton.link.scrollIntoView({ behavior: "smooth", block: "center", inline: 'start' });
    //CategoryButton.parentNode.scrollTop = CategoryButton.offsetTop;
}

/// (type of question, the id of the question, the value of the question)
function addToMem(type,id,value){
    console.log("addtomem:"+type+ " "+id+ " "+value)
    switch(type){
        case"0":
            output.orgnr = value;
            break;
        case "1": //boolean
        case "2": //dropdowns
            AnswerMem[id] = value 
            break;
        case "3": //multi value is divided into [index,maxArraySize]
            if (AnswerMem[id] == undefined){
                AnswerMem[id] = Array(value[1]).fill(0)
            }
            console.log(AnswerMem[id])
            AnswerMem[id][value[0]] = +!AnswerMem[id][value[0]]
            console.log(AnswerMem[id])
            break;
        case "4": //text
            output.name = value
            break;
    }
    console.log("answermem: ")
    console.log(AnswerMem)
}

function checkIfNumber(event) {
    console.log("recieved " + event)

    if(event.target.value.length >= 10){
        return false
    }
    if (isNaN(event.key) || event.key == " ") {
        console.log("NEIN, STAHP IT")
        return false;
    } else {
        console.log("testing something: ")
        console.log(event.target.value+ event.key)
        addToMem("0",event.target.id,event.target.value+event.key)
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
        element.hidden = true;
    }

    let arraaay = Array(options.length).fill(0);
    arraaay[selector.value] = 1

    addToMem("2",selector.parentNode.id,arraaay)
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

    addToMem("3",parent.id,[select.value,boxes.length])
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
    addToMem("1",parent.id,button.value)
}

function typing(event){
    //console.log(event.target.value)
    addToMem("4",event.target.id,event.target.value + event.key)
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
    switch ((obj.type).toLowerCase()) {
        case "number":
            htmltxt = "<div> <p>" + obj.question + "</p>  <input type='number' name=" + obj.id + " onkeypress='return checkIfNumber(event)' /><div>";
            break;
            
        case "text":
            htmltxt = "<div> <p>" + obj.question + "</p>  <input type='text' maxlength='100' name=" + obj.id + " onkeypress='return typing(event)' /><div>";

        break;
        case "boolean":
            htmltxt = "<div class='radioQuestion' data-linked='" + obj.linked + "' id=" + obj.id + "><p>" + obj.question + "</p>" +
                "<input type='radio' id=" + obj.id + "Y" + " name=" + obj.id + " value='1' data-activate=" + obj.linkActivation[0] + " data-inex=1 onclick='radioRevelio(this)' >" +
                "<label for='html'>YES</label>" +
                "<input type='radio' id=" + obj.id + "N" + " name=" + obj.id + " value='0' data-activate=" + obj.linkActivation[1] + " data-inex=0  onclick='radioRevelio(this)' >" +
                "<label for='html'>NO</label><br></br></div>"
            break;
        case "dropdown":
            htmltxt = "<div class='dropdownQuestion' id=" + obj.id + " data-linked=" + obj.linked + "> <label  for=" + obj.id + ">" + obj.question + "</label> " +
                "<select name=" + obj.id + " onchange='dropRevelio(this)' >";
            obj.options.forEach((opti, index) => {
                htmltxt += "<option value="+index+" data-activate="+obj.linkActivation[index]+" >" + opti + "</option>";
            })
            htmltxt += "</select></div>";
            break;
        case "multi":
            htmltxt = "<div class='multiQuestions'  id=" + obj.id + " data-linked=" + obj.linked + "> <p>" + obj.question + "</p>"
            obj.options.forEach((opti, index) => {
                if (obj.linkActivation.length == 0) {
                    htmltxt += "<input type='checkbox' id=" + obj.id + index + " name=" + opti + " value=" + index + " onclick='multiRevelio(this)' >" +
                        "<label for='vehicle1'>" + opti + "</label><br></br>";
                } else {
                    htmltxt += "<input type='checkbox' id=" + obj.id + index + " name=" + opti + " value=" + index + "  data-activate=" + obj.linkActivation[index] + " onclick='multiRevelio(this)' >" +
                        "<label for='vehicle1'>" + opti + "</label><br></br>";
                }
            });
            htmltxt += "</div>"
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
    document.getElementById(cat).style.backgroundColor = "red";

    //document.getElementById(obj.category).append("<div>hello there</div>")
    console.log("you pressed correctly")
}

// submitting and sending to the next page
function submitAndSend(){
    output.answers = AnswerMem
    let sender = document.getElementById("submit")

    console.log(output)
    sender.value = JSON.stringify(output)
    
    //sender.submit() //will send data inside to anoteher php file
    window.location.href = "result.php"
}

