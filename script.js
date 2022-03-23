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



