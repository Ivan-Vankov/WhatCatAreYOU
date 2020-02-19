const catUrl = "https://api.thecatapi.com/v1/images/search?size=full";

"use strict"
function getKitty() {
    ajaxGet(catUrl, data => {
        var html = `<img id="kitty_image" src="${data[0]["url"]}">`;
        document.getElementById("kitty_div").innerHTML = html;
    });
}

"use strict"
function ajaxGet(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        try {
        	callback(JSON.parse(xmlhttp.responseText));
        } catch (err) {
            console.error(`${err.message} in ${xmlhttp.responseText}`);
            return;
        }
      }
    };
    
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}