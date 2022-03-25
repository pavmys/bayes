// function pushToLocalStorage(name, array) {
//     localStorage.setItem(name, JSON.stringify(array));
// }
var dictionary = ['абетка',
    'баран',
    'вогонь',
    'гума',
    'дерево',
    'екзамен',
    'єнот',
    'життя',
    'заєць',
    'ікра',
    'їжак',
    'йод',
    'край',
    'лебідь',
    'миша',
    'ніготь',
    'олень',
    'перстень',
    'річка',
    'сік',
    'тиран',
    'ураган',
    'фура',
    'хрін',
    'цвях',
    'черешня',
    'юнак',
    'яблуко'
];

var alphabet = "абвгґдеєжзиійїклмнопрстуфхцчшщьюя";
var gameState = document.getElementById("game_state");


var game;
let submitButton = document.querySelector(".submit");

document.querySelector(".footer-warning").innerHTML = "Choose amount of words!";
//$(".footer-warning").show().delay(7000).fadeOut();
submitButton.addEventListener("click", () => {
    game = new Game(n.value); // створили нову гру

    document.querySelector(".footer-warning").innerHTML = "Guess one of suggested words<br>Choose a letter from guessed word";
    //$(".footer-warning").show().delay(7000).fadeOut();
    game.choose_n_random_words(); // вибрали н випадкових слів зі словника 
    game.show_n_random_words(); // відобразили вибрані слова
    game.calc_start_probability(); // обчислили початкові ймовірності
    // game.run(); // запустили гру: шанс отримати, нова та фінальна ймовірності
    //game.start_probability = game.final_probability;
});
let letters = document.getElementsByClassName("letter");

var timeoutId = null;

function choose(button) {
    button.style = "background-color: darkred;";
    button.disabled = true;
    localStorage.clear();
    localStorage.setItem('chosen_letter', button.value.toLowerCase());
    game.run(); // запустили гру: шанс отримати, нова та фінальна ймовірності
}
for (let i = 0; i < letters.length; i++) {
    letters[i].addEventListener("click", () => {
        choose(letters[i]); // зміна кнопки при натисканні на неї та збереження букви в локальному сховищі
    });
}