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

  playGame(codesArray, computerCode, playerCode, computerName, playerName) {

    // Initialize values for codes, the computer's code and the player's code
    this.codesArray = codesArray;
    this.compCode = computerCode;
    this.playerCode = playerCode;
    this.computerName = computerName;
    this.playerName = playerName;

     // Initialize level variable
     const level = 3;

    // Initialize turns variable to 1 (each round increments this by 1)
    let turns = 1;
    
    this.form.addEventListener('submit', (event) => {

      event.preventDefault();
      this.guess.setAttribute('disabled', true);
      const validCode = validateCode(this.guess.value, this.errorContainer, this.guess);
      if (validCode == false) {
        setTimeout(resetTurn, 100, this.guess);
        return;
      }

      // This can be put into a re-usable function

      // Show progress bar
      if (this.progressBarContainer.classList.contains(this.classes.hidden)) {
        this.progressBarContainer.classList.remove(this.classes.hidden);
      }

      // Update progress bar
      const percentagePlayed = (turns / 7) * 100;
      this.progressBar.style.width = `${percentagePlayed}%`;
      this.progressBar.dataset.filled = turns;

      // This can be put into a re-usable function

      // User guess functionality
      let userGuess = formatCode(this.guess.value);
      let userCount = this.checkCode(userGuess, this.compCode, "user");
      let userIcons = this.displayIcons(userCount.bullCount, userCount.cowCount);
      this.displayTableRow(turns, userGuess, userIcons, this.playerTable);
      if (userCount.bullCount == 4) {
        // End game here and stop computer from guessing
        this.finishGame(this.form, this.resultContainer, `${this.playerName} wins!`, formatGuess(this.playerCode), formatGuess(this.compCode));
        this.saveGame(this.saveForm, true, false, false, turns, level, formatGuess(this.playerCode), formatGuess(this.compCode));
        return;
      }

      // This can be put into a re-usable function

      // Computer guess functionality
      let random = Math.floor(Math.random() * Math.floor(this.codesArray.length));
      let compGuess = this.codesArray[random];
      let compCount = this.checkCode(compGuess, this.playerCode, "comp");
      let compIcons = this.displayIcons(compCount.bullCount, compCount.cowCount);
      this.displayTableRow(turns, compGuess, compIcons, this.compTable);
      if (compCount.bullCount == 4) {
        // End game here and stop computer from guessing
        this.finishGame(this.form, this.resultContainer, `${this.computerName} wins!`, formatGuess(this.playerCode), formatGuess(this.compCode));
        this.saveGame(this.saveForm, false, false, true, turns, level, formatGuess(this.playerCode), formatGuess(this.compCode));
        return;
      }
  
      // Call refineNumberSet function to check for bulls and cows and refine number set accordingly
      let afterGuess = this.refineCodesArray(this.playerCode, compGuess, this.codesArray);
      this.codesArray = afterGuess;
      console.log(this.codesArray);
  
      turns++;
      if (turns > 7) {
        // End game here and declare the result a draw
        this.finishGame(this.form, this.resultContainer, "It's a tie!", formatGuess(this.playerCode), formatGuess(this.compCode));
        this.saveGame(this.saveForm, false, true, false, (turns - 1), level, formatGuess(this.playerCode), formatGuess(this.compCode));
        return;
      }
      // Function to wait a second or so
      setTimeout(resetTurn, 1000, this.guess);
      console.log('1000ms later');
    });

  }

  refineCodesArray(code, guess, numbers) {
    let originalArray = numbers;
    // Find index of guess and then remove it from the array so it can't be guessed again
    const guessIndex = originalArray.indexOf(guess);
    originalArray.splice(guessIndex, 1);
 
    // Loop through the digits of the guess and check if there are any bulls and/or cows
    let bullsFound = 0;

    for (let i = 0; i < guess.length; i++) {
      // If there is a bull then filter array to remove non-matching codes
        if (code[i] == guess[i]) {
          let bull = guess[i];
  
          let filteredArray = originalArray.filter((num) => {
            return (num[i] == bull);
          });
  
          originalArray = filteredArray;

          bullsFound += 1;

        } else {
          // If there isn't a bull, then loop through and check for cows
          for (let j = 0; j < guess.length; j++) {
              if (code[i] == guess[j]) {
                let cow = code[i];

                // If there is a cow then filter out all codes that don't include this digit
                // Also need to filter out codes with the cow but in the wrong position
                let filteredArray = originalArray.filter((num) => {
                  return num[j] != code[i];
                });
  
                originalArray = filteredArray;

                let filteredArrayTwo = originalArray.filter((num) => {
                  return num.includes(cow);
                });
  
                originalArray = filteredArrayTwo;

              } 
          }
      }
    }
  
      return originalArray;
    }

}