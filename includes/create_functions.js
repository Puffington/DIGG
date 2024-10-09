
window.addEventListener('load', function () {
    //linking objects
    A1 = document.getElementById("cat1Area");
    A2 = document.getElementById("cat2Area");
    A3 = document.getElementById("cat3Area");
    A4 = document.getElementById("cat4Area");

    cat1 = document.getElementById("cat1");
    cat2 = document.getElementById("cat2");
    cat3 = document.getElementById("cat3");
    cat4 = document.getElementById("cat4");

    A1.link = cat1;
    cat1.link = A1;
    A2.link = cat2;
    cat2.link = A2;
    A3.link = cat3;
    cat3.link = A3;
    A4.link = cat4;
    cat4.link = A4;

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

function buttonClick() {
    console.log("you reached me!!")
}
// create html element dynamically, or use show hide
//"let" variables are thrown out the window when outside bounds
// 
function builderOfElementsAddBlueprint() {
    blueprint = {};
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
    blueprint.options = ["seven","thirteen","zero"];
    console.log("this is blueprint" + blueprint.question);
    document.getElementById("examples").insertAdjacentHTML("beforeend", builderOfElements(blueprint));

}

function builderOfElements(obj) {
    let htmltxt = "";
    switch (obj.type) {
        case "boolean":
            htmltxt = "<div class='radioQuestion'><p>" + obj.question + "</p><input type='radio' id='css' name='fav_language' value='CSS'>" +
                "<label for='html'>YES</label><br></br>" +
                "<input type='radio' id='css' name='fav_language' value='CSS'>" +
                "<label for='html'>NO</label><br></br></div>"
            break;
        case "dropdown":
            htmltxt = " <label for=" + obj.id + ">" + obj.question + "</label> " +
                "<select name=" + obj.id + " >";
            obj.options.forEach(opti => {
                htmltxt += "<option value=>" + opti.key + "</option>";
            })
            htmltxt += "</select>";
            break;
        default:
            alert("question id" + obj.id + " has a wrong questions type")
            break;
    }

    console.log("question:" + obj.question);

    return htmltxt;
}


async function getQuestions() {
    let resp = fetch("includes/questions.json");
    console.log(resp);
    if ((await resp).statusText != "OK") {
        console.log("error with getting JSON")
    }

    let obj = await (await resp).json(); //waiting for respons
    console.log(obj)

    obj.forEach(object => {
        console.log("uh")
        console.log(object.category)
        cat = ("cat" + object.category + "Area")
        document.getElementById(cat).insertAdjacentHTML("beforeend", builderOfElements(object));
    });


    //different insertion methods
    //document.getElementById(cat).innerHTML += builderOfElements();

    document.getElementById(cat).style.backgroundColor = "red";
    console.log(document.getElementById(obj[0].category))

    //document.getElementById(obj.category).append("<div>hello there</div>")
    console.log("you pressed correctly")
}