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

var gameState = document.getElementById("game_state");

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
        let res = str.split(char).length - 1;
        if (res)
        {
            return res;
        }
        else
        {
            return 0;
        }
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

    // choose_secret_word()
    // {
    //     this.secret_word = Helper.getRandomChoice(this.chosen_words);
    //     localStorage.setItem("secret_word", this.secret_word);
    // }

    get_user_chosen_letter()
    {
        console.log(localStorage.getItem("chosen_letter"));
        if (!localStorage.getItem("chosen_letter"))
        {
        }
        this.chosen_letter = localStorage.getItem("chosen_letter");
        localStorage.removeItem("chosen_letter");
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
        this.calc_new_probability();
        let sum_new_probability = Helper.sum_of_array(this.new_probability);
        for (let i = 0; i < this.n; i++ )
        {
            this.final_probability[i] = this.new_probability[i] / sum_new_probability;
        }
    }
    
    show_n_random_words()
    {
        let output = document.querySelector(".output");
        output.innerHTML = "";
        for (let i = 0; i < this.n; i++)
        {
            let paragraph = document.createElement("p");
            let br = document.createElement("br");
            paragraph.innerHTML = this.chosen_words[i];
            output.appendChild(paragraph);
            // output.appendChild(br);
            // output.appendChild(br);
            // let breakline =  document.createElement("div");
            // breakline.className = "clear";
            // output.appendChild(breakline);
        }
    }

    show_final_probability()
    {
        this.show_n_random_words();
        let output = document.querySelector(".output");
        for (let i = 0; i < this.n; i++)
        {
            output.children[i].innerHTML += ("  " + (game.final_probability[i] * 100).toFixed(2) + "%"); 

    }

    // should_stop()
    // {
    //     for (let i = 0; i < this.n; i++)
    //     {
    //         if (this.final_probability[i] == 1)
    //         {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
}

    run()
    {
        // do
        // {
        this.get_user_chosen_letter(); 
        this.calc_chance_to_get();
        this.calc_new_probability();
        this.calc_final_probability();
        this.show_final_probability();
        
        // while(game.should_stop())
    }

}
let n = document.getElementById('quantity');
function run_game()
{
    game = new Game(n.value);
    
    alert(game.chosen_words);
    game.choose_secret_word();
    game.get_user_chosen_letter();
    
    game.calc_chance_to_get();
    game.calc_new_probability();
    game.calc_final_probability();
    inputN(game.chosen_words);
    game.start_probability = game.final_probability;
    console.log(game.final_probability);

}

    function inputN(arr) {
        let n = arr.length;
        let createDiv = document.querySelector(".output");
        createDiv.innerHTML = "";
        for (let i = 0; i < n; i++) {
            let vidsotkyOutput = document.createElement("p");
            createDiv.appendChild(vidsotkyOutput);
            vidsotkyOutput.innerHTML = (game.final_probability[i] * 100).toFixed(2) + "%";
        }
    }

    let submitButton = document.querySelector(".submit");
    submitButton.addEventListener("click", () => {
        
        gameState.innerHTML = "Загадайте одне із запропонованих слів<br>Оберіть букву із загаданого слова";
        game = new Game(n.value);
        game.choose_n_random_words();
        game.show_n_random_words();             
        game.calc_start_probability();
        // game.run();
    });
    n.addEventListener('change', () => {
        n.value = n.value < 3 ? 3 : n.value;
        n.value = n.value > 10 ? 10 : n.value;
});

let letters = document.getElementsByClassName("letter");
function choose(button)
{
    button.style = "background-color: black;";
    button.disabled = true;
    localStorage.clear();
    localStorage.setItem('chosen_letter', button.value.toLowerCase());
}
for (let i = 0; i < 33; i++) {
    letters[i].addEventListener("click", () => {
        choose(letters[i]);
        game.run();
        // localStorage.setItem('chosen_letter', letters[i].value.toLowerCase());
    });
}