// Guessing Game with JavaScript

/**
 * Use let to define a variable randomNumber
 * Use Math function/object: Math.xxxxx
 */
let randomNumber = Math.floor(Math.random() * 100) + 1;

/**
 * Use const to define a variable guesses, lastResult, lowOrHi
 * Constants are also used to name values, but unlike variables, you can't change the value once set
 * Use document object: document.xxxxx
 */
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;

/**
 * Functions are reusable blocks of code that you can write once and run again and again
 * The first line declares a variable called userGuess and sets its value to the current value entered inside the text field
 */
function checkGuess() {
  const userGuess = Number(guessField.value);
  /**
   * A conditional code block allows you to run code selectively, depending on whether a certain condition is true or not
   */
  if (guessCount === 1) {
    guesses.textContent = "Previous guesses:";
  }
  guesses.textContent = `${guesses.textContent} ${userGuess}`;

  /**
   * A conditional code block allows you to run code selectively, depending on whether a certain condition is true or not
   * The first if (){ } checks whether the user's guess is equal to the randomNumber set at the top of our JavaScript
   * If it is, the player has guessed correctly and the game is won
   */
  if (userGuess === randomNumber) {
    lastResult.textContent = "Congratulations! You got it right!";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver();
    /**
     * This one checks whether this turn is the user's last turn. If it is, the program does the same thing as in the previous block,
     * except with a game over message instead of a congratulations message
     */
  } else if (guessCount === 10) {
    lastResult.textContent = "!!!GAME OVER!!!";
    lowOrHi.textContent = "";
    setGameOver();
    /**
     * The final block chained onto the end of this code (the else { }) contains code that is only run
     * if neither of the other two tests returns true (i.e. the player didn't guess right, but they have more guesses left)
     */
  } else {
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "red";
    /**
     * The last three lines in the function get us ready for the next guess to be submitted
     */
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "Last guess was too low!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Last guess was too high!";
    }
  }

  guessCount++;
  guessField.value = "";
  guessField.focus();
}
// At this point, we have a nicely implemented checkGuess() function,
// but it won't do anything because we haven't called it yet
/* Here we are adding an event listener to the guessSubmit button.
This is a method that takes two input values (called arguments) —
the type of event we are listening out for (in this case click) as a string,
and the code we want to run when the event occurs (in this case the checkGuess() function).
Note that we don't need to specify the parentheses when writing it inside addEventListener(). */
guessSubmit.addEventListener("click", checkGuess);

/**
 * The first two lines disable the form text input and button by setting their disabled properties to true.
 * This is necessary, because if we didn't, the user could submit more guesses after the game is over,
 * which would mess things up.
 * The next three lines generate a new <button> element,
 * set its text label to "Start new game", and add it to the bottom of our existing HTML.
 * The final line sets an event listener on our new button
 * so that when it is clicked, a function called resetGame() is run.
 */
function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement("button");
  resetButton.textContent = "Start new game";
  resetButton.style.position = "absolute";
  resetButton.style.left = "50%";
  resetButton.style.transform = "translateX(-50%)";
  resetButton.style.margin = "25px";
  resetButton.style.backgroundColor = "aqua";
  document.body.append(resetButton);
  resetButton.addEventListener("click", resetGame);
}

/**
 * Puts the guessCount back down to 1.
 * Empties all the text out of the information paragraphs.
 * We select all paragraphs inside <div class="resultParas"></div>,
 * then loop through each one, setting their textContent to '' (an empty string).
 * Removes the reset button from our code.
 * Enables the form elements, and empties and focuses the text field, ready for a new guess to be entered.
 * Removes the background color from the lastResult paragraph.
 * Generates a new random number so that you are not just guessing the same number again!
 */
function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll(".resultParas p");
  for (const resetPara of resetParas) {
    resetPara.textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  lastResult.style.backgroundColor = "white";

  randomNumber = Math.floor(Math.random() * 100) + 1;
}
