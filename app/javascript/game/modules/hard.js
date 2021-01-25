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
  
      // Call refineNumberSet function to check for bulls and cows and refine number set accordingly
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
    let guessIndex = originalArray.indexOf(guess);
    if (guessIndex !== -1) {
      originalArray.splice(guessIndex, 1);
    }
 
    for (let i = 0; i < guess.length; i++) {
        if (code[i] == guess[i]) {
          let bull = guess[i];
  
          let filteredArray = originalArray.filter((num) => {
            return (num[i] == bull);
          });
  
          originalArray = filteredArray;

        } else {

          for (let j = 0; j < guess.length; j++) {
              if (code[i] == guess[j]) {
                let cow = parseInt(code[i]);
  
                let filteredArray = originalArray.filter((num) => {
                  return (num.includes(cow));
                });
  
                originalArray = filteredArray;
              }
          }
      }
    }
  
      return originalArray;
    }

}