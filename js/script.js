const guessedLetters = document.querySelector(".guessed-letters"); //Selects unordered list
const guessButton = document.querySelector(".guess"); //Selects the button with the guess text
const guessLetter = document.querySelector(".letter"); //Selects the text input where the player guesses a letter
const wordInProgress = document.querySelector(".word-in-progress"); //Selects empty paragraph where the word in progress will appear
const remainingGuesses = document.querySelector(".remaining"); //Selects paragraph where remaining guesses are displayed
const guessSpan = document.querySelector("#guessSpan"); //Selects the span where the remaining guesses will display
const messageParagraph = document.querySelector(".message"); //Selects empty paragraph where message will appear when player guesses a letter
const hiddenButton = document.querySelector(".play-again"); //Selects hidden button to prompt player to play again
const word = "magnolia"; //Starter word to test the game untill you draw from an API

const activeWord = function(word) {
    const placeholder = [];
    
    for(let letter of word) {
        console.log(letter);
        placeholder.push("●");
        //console.log(placeholder);
        //placeholder.join(""); //Doesn't seem to work
    }
    wordInProgress.innerText = placeholder.join("");
}

activeWord(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    //const inputName = 
    console.log(guessLetter.innerText); 
    const guess = guessLetter.value;
    console.log(guess);
    guessLetter.value = "";
})