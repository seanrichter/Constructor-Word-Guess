var Word = require("./word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var nflTeams = [
    "new england patriots",
    "dallas cowboys",
    "philidelphia eagles",
    "green bay packers",
    "oakland raiders",
    "seattle seahawks",
    "pittsburgh steelers",
    "chicago bears",
    "kansas city chiefs",
    "san francisco 49ers",
    "new york giants",
    "cleveland browns",
    "minnesota vikings",
    "new orleans saints",
    "washington redskins",
    "los angeles rams",
    "buffalo bills",
    "denver broncos",
    "indianapolis colts",
    "arizona cardinals",
    "baltimore ravens",
    "carolina panthers",
    "new york jets",
    "miami dolphins",
    "detroit lions",
    "houston texans",
    "cincinnati bengals",
    "atlanta falcons",
    "los angeles chargers",
    "jacksonville jaguars",
    "tampa bay buccaneers",
    "tennessee titans"
];

var randomIndex = Math.floor(Math.random() * nflTeams.length);
var randomWord = nflTeams[randomIndex]

var computerWord = new Word(randomWord);

var requireNewWord = false;
var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 10;

function theLogic() {
    if (requireNewWord) {
        var randomIndex = Math.floor(Math.random() * nflTeams.length);
        var randomWord = nflTeams[randomIndex];

        computerWord = new Word(randomWord);

        requireNewWord = false;
    }

    var wordComplete = [];

    if (wordComplete.includes(false)) {
        inquirer.prompt([
            {
                type: "input",
                message: "Select letter from A to Z",
                name: "userinput"
            }
        ]).then(function (input) {
            if (!letterArray.includes(input.userinput) ||
                input.userinput.length > 1
            ) {
                console.log("\nPlease Try Again!\n");
            } else {
                if (
                    incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === ""
                ) {
                    console.log("\nAlready Guessed or Nothing was Entered\n");
                    theLogic();
                } else {
                    var wordCheckArray = [];

                    computerWord.userGuess(input.userinput);

                    computerWord.objArray.forEach(wordCheck);
                    if (wordCheckArray.join("") === wordComplete.join("")) {
                        console.log("\nIncorrect\n");

                        incorrectLetters.push(input.userinput);
                        guessesLeft--;
                    } else {
                        console.log("\nCorrect\n");

                        correctLetters.push(input.userinput);
                    }
                    computerWord();

                    console.log("Guesses Left: " + guessesLeft + "\n");
                    console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                    if (guessesLeft > 0) {
                        theLogic();
                    } else {
                        console.log("You have Lost!\n");
                    }
                    function wordCheck(key) {
                        wordCheckArray.push(key.guessed);
                    }
                }
            }
        });
    } else {
        console.log("YOU WIN!\n");
    }
    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }
}
function restartGame() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would You like to:",
            choices: ["Play Again", "Exit"],
            name: "restart"
        }

    ]).then(function (input) {
        if (input.restart === "Play Again") {
            requireNewWord = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft = 10;
            theLogic();

        } else {
            return;
        }
    });
}
theLogic();