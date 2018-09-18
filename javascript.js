//Denne funktion er til at vise og gemme tekst


function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Læs mere";
        moreText.style.display = "none";
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



//(json filen er blevet læst ind og puttet ind i "retter")//
let retter;

// Dest (destination) er en tom container..//
let dest = document.querySelector(".data-container");

// Det starter først når DOM-elementet er loaded.
document.addEventListener("DOMContentLoaded", hentJson);
madFilter = "Alle retter";

document.querySelectorAll(".menu-item").forEach(knap => {

    // Denne function er til for at der skal ske nået når der bliver trykket. Her sker der flitrering
    knap.addEventListener("click", filtrering)
});

function filtrering() {
    dest.textContent = "";

    // denne data-attribute  = et sted hvor man kan gemme værdier //
    madFilter = this.getAttribute("data-Kategori");
    visRetter();
}


// Her bliver JSON filen hentet

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

// Modalvindue er skujt, men bliver vist når en ret bliver valgt. Her popper et vindue op, med beskrivelse af retterne.
function visModal(retter) {
    modal.classList.add("vis");
    modal.querySelector(".modal-Navn").textContent = retter.Navn;
    modal.querySelector(".modal-Billede").src = "imgs/large/" + retter.Billede + ".jpg";
    modal.querySelector(".modal-Billede").alt = "Foto af " + retter.Navn;
    modal.querySelector(".data-Beskrivelse").textContent = retter.Beskrivelse;
    modal.querySelector("button").addEventListener("click", skjulModal);

}

function skjulModal() {
    modal.classList.remove("vis");

    //window.scrollTo(0);
}


// book bord //

var v = $("#booking-form").validate({
    rules: {
        bf_totalGuests: {
            required: true
        },
        bf_date: {
            required: true
        },
        bf_time: {
            required: true
        },
        bf_hours: {
            required: true
        },
        bf_fullname: {
            required: true
        },
        bf_email: {
            required: true,
            email: true
        }
    },
    errorElement: "span",
    errorClass: "error",
    errorPlacement: function (error, element) {
        error.insertBefore(element);
    }
});

$(".next-btn1").click(function () {
    if (v.form()) {
        $(".tab-pane").hide();
        $("#step2").fadeIn(1000);
        $(".progressbar-dots").removeClass("active");
        $(".progressbar-dots:nth-child(2)").addClass("active");
    }
});
$(".next-btn2").click(function () {
    if (v.form()) {
        $(".tab-pane").hide();
        $("#step3").fadeIn(1000);
        $(".progressbar-dots").removeClass("active");
        $(".progressbar-dots:nth-child(3)").addClass("active");
    }
});

$(".submit-btn").click(function () {
    if (v.form()) {
        $("#loader").show();
        setTimeout(function () {
            $("#booking-form").html(
                "<h2>Your message was sent successfully. Thanks! We'll be in touch as soon as we can, which is usually like lightning (Unless we're sailing or eating tacos!).</h2>"
            );
        }, 1000);
        return false;
    }
});


// footer //
