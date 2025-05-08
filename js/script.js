// ======= SELECT DOM ELEMENTS =======
const guessedLetters = document.querySelector(".guessed-letters"); // UL for guessed letters
const guessButton = document.querySelector(".guess"); // Guess button
const guessLetter = document.querySelector(".letter"); // Input field for letter
const wordInProgress = document.querySelector(".word-in-progress"); // Paragraph showing word progress
const remainingGuesses = document.querySelector(".remaining"); // Paragraph showing remaining guesses
const guessSpan = document.querySelector("#guessSpan"); // Span inside remaining paragraph
const messageParagraph = document.querySelector(".message"); // Message to user
const hiddenButton = document.querySelector(".play-again"); // Play again button

// ======= GAME VARIABLES =======
const word = "magnolia"; // Starter word
const guessedPlayerLetters = []; // Array to hold guessed letters

// ======= FUNCTIONS =======

// Display word as "●●●●●●●●"
const activeWord = function(word) {
    const placeholder = [];
    for (let letter of word) {
        placeholder.push("●");
    }
    wordInProgress.innerText = placeholder.join("");
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

const checkIfPlayerWon = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        messageParagraph.innerText = "🎉 You guessed correct the word!";
        guessButton.classList.add("hide");
        guessLetter.classList.add("hide");
        guessedLetters.classList.add("hide");
        hiddenButton.classList.remove("hide");
    }
};