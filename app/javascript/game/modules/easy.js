// Create a set containing all 5040 unique combinations
//let numberSet = Array.from(newGame._createNumberSet());
//console.log(numberSet.length);

// Create a random code for the player to guess
//let code = newGame._getComputerCode();
//console.log(code);

// Easy game play

import Setup from './setup';
import Play from './play';
import { formatCode, resetTurn, validateCode, formatGuess } from '../../helpers';

export default class Easy extends Play {
  
  constructor() {
    super();
  }

  playGame(numberSet, computerCode, playerCode) {

    this.compCode = computerCode;
    this.playerCode = playerCode;
    this.numberSet = numberSet;
    console.log(this.compCode);

    this.setup = new Setup();

    let turns = 1;
    
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.guess.setAttribute('disabled', true);
      const validCode = validateCode(this.guess.value, this.errorContainer, this.guess);
      if (validCode == false) {
        setTimeout(resetTurn, 100, this.guess);
        return;
      }
      let userGuess = formatCode(this.guess.value);
      let userCount = this.checkCode(userGuess, this.compCode, "user");
      let userIcons = this.displayIcons(userCount.bullCount, userCount.cowCount);
      this.displayTableRow(turns, userGuess, userIcons, this.playerTable);
      if (userCount.bullCount == 4) {
        // End game here and stop computer from guessing
        this.finishGame(this.form, this.resultContainer, "Player wins", formatGuess(this.playerCode), formatGuess(this.compCode));
        return;
      }
      let compGuess = this.setup.getComputerCode();
      let compCount = this.checkCode(compGuess, this.playerCode, "comp");
      let compIcons = this.displayIcons(compCount.bullCount, compCount.cowCount);
      this.displayTableRow(turns, compGuess, compIcons, this.compTable);
      if (compCount.bullCount == 4) {
        // End game here and stop computer from guessing
        this.finishGame(this.form, this.resultContainer, "Computer wins", formatGuess(this.playerCode), formatGuess(this.compCode));
        return;
      }

      console.log("User code: " + this.playerCode);
      console.log("Before array length: " + this.numberSet.length);
      console.log("Original guess: " + compGuess);
  
      let afterGuess = this.refineNumberSet(compGuess, this.numberSet);
      this.numberSet = afterGuess;

      console.log("-----------------------------------------------");
      console.log(`After ${turns} turns`);
      console.log(afterGuess);
      console.log("After array length: " + this.numberSet.length);

      turns++;
      if (turns > 7) {
        // End game here and declare the result a draw
        this.finishGame(this.form, this.resultContainer, "Draw", formatGuess(this.playerCode), formatGuess(this.compCode));
        return;
      }
      // Function to wait a second or so
      setTimeout(resetTurn, 1000, this.guess);
      console.log('1000ms later');
    });

  }


  refineNumberSet(guess, numbers) {
    // Loop through numbers (which will be a new array each time - if it has been whittled down accordingly)
    // Use logic above to check codes against guesses
    // Bulls are passed in so we can check that we aren't checking them multiple time
    const originalArray = numbers;
    // Find index of guess and then remove it from the array so it can't be guessed again
    let guessIndex = originalArray.indexOf(guess);
    originalArray.splice(guessIndex, 1);
    
    return originalArray;
    }
}