var words = 
[
    
    
];

class Game
{
    constructor(n)
    {
        this.n = n;
    }

    calc_start_probabilities()
    {
        this.start_probabilities = new Array(n);
        for (let i = 0; i < this.n; i++ )
        {
            this.start_probabilities[i] = 1 / this.n;
        }
        alert(this.start_probabilities[1]);
    }

    read_words_from_file()
    {
        
        for (let w of words)
        {
            alert(w);
        }
    }
}

let n = document.getElementById('quantity');

n.addEventListener('change', () => {
    game = new Game(n.value);
    // game.calc_start_probabilities();
    game.read_words_from_file()
});