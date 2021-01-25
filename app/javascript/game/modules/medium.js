// Create a set containing all 5040 unique combinations
//let numberSet = Array.from(newGame._createNumberSet());
//console.log(numberSet.length);

// Create a random code for the player to guess
//let code = newGame._getComputerCode();
//console.log(code);

// Medium game play

import Setup from './setup';
import Play from './play';
import { formatCode, resetTurn, validateCode, formatGuess } from '../../helpers';

export default class Medium extends Play {
  
  constructor() {
    super();
  }

  playGame(numberSet, computerCode, playerCode) {

    this.compCode = computerCode;
    this.playerCode = playerCode;
    this.numberSet = numberSet;

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
      // User guess functionality
      let userGuess = formatCode(this.guess.value);
      let userCount = this.checkCode(userGuess, this.compCode, "user");
      let userIcons = this.displayIcons(userCount.bullCount, userCount.cowCount);
      this.displayTableRow(turns, userGuess, userIcons, this.playerTable);
      if (userCount.bullCount == 4) {
        // End game here and stop computer from guessing
        this.finishGame(this.form, this.resultContainer, "Player wins", formatGuess(this.playerCode), formatGuess(this.compCode));
        return;
      }

      // Computer guess functionality
      let random = Math.floor(Math.random() * Math.floor(this.numberSet.length));
      let compGuess = this.numberSet[random];
      console.log(compGuess);

      let compCount = this.checkCode(compGuess, this.playerCode, "comp");
      let compIcons = this.displayIcons(compCount.bullCount, compCount.cowCount);
      this.displayTableRow(turns, compGuess, compIcons, this.compTable);
      if (compCount.bullCount == 4) {
        // End game here and stop computer from guessing
        this.finishGame(this.form, this.resultContainer, "Computer wins", formatGuess(this.playerCode), formatGuess(this.compCode));
        return;
      }
  
      // Call refineNumberSet function to check for bulls and if a match remove from array
      let afterGuess = this.refineNumberSet(this.playerCode, compGuess, this.numberSet);
      this.numberSet = afterGuess;

      console.log("-----------------------------------------------");
      console.log(`After ${turns} turns`);
      console.log("After array length: " + this.numberSet.length);
      console.log("-----------------------------------------------");
  
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

  refineNumberSet(code, guess, numbers) {

    let originalArray = numbers;
    // Find index of guess and then remove it from the array so it can't be guessed again
    let guessIndex = originalArray.indexOf(guess);
    if (guessIndex !== -1) {
      originalArray.splice(guessIndex, 1);
    }
    
    // Initialize empty array to hold refined guesses
    for (let i = 0; i < guess.length; i++) {
      // Check if the list of bulls contains the index - i.e. if bull has already been found

      // Check if there is a bull
      if (code[i] == guess[i]) {
        let bull = guess[i];

        // If there is a bull - create new array containing only codes that contain that bull in the correct position
        let filteredArray = originalArray.filter((num) => {
          return (num[i] == bull);
        });

        originalArray = filteredArray;
      
      }
    }

    // If a bull has been found, recursively call the function again to check for subsequent bulls
    /*
    if (bulls.length > prevBulls.length) {
      console.log("-----------------------------------------------");
      console.log("Recursion - call function a second time");
      console.log("Current Bulls count: " + bulls.length);
      console.log("Previous Bulls count: " + prevBulls.length);
      console.log("New array length: " + newArray.length);
      console.log("-----------------------------------------------");
      prevBulls.push(1);
      this.refineNumberSet(code, guess, bulls, prevBulls, newArray);
    }
    */

    // Return new array if altered, else return the original array (minus the spliced guess)
      return originalArray;

    }
}