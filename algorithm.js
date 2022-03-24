var dictionary = 
['абетка',
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

class Helper
{
    static getRandom(length) { return Math.floor(Math.random()*(length - 1)); }

    static getRandomChoice(array)
    {
        let length = array.length;
        let index = Helper.getRandom(length);
        return array[index];
    }

    static count(str, char)
    {
        return str.split(char).length - 1
    }

    static getRandomSample(array, size) {
    let length = array.length;
    for(var i = size; i--;) {
        var index = Helper.getRandom(length);
        var temp = array[index];
        array[index] = array[i];
        array[i] = temp;
    }

    return array.slice(0, size);
    }

    static sum_of_array(array)
    {
        let sumWithInitial = array.reduce(
        (previousValue, currentValue) => previousValue + currentValue, 0);
        return sumWithInitial;
    }
}
class Game
{
    constructor(n)
    {
        this.n = n;
        this.final_probability = new Array(this.n);
        for (let i = 0; i < this.n; i++) {
            this.final_probability[i] = 0;
        }
    }

    calc_start_probability()
    {
        this.start_probability = new Array(this.n);
        for (let i = 0; i < this.n; i++ )
        {
            this.start_probability[i] = 1 / this.n;
        }
        
    }

    choose_n_random_words()
    {
        this.chosen_words = Helper.getRandomSample(dictionary, this.n);
    }

    choose_secret_word()
    {
        this.secret_word = Helper.getRandomChoice(this.chosen_words);
    }

    get_user_chosen_letter()
    {
        this.chosen_letter = localStorage.getItem("chosen_letter");
        localStorage.setItem("chosen_letter", undefined);
    }

    calc_chance_to_get()
    {
        this.chance_to_get = new Array(this.n);
        for (let i = 0; i < this.n; i++ )
        {
            let current_word = this.chosen_words[i];
            this.chance_to_get[i] = Helper.count(current_word, this.chosen_letter) / current_word.length
        }
    }

    calc_new_probability()
    {
        this.new_probability = new Array(this.n);
        for (let i = 0; i < this.n; i++ )
        {
            this.new_probability[i] = this.start_probability[i] * this.chance_to_get[i];
        }
    }

    calc_final_probability()
    {
        let sum_new_probability = Helper.sum_of_array(this.new_probability);
        for (let i = 0; i < this.n; i++ )
        {
            this.final_probability[i] = this.new_probability[i] / sum_new_probability;
        }
    }

    game_continue()
    {
            if (this.final_probability.count(true) > 1)
            {
                return true;
            }
        return false;
    }
}
let n = document.getElementById('quantity');

    if (localStorage.getItem("chosen_letter"))
    {
        //run_game();
    }

function run_game()
{
    game = new Game(n.value);
    game.calc_start_probability();
    //alert(game.start_probability);
    game.choose_n_random_words();
    inputN(game.chosen_words);
    alert(game.chosen_words);
    //alert(game.chosen_words);
    game.choose_secret_word();
    //alert(game.secret_word);
    // --- WAIT FOR INPUT LETTER ---
    //do
    //{
    game.get_user_chosen_letter();
    //alert(game.chosen_letter);
    game.calc_chance_to_get();
    game.calc_new_probability();
    game.calc_final_probability();
    game.start_probability = game.final_probability;
    console.log(game.final_probability);
    //}
    //while (true);
    //while (game.game_continue());

}

    function inputN(arr) {
        let n = arr.length;
        // alert(n);
        let createDiv = document.querySelector(".output");
        createDiv.innerHTML = "";
        // game = null;
        for (let i = 0; i < n; i++) {
            let currentWord = arr[i];
            for (let j = 0; j < currentWord.length; j++) {
                let emptyKlitynka = document.createElement("div");
                emptyKlitynka.className = "empty-klitynka";
                createDiv.appendChild(emptyKlitynka);
            }
            // додавання параграфа game.final_probability[i]
            let vidsotkyOutput = document.createElement("p");
            createDiv.appendChild(vidsotkyOutput);
            vidsotkyOutput.innerHTML = game.final_probability[i].toFixed(2) * 100 + "%";
            //alert(game.final_probability[i].toFixed(2) * 100 + "%");
            let breakline =  document.createElement("div");
            breakline.className = "clear";
            createDiv.appendChild(breakline);
        }
    }

    let submitButton = document.querySelector(".submit");
    submitButton.addEventListener("click", () => {
        
        run_game();
    });
    // n.addEventListener('change', () => {

    // alert(Helper.count("hello", "l"));  // 2
    // alert(Helper.sum_of_array([1, 5, 3])); // 9
//});

//switcher = document.getElementById('on-off-button');
//game_run = false;
//switcher.addEventListener('click', () => {
  //  game_run = true;
    //alert("Game started!");
    //run_game();
//}
//);