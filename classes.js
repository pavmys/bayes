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
            if (array[i] === element) {
                counter++;
            }
        }
        return counter;
    }

    static countNans(array) {
        let counter = 0;
        for (let i = 0; i < array.length; i++) {
            if (isNaN(array[i])) {
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
            output.children[i].innerHTML += ("      <span style='text-shadow: 2px 2px gray; float: right'>" + fProb + " %</span>");
        }
    }

    show_expected_word() {
        let showDivExpected = document.querySelector(".ask-vhad-word");
        showDivExpected.style.visibility = "visible";
        let expectedWord = document.querySelector(".expected-word");
        let index = this.final_probability.indexOf(Math.max(...this.final_probability));
        expectedWord.innerHTML = this.chosen_words[index] ? this.chosen_words[index] : "Undefined";
        let footerWarning = document.querySelector(".footer-warning");

        let answer = document.getElementsByClassName("answer");
        for (let i = 0; i < answer.length; i++) {
            answer[i].addEventListener("click", () => {
                if (answer[i].value === "Yes") {
                    if (!this.text === "You lost!") {
                        footerWarning.innerHTML = "You won!";
                    } else {
                        footerWarning.innerHTML = "You lost!";
                    }
                    $(".footer-warning").show().delay(2000).fadeOut();
                    showDivExpected.style.visibility = "hidden";

                } else {
                    showDivExpected.style.visibility = "hidden";
                    document.querySelector(".footer-warning").innerHTML = "Choose another letter!";
                    $(".footer-warning").show().delay(4000).fadeOut();
                }
            });
        }
    }

    check_100() {
        this.text = "Choose letter";
        if (Helper.count(this.final_probability, 1) === 1) {
            this.text = "You won!";
        }
        if (Helper.count(this.final_probability, 0) === this.n || Helper.countNans(this.final_probability) === this.n) {
            this.text = "Wrong letter of wrong word";
        }
        document.querySelector(".footer-warning").innerHTML = this.text;
        $(".footer-warning").show().delay(4000).fadeOut();
    }

    run() {
        this.get_user_chosen_letter();
        this.calc_chance_to_get();
        this.calc_new_probability();
        this.calc_final_probability();
        this.show_final_probability();
        this.check_100();
        this.show_expected_word();
        setTimeout({}, 1000);
        this.start_probability = this.final_probability;
        timeoutId = setInterval(this.run, 3000);
    }
}