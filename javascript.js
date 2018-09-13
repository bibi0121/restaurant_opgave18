 <script>
        let retter; //(json filen er blevet læst ind og puttet ind i "retter")//

        // Dest (destination) er en tom container..//
        let dest = document.querySelector(".data-container");
        document.addEventListener("DOMContentLoaded", hentJson);
        madFilter = "alle";

        document.querySelectorAll(".menu-item").forEach(knap => {
            knap.addEventListener("click", filtrering)
        });

        function filtrering() {
            dest.textContent = "";

            // denne data-attribute  = et sted hvor man kan gemme værdier //
            madFilter = this.getAttribute("data-kategori");
            visRetter();
        }



        async function hentJson() {
            let myJson = await fetch("menu.json");
            retter = await myJson.json();
            visRetter();
        }

        function visRetter() {
            let temp = document.querySelector(".data-template");
            document.querySelector("h1").textContent = madFilter;

            //løb retterne igennem og lav en klon //

            retter.forEach(retter => {
                if (retter.kategori == madFilter || madFilter == "alle") {


                    let klon = temp.cloneNode(true).content;

                    //indsæt data i klonen //

                    // Content skal være nav, github osv, de funktioner der er i json filen //

                    klon.querySelector("img").src = "imgs/small/" + retter.billede + "-sm.jpg";
                    klon.querySelector("img").addEventListener("click", () => {
                        visModal(retter);
                    });
                    //
                    //                    klon.querySelector("img").addEventListener("click", () => {
                    //                        window.location.href = "single.html?retter=" + i;
                    //                    });

                    klon.querySelector("h2").textContent = retter.navn;
                    klon.querySelector(".data-kortbeskrivelse").textContent = retter.kortbeskrivelse;
                    klon.querySelector(".data-pris").textContent = "Pris: " + retter.pris;


                    dest.appendChild(klon); // Jeg vil gerne appende (sætte ind) denne klon //
                }
            })
        }

        function visModal(retter) {
            modal.classList.add("vis");
            modal.querySelector(".modal-navn").textContent = retter.navn;
            modal.querySelector(".modal-billede").src = "imgs/medium/" + retter.billede + "-md.jpg";
            modal.querySelector(".modal-billede").alt = "Foto af " + retter.navn;
            modal.querySelector(".data-oprindelsesregion").textContent = retter.oprindelsesregion;
            modal.querySelector(".data-langbeskrivelse").textContent = retter.langbeskrivelse;
            modal.querySelector("button").addEventListener("click", skjulModal);

        }

        function skjulModal() {
            modal.classList.remove("vis");
            //window.scrollTo(0);
        }

    </script>
