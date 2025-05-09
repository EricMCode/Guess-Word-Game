// ======= SELECT DOM ELEMENTS =======
const guessedLetters = document.querySelector(".guessed-letters"); // UL for guessed letters
const guessButton = document.querySelector(".guess"); // Guess button
const guessLetter = document.querySelector(".letter"); // Input field for letter
const wordInProgress = document.querySelector(".word-in-progress"); // Paragraph showing word progress
const remainingGuesses = document.querySelector(".remaining"); // Paragraph showing remaining guesses
const guessSpan = document.querySelector("#guessSpan"); // Span inside remaining paragraph
const messageParagraph = document.querySelector(".message"); // Message to user
const hiddenButton = document.querySelector(".play-again"); // Play again button
let remainingGuessesCount = 8; // Max number of guesses the player can make.
let gameOver = false;
const letterLabel = document.querySelector('label[for="letter"]');


const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await response.text(); // Get the raw text content

    const wordArray = data.split("\n"); // Split the text into an array of words
    console.log(wordArray);

    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim(); // Remove any extra whitespace
    activeWord(word); // Start the game with this new word
};

// ======= GAME VARIABLES =======
let word = "magnolia"; // Starter word
const guessedPlayerLetters = []; // Array to hold guessed letters

// ======= FUNCTIONS =======

// Display word as "●●●●●●●●"
const activeWord = function(word) {
    const placeholder = [];
    for (let letter of word) {
        placeholder.push("●");
    }
    wordInProgress.innerText = placeholder.join("");
    guessSpan.innerText = `${remainingGuessesCount} guesses`;

};

// Validate input from user
const validatePlayerInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        messageParagraph.innerText = "Please insert a letter.";
    } else if (input.length > 1) {
        messageParagraph.innerText = "One character only, please.";
    } else if (!input.match(acceptedLetter)) {
        messageParagraph.innerText = "A-Z characters only, please.";
    } else {
        return input;
    }
};

// Add valid guesses to guessed letters
const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedPlayerLetters.includes(guess)) {
        messageParagraph.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        guessedPlayerLetters.push(guess);
        console.log(guessedPlayerLetters);
        updateGuessedLettersList();
        updateRemainingGuesses(guess); 
        updateWord(guessedPlayerLetters);
    }

};

// Update the guessed letters <ul> on the screen
const updateGuessedLettersList = function () {
    guessedLetters.innerHTML = "";
    for (const letter of guessedPlayerLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLetters.appendChild(li);
    }
};

// ======= EVENT LISTENERS =======

// On page load, display the hidden word
activeWord(word);

// Handle click on "Guess" button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    messageParagraph.innerText = "";

    const guess = guessLetter.value;
    guessLetter.value = ""; // Clear input field

    const validatedInput = validatePlayerInput(guess);

    

    if (validatedInput) {
        makeGuess(validatedInput);
    }
});

const updateWord = function(guessedPlayerLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = []; 

    for (let letter of wordArray) {
        if (guessedPlayerLetters.includes(letter)) {
            revealWord.push(letter); // show correct letter
        } else {
            revealWord.push("●"); // placeholder
        }
    }

    wordInProgress.innerText = revealWord.join("");
    //console.log(wordArray);
    wordInProgress.innerText = revealWord.join("");
    checkIfPlayerWon(); // ← call the win checker here

}

const updateRemainingGuesses = function (guess) {
    const wordUpper = word.toUpperCase();

    if (!wordUpper.includes(guess)) {
        messageParagraph.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuessesCount -= 1;
    } else {
        messageParagraph.innerText = `Good guess! The word has the letter ${guess}.`;
    }

    if (remainingGuessesCount === 0) {
        messageParagraph.innerText = `Game over! The word was "${word.toUpperCase()}".`;
        gameOver = true;
        startOver();
    } else if (remainingGuessesCount === 1) {
        guessSpan.innerText = "1 guess";
    } else {
        guessSpan.innerText = `${remainingGuessesCount} guesses`;
    }
};

const checkIfPlayerWon = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        messageParagraph.innerText = "🎉 You guessed correct the word!";
        gameOver = true;
        startOver();
    }
};

getWord();

const startOver = function () {
    guessButton.classList.add("hide");
    guessLetter.classList.add("hide");
    guessedLetters.classList.add("hide");
    remainingGuesses.classList.add("hide");
    letterLabel.classList.add("hide");


    hiddenButton.classList.remove("hide"); // Show the Play Again button
};

hiddenButton.addEventListener("click", function () {
    messageParagraph.classList.remove("win"); // Remove "win" styling if it was added
    messageParagraph.innerText = ""; // Clear the message text
    guessedLetters.innerHTML = ""; // Clear the list of guessed letters

    //Reset Game State:
    remainingGuessesCount = 8; 
    guessedPlayerLetters.length = 0; // Empty the array in-place
    guessSpan.innerText = `${remainingGuessesCount} guesses`; // Updates guess display

    // Show guessing interface
    guessButton.classList.remove("hide");
    guessLetter.classList.remove("hide");
    guessedLetters.classList.remove("hide");
    letterLabel.classList.remove("hide");


    // Hide the "Play Again" button
    hiddenButton.classList.add("hide");

    getWord();
});
