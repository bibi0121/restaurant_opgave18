//Denne funktion er til at vise og gemme tekst


function myFunction() {

    // Her hentes elementet fra dens Id:
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    // Trykkes der på knappen læses der mere tekst
    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Læs mere";
        moreText.style.display = "none";

        // Trykker man på knappen igen, efter der er trykket 1 gang,
        // vises der mindre tekst igen.
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Læs mindre";
        moreText.style.display = "inline";
    }
}

//----------------------------------------------

// Dette element gør så alle href attributer falder glidende ned af siden.

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



// JSON filen er blevet læst ind og puttet ind i "retter"

let retter;

// Dest (destination) er en tom container..//
let dest = document.querySelector(".data-container");

// Det starter først når DOM-elementet er loaded.
document.addEventListener("DOMContentLoaded", hentJson);
madFilter = "Alle retter";

document.querySelectorAll(".menu-item").forEach(knap => {

    // Denne function er til for at der skal ske nået når der bliver trykket.
    // Her sker der flitrering
    knap.addEventListener("click", filtrering)
});

function filtrering() {
    dest.textContent = "";

    // denne data-attribute  = et sted hvor man kan gemme værdier //
    madFilter = this.getAttribute("data-Kategori");
    visRetter();
}


// Funktionen her indlæser data ind fra JSON filen og ligger objekterne (retter),
//ind i et array. Og efter bliver retterne kaldt (visRetter).

async function hentJson() {
    let myJson = await fetch("menu.json");
    retter = await myJson.json();
    visRetter();
}

function visRetter() {
    let temp = document.querySelector(".data-template");
    document.querySelector("h3").textContent = madFilter;

    //løb retterne igennem og lav en klon //

    retter.forEach(retter => {
        if (retter.Kategori == madFilter || madFilter == "Alle retter") {


            let klon = temp.cloneNode(true).content;

            //indsæt data i klonen //

            // Content skal være de funktioner der er i json filen, som fx billeder, navn eller pris //

            klon.querySelector("img").src = "imgs/small/" + retter.Billede + "-sm.jpg";
            klon.querySelector("img").addEventListener("click", () => {
                visModal(retter);
            });

            klon.querySelector("h2").textContent = retter.Navn;

            klon.querySelector(".data-Pris").textContent = "Pris: " + retter.Pris;


            dest.appendChild(klon); // Jeg vil gerne appende (sætte ind) denne klon //
        }
    })
}

// Modalvindue er skujt, men bliver vist når en ret bliver valgt.
//Her popper et vindue op, med beskrivelse af retterne.

function visModal(retter) {
    modal.classList.add("vis");
    modal.querySelector(".modal-Navn").textContent = retter.Navn;
    modal.querySelector(".modal-Beskrivelse").textContent = retter.Beskrivelse;
    modal.querySelector(".modal-Billede").src = "imgs/large/" + retter.Billede + ".jpg";
    modal.querySelector(".modal-Billede").alt = "Foto af " + retter.Navn;

    modal.querySelector("div").addEventListener("click", skjulModal);

}

function skjulModal() {
    modal.classList.remove("vis");

    //window.scrollTo(0);
}


// book bord //

var currentTab = 0; // Denne "tab" er den første tab
showTab(currentTab);

function showTab(n) {
    // Denne funktion gør så der bliver spillet en specefik tab
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... Og knapperne for "forrige og næste"
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Næste";
    }

    fixStepIndicator(n)
}

function nextPrev(n) {
    // Denne funktion finder ud af hvilken tab der skal køres
    var x = document.getElementsByClassName("tab");

    if (n == 1 && !validateForm()) return false;
    // dette gemmer en den forrige tab
    x[currentTab].style.display = "none";

    currentTab = currentTab + n;

    if (currentTab >= x.length) {

        document.getElementById("regForm").submit();
        return false;
    }

    showTab(currentTab);
}

function validateForm() {
    // denne funktion validerer form:
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // Dette er et loop som tjekker hvert indput i en tab:
    for (i = 0; i < y.length; i++) {
        // Dette er hvis der er en tab som er tom:
        if (y[i].value == "") {

            y[i].className += " invalid";
            valid = false;
        }
    }
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid;
}

function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}


// Scroll tilbage til toppen - Knap

window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("tilTop").style.display = "block";
    } else {
        document.getElementById("tilTop").style.display = "none";
    }
}

// Når man klikker på denne knap, så kommer man tilbage til toppen
function tilTopFunktion() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


