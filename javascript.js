var circle = document.getElementsByClassName("rondje")[0];
var heart = document.getElementsByClassName("liking")[1];

var tags = [];
var verhalen = document.getElementsByClassName("verhalen");

for (var s = 0; s < verhalen.length; s++) {
    verhalen[s].onclick = function (event) {
        if (event.target.nodeName == "BUTTON") {
            if (event.target.classList.contains("liked")) {
                event.target.classList.remove("liked")
                event.target.style.backgroundImage = "URL('heart.png')";
                circle.style.display = "none";
            } else {
                event.target.classList.add("liked")
                circle.style.display = "block";
                event.target.style.backgroundImage = "URL('heart_liked.png')";
                heart.innerHTML = "";
            }
        }
    }
}


/* Input form */

document.getElementById('boekingsnummer').oninvalid = function (event) {
    event.target.setCustomValidity('Het boekingsnummer moet 3 hoofdletters en 3 cijfers bevatten.');
}

/* Filter Menu */

//Laten zien van de dropdown menu
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Maak de dropdown dicht als de gebruiker buiten de dropdown drukt
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");

        for (let i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].classList.contains('show')) {
                dropdowns[i].classList.remove('show');
            }
        }
    }
}


// Koppel een onclick event listener toe aan de dropdown
document.getElementById("myDropdown").onclick = function (event) {
    // Alleen als we klikken op een kind van de dropdown, niet de dropdown zelf
    console.log(event.target.nodeName)
    if (event.target.nodeName == "LABEL") {
        // Verwijder spaties uit de waarde en maak alles een lage letter
        var waarde = (event.target.innerHTML.replace(/\s/g, '')).toLowerCase();

        // Zoek naar de index van die waarde in de array, -1 als hij er niet is
        var tagIndex = tags.indexOf(waarde);
        if (tagIndex > -1) {
            tags.splice(tagIndex, 1);
            event.target.classList.remove("geselecteerd")
        } else {
            tags.push(waarde)
            event.target.classList.add("geselecteerd")
        }
        filterVerhalen();

    }
}

function filterVerhalen() {
    // Loop door alle secties heen
    for (var s = 0; s < verhalen.length; s++) {
        let sectie = verhalen[s].children;
        // Loop door alle verhalen in die secties heen
        for (var v = 0; v < sectie.length; v++) {
            // Kijk of hij de vereiste tags heeft

            if (!heeftTag(sectie[v].getAttribute("tag"), tags))
                sectie[v].style.display = "none";
            else
                sectie[v].style.display = "";
        }
    }
}

function heeftTag(verhaalTag, lijst) {
    if (verhaalTag == null)
return false;

for (var t = 0; t < lijst.length; t++)
    if (!verhaalTag.includes(lijst[t]))
        return false;

return true;
}