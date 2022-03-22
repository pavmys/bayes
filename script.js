let letters = document.getElementsByClassName("letter");
let outputWords = document.querySelector(".output-words");
//console.log(letters[3].value);
for (let i = 0; i < 33; i++) {
    letters[i].addEventListener("click", () => {
        console.log(letters[i].value);
        localStorage.setItem('chosen_letter', letters[i].value.toLowerCase());
    });
}

$(".words-h3").click(function () {
    words.style.visibility = "visible";
    $(".words").toggle("slow");
});

let words = document.querySelector(".words");
let wordsArr = words.innerHTML.split(",");
let lettersWordsArr = [];
for (let j = 0; j < wordsArr.length; j++) {
    lettersWordsArr.push(wordsArr[j].split(""));
}
console.log(lettersWordsArr);

switcher = document.getElementById('on-off-button');
game_run = false;
switcher.addEventListener('click', () => {
    game_run = true;
    alert("Game started!");
}
);