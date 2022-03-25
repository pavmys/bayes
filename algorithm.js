// function pushToLocalStorage(name, array) {
//     localStorage.setItem(name, JSON.stringify(array));
// }

class Helper {
    static getRandom(length) {
        return Math.floor(Math.random() * (length - 1));
    }

    static getRandomChoice(array) {
        let length = array.length;
        let index = Helper.getRandom(length);
        return array[index];
    }

    static count(array, element) {
        let counter = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i] == element) {
                counter++;
            }
        }
        return counter;
    }

    static getRandomSample(array, size) {
        let length = array.length;
        for (var i = size; i--;) {
            var index = Helper.getRandom(length);
            var temp = array[index];
            array[index] = array[i];
            array[i] = temp;
        }

        return array.slice(0, size);
    }

    static sum_of_array(array) {
        let sumWithInitial = array.reduce(
            (previousValue, currentValue) => previousValue + currentValue, 0);
        return sumWithInitial;
    }
}

class Game {
    constructor(n) {
        this.n = n;
        this.final_probability = new Array(this.n);
        // for (let i = 0; i < this.n; i++) {
        //     this.final_probability[i] = 0;
        // }
    }

    calc_start_probability() {
        this.start_probability = new Array(this.n);
        for (let i = 0; i < this.n; i++) {
            this.start_probability[i] = 1 / this.n;
        }

    }

    choose_n_random_words() {
        this.chosen_words = Helper.getRandomSample(dictionary, this.n);
    }

    get_user_chosen_letter() {
        this.chosen_letter = localStorage.getItem("chosen_letter");
        localStorage.removeItem("chosen_letter");
    }

    calc_chance_to_get() {
        this.chance_to_get = new Array(this.n);
        for (let i = 0; i < this.n; i++) {
            let current_word = this.chosen_words[i];
            this.chance_to_get[i] = Helper.count(current_word, this.chosen_letter) / current_word.length
        }
    }

    calc_new_probability() {
        this.new_probability = new Array(this.n);
        for (let i = 0; i < this.n; i++) {
            this.new_probability[i] = this.start_probability[i] * this.chance_to_get[i];
        }
    }

    calc_final_probability() {
        this.calc_new_probability();
        let sum_new_probability = Helper.sum_of_array(this.new_probability);
        for (let i = 0; i < this.n; i++) {
            this.final_probability[i] = this.new_probability[i] / sum_new_probability;
        }
    }

    show_n_random_words() {
        let output = document.querySelector(".output");
        output.innerHTML = "";
        for (let i = 0; i < this.n; i++) {
            let paragraph = document.createElement("p");
            paragraph.innerHTML = this.chosen_words[i];
            output.appendChild(paragraph);
        }
    }

    show_final_probability() {
        this.show_n_random_words();
        let output = document.querySelector(".output");
        for (let i = 0; i < this.n; i++) {
            let fProb = this.final_probability[i] ? (this.final_probability[i] * 100).toFixed(2) : 0
            output.children[i].innerHTML += ("<span>" + fProb + " %");

        }
    }

    run() {
        this.get_user_chosen_letter();
        this.calc_chance_to_get();
        this.calc_new_probability();
        this.calc_final_probability();
        this.show_final_probability();
        setTimeout({}, 1000);
        game.start_probability = game.final_probability;
        timeoutId = setInterval(this.run, 3000);
    }
}
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
submitButton.addEventListener("click", () => {
    game = new Game(n.value); // створили нову гру
    gameState.innerHTML = "Загадайте одне із запропонованих слів<br>Оберіть букву із загаданого слова";
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