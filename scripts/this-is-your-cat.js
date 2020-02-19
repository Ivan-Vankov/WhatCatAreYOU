const yourCat = JSON.parse(localStorage.getItem("yourCat"));

document.getElementById("kitty_div").innerHTML = "<img id=\"kitty_image\" src=\"" + yourCat[0]["url"] + "\">";
document.getElementById("kitty_description").innerHTML = checkForDescription();

"use strict"
function getMoreKitties() {
	window.location = "more-kitties.html";
}

"use strict"
function checkForDescription() {
    var breeds = yourCat;
    if (yourCat[0] != null) {
        breeds = yourCat[0];
    } 
    breeds = breeds["breeds"];

    var desc = breeds["description"];
    if (breeds[0] != null) {
        desc = breeds[0]["description"];
    }
    return desc == null ? "Oh your spirit animal is so CUTE! ❤️" : desc;
}