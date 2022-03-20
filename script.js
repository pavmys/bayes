let letters = document.getElementsByClassName("letter");
//console.log(letters[3].value);
for (let i = 0; i < 33; i++) {
    letters[i].addEventListener("click", () => {
        console.log(letters[i].value);
    });

}

let words = ['']
