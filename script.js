/*var alphabet = "абвгґдеєжзиійїклмнопрстуфхцчшщьюя";
let createLi = document.createElement("li");
createLi.style.padding = "10px";
for (let i = 0; i < 33; i++) {
    if (i % 11 === 0) {
        document.getElementById("bukvy").appendChild(createLi);
    }
    let input = document.createElement("input");
    input.type = "button";
    input.className = "letter";
    input.value = alphabet[i].toUpperCase();
    createLi.appendChild(input);
    /!*createLi.innerHTML = `<input type='button' className='letter' value='${alphabet[i].toUpperCase()}'>`;*!/
}*/

let n = document.getElementById('quantity');
n.addEventListener('change', () => { // встановити межі кількості слів
    n.value = n.value < 3 ? 3 : n.value;
    n.value = n.value > 10 ? 10 : n.value;
});

let letters_buttons = document.getElementsByClassName("letter");
let submit_button = document.getElementsByClassName("submit");

submit_button[0].addEventListener("click", () => {
    for (let i = 0; i < letters_buttons.length; i++) {
        letters_buttons[i].style = "background-color: black;";
        letters_buttons[i].disabled = false;

    }
});