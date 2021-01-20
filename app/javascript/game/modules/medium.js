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

    console.log("Number Set:" + this.numberSet.length);
    console.log("Comp code: " + this.compCode);

    this.setup = new Setup();

    let turns = 1;
    // Initialize array to hold bulls that are found
    let bulls = [];
    
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

      console.log("User code: " + this.playerCode);
      console.log("Before array length: " + this.numberSet.length);
      console.log("Original guess: " + compGuess);
      console.log("Bulls length: " + bulls.length);
  
      let afterGuess = this.checkBulls(this.playerCode, compGuess, bulls, this.numberSet);
      this.numberSet = afterGuess.numbers;
      bulls = afterGuess.bullIndex;

      console.log("-----------------------------------------------");
      console.log(`After ${turns} turns`);
      console.log(afterGuess);
      console.log("Bulls: " + bulls);
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

  checkBulls(code, guess, bullIndex, numbers) {
    // Loop through numbers (which will be a new array each time - if it has been whittled down accordingly)
    // Use logic above to check codes against guesses
    // Bulls are passed in so we can check that we aren't checking them multiple time
    const originalArray = numbers;
    let newArray = [];
    for (let i = 0; i < guess.length; i++) {
      console.log(i + ": " + bullIndex.includes(i));
      // Check if the list of bulls contains the index - i.e. if bull has already been found
      if (!bullIndex.includes(i)) {

      // Check if there is a bull
      if (code[i] == guess[i]) {
        let bull = guess[i];
        bullIndex.push(i);

        // If there is a bull - create new array containing only codes that contain that bull in the correct position
        originalArray.forEach(num => {
          if (num[i] === bull) {
            newArray.push(num);
          }
        });

        break;
        }
      }
    }

    console.log("Bulls (in check bulls): " + bullIndex);

    // Return values
      if (newArray.length > 0) {
        return {
          numbers: newArray,
          bullIndex: bullIndex
        }
      } else {
        return {
          numbers: originalArray,
          bullIndex: bullIndex
        } 
      }

    }
}