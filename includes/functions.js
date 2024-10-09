
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
                let test =entry.target.link.style.backgroundColor = "blue";
                console.log(entry.target.link)
            }
            else {
                entry.target.link.style.backgroundColor = "brown";
            }
            console.log(entry.target.id)
        })
    }
})

function scroller(CategoryButton){
   CategoryButton.link.scrollIntoView({behavior:"smooth",block:"center", inline: 'start'});
   //CategoryButton.parentNode.scrollTop = CategoryButton.offsetTop;

}

function buttonClick() {
    console.log("you reached me!!")
}
// create html element dynamically, or use show hide
//"let" variables are thrown out the window when outside bounds
// 
function builderOfElements() {
    let htmlCode = document.createElement('div')
    let htmltxt = '<div class="el">hello there!! you did it</div>'
    return htmltxt

}

async function getQuestions() {
    let resp = fetch("includes/questions.json");
    console.log(resp);
    if ((await resp).statusText != "OK") {
        console.log("error with getting JSON")
    }

    obj = await (await resp).json();
    console.log(obj)

    obj.forEach(Object => {
        console.log("uh")
        console.log(Object.category)
    });

    //different insertion methods
    document.getElementById(obj[0].category).insertAdjacentHTML("beforeend", builderOfElements());

    document.getElementById(obj[0].category).innerHTML += builderOfElements();


    document.getElementById(obj[0].category).style.backgroundColor = "red";
    console.log(document.getElementById(obj[0].category))


    //document.getElementById(obj.category).append("<div>hello there</div>")
    console.log("you pressed correctly")
}