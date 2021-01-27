// Easy game play

import Setup from './setup';
import Play from './play';
import { formatCode, resetTurn, validateCode, formatGuess } from '../../helpers';

export default class Easy extends Play {
  
  constructor() {
    super();
  }

  playGame(codesArray, computerCode, playerCode) {

    // Initialize values for codes, the computer's code and the player's code
    this.codesArray = codesArray;
    this.compCode = computerCode;
    this.playerCode = playerCode;

    // Initialize Setup class (used to get computer guesses)
    this.setup = new Setup();

    // Initialize turns variable to 1 (each round increments this by 1)
    let turns = 1;
    
    // Add event listener on form to get results for each round of guesses
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.guess.setAttribute('disabled', true);
      const validCode = validateCode(this.guess.value, this.errorContainer, this.guess);
      if (validCode == false) {
        setTimeout(resetTurn, 100, this.guess);
        return;
      }

      // Check user guess against computer code and display results
      let userGuess = formatCode(this.guess.value);
      let userCount = this.checkCode(userGuess, this.compCode, "user");
      let userIcons = this.displayIcons(userCount.bullCount, userCount.cowCount);
      this.displayTableRow(turns, userGuess, userIcons, this.playerTable);
      if (userCount.bullCount == 4) {
        // End game here and stop computer from guessing
        this.finishGame(this.form, this.resultContainer, "Player wins", formatGuess(this.playerCode), formatGuess(this.compCode));
        return;
      }

      // Check computer guess against user code and display results
      let random = Math.floor(Math.random() * Math.floor(this.codesArray.length));
      let compGuess = this.codesArray[random];
      let compCount = this.checkCode(compGuess, this.playerCode, "comp");
      let compIcons = this.displayIcons(compCount.bullCount, compCount.cowCount);
      this.displayTableRow(turns, compGuess, compIcons, this.compTable);
      if (compCount.bullCount == 4) {
        // End game here and stop computer from guessing
        this.finishGame(this.form, this.resultContainer, "Computer wins", formatGuess(this.playerCode), formatGuess(this.compCode));
        return;
      }
  
      // Reassign codesArray variable to be equal to the array after it has been whittled down
      let afterGuess = this.refineCodesArray(compGuess, this.codesArray);
      this.codesArray = afterGuess;

      turns++;
      if (turns > 7) {
        // End game here and declare the result a draw
        this.finishGame(this.form, this.resultContainer, "Draw", formatGuess(this.playerCode), formatGuess(this.compCode));
        return;
      }
      // Function to wait a second or so before new round is available to play
      setTimeout(resetTurn, 1000, this.guess);
      console.log('1000ms later');
    });

  }

  refineCodesArray(guess, numbers) {
    let originalArray = numbers;
    // Find index of guess and then remove it from the array so it can't be guessed again
    const guessIndex = originalArray.indexOf(guess);
    originalArray.splice(guessIndex, 1);
    // Return array minus the guess which has been removed
    return originalArray;
    }
}