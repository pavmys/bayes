let letters = document.getElementsByClassName("letter");
let outputWords = document.querySelector(".output-words");
function choose(button)
{
    button.style = "background-color: black;";
    button.disabled = true;
    localStorage.setItem('chosen_letter', button.value.toLowerCase());
}
//console.log(letters[3].value);
for (let i = 0; i < 33; i++) {
    letters[i].addEventListener("click", () => {
        choose(letters[i]);
        // console.log(letters[i].value);
        // letters[i].className = "chosen";
        // localStorage.setItem('chosen_letter', letters[i].value.toLowerCase());
    });
}

$(".words-h3").click(function () {
    words.style.visibility = "visible";
    $(".words").toggle("slow");
});



