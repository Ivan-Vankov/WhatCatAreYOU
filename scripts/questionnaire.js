const questionnaire = [["Are you an energetic person?", 
                            ["YES! GIVE ME MORE SUGAR!",
                             "No. Leave me to my nap, please."]], 
                       ["Do you like children?",
                            ["Yes. They are so playful <3.",
                             "No. They make fun of me ;(."]],
                       ["Do you weigh more than most people?",
                            ["Yes. I eat two doner kebabs for breakfast.",
                             "No. I'm on a diet."]],
                       ["Do you consider yourself and inteligent person?",
                            ["Yes. I have >160 IQ.",
                             "No. I'm a dumb dumb."]],
                       ["Do you consider yourself a social person?",
                            ["Yes. I have 1000 facebook friends.",
                             "No. I play games at home all day."]]];

const apiKey = "3495a0af-e2fb-414c-ac7c-68d1c3618aa8";

var questionElement = document.getElementById("question");
var buttonsElement = document.getElementById("buttons");
var questionIndex = 0;

"use strict"
function ajaxGet(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        try {
        	callback(JSON.parse(xmlhttp.responseText));
        } catch (err) {
            console.error(err.message + " in " + xmlhttp.responseText);
            return;
        }
      }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("x-api-key", apiKey);
    xmlhttp.send();
}

var catBreeds;
ajaxGet("https://api.thecatapi.com/v1/breeds", data => { catBreeds = data; });

addNextEntry();
document.getElementById("question_number").innerHTML = `Question 1/${questionnaire.length}`;

var answers = new Array(questionnaire.length);

"use strict"
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

"use strict"
function getRightBreed() {
    var viableBreeds = catBreeds
        .filter(breed => {
            return answers[0] 
                ? breed["temperament"].toLowerCase().includes("energetic")
                : true;
        })
        .filter(breed => {
            return answers[1]
                ? breed["child_friendly"] > 3
                : breed["child_friendly"] <= 3;
        })
        .filter(breed => {
            var weight = getCatBreedWeight(breed["weight"]);
            return answers[2]
                ? weight >= 4
                : weight <= 4;
        })
        .filter(breed => {
            return answers[3]
                ? breed["intelligence"] >= 5
                : breed["intelligence"] <= 5;
        })
        .filter(breed => {
            return answers[4]
                ? breed["social_needs"] >= 4
                : breed["social_needs"] <= 4;
        });
    
    shuffleArray(viableBreeds);

    if (viableBreeds.length == 0) {
        return "";
    } else {
        return viableBreeds[0]["id"];
    }
}

"use strict"
function getCatBreedWeight(weight) {
    var weightRange = weight["metric"].replace(/\s+/g, '').split("-");
    return (parseFloat(weightRange[0]) + parseFloat(weightRange[1])) / 2;
}

"use strict"
function nextQuestion(answer) {
    answers[questionIndex - 1] = answer;

    if (questionIndex == questionnaire.length) {
        var yourCatBreed = getRightBreed();
        ajaxGet(`https://api.thecatapi.com/v1/images/search?breed_ids=${yourCatBreed}&include_breeds=true`, 
                function(yourCat) { 
                    localStorage.setItem("yourCat", JSON.stringify(yourCat));
                    window.location = "this-is-your-cat.html";
                });
        return;
    }

    addNextEntry();
    document.getElementById("question_number").innerHTML = `Question ${questionIndex}/${questionnaire.length}`;
}

"use strict"
function addNextEntry() {
    var entry = questionnaire[questionIndex++];
    var question = entry[0];
    var buttons = entry[1];

    questionElement.innerText = question;

    buttonsElement.innerHTML  = `<input class="answer_button" type="button" onclick="nextQuestion(true)"  value="${buttons[0]}"></input><br>`;
    buttonsElement.innerHTML += `<input class="answer_button" type="button" onclick="nextQuestion(false)" value="${buttons[1]}"></input><br>`;
}