function pullFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name));
}


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