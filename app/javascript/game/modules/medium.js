// Medium game play

import Setup from './setup';
import Play from './play';
import { formatCode, resetTurn, validateCode, formatGuess } from '../../helpers';

export default class Medium extends Play {
  
  constructor() {
    super();
  }

  playGame(codesArray, computerCode, playerCode) {

    // Initialize values for codes, the computer's code and the player's code
    this.codesArray = codesArray;
    this.compCode = computerCode;
    this.playerCode = playerCode;

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

      // Show progress bar
      if (this.progressBarContainer.classList.contains(this.classes.hidden)) {
        this.progressBarContainer.classList.remove(this.classes.hidden);
      }

      // Update progress bar
      const percentagePlayed = (turns / 7) * 100;
      this.progressBar.style.width = `${percentagePlayed}%`;
      this.progressBar.dataset.filled = turns;

      // Check user guess against computer code and display results
      let userGuess = formatCode(this.guess.value);
      let userCount = this.checkCode(userGuess, this.compCode, "user");
      let userIcons = this.displayIcons(userCount.bullCount, userCount.cowCount);
      this.displayTableRow(turns, userGuess, userIcons, this.playerTable);
      if (userCount.bullCount == 4) {
        // End game here and stop computer from guessing
        this.finishGame(this.form, this.resultContainer, "Player wins", formatGuess(this.playerCode), formatGuess(this.compCode));
        this.saveGame(this.saveForm, true, false, false, turns);
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
        this.saveGame(this.saveForm, false, false, true, turns);
        return;
      }
  
      // Reassign codesArray variable to be equal to the array after it has been whittled down
      let afterGuess = this.refineCodesArray(this.playerCode, compGuess, this.codesArray);
      this.codesArray = afterGuess;
  
      turns++;
      if (turns > 7) {
        // End game here and declare the result a draw
        this.finishGame(this.form, this.resultContainer, "Draw", formatGuess(this.playerCode), formatGuess(this.compCode));
        this.saveGame(this.saveForm, false, true, false, (turns - 1));
        return;
      }
      // Function to wait a second or so before new round is available to play
      setTimeout(resetTurn, 1000, this.guess);
      console.log('1000ms later');
    });

  }

  refineCodesArray(code, guess, numbers) {
    let originalArray = numbers;
    // Find index of guess and then remove it from the array so it can't be guessed again
    const guessIndex = originalArray.indexOf(guess);
    originalArray.splice(guessIndex, 1);
    
    // Loop through the digits of the guess and check if there are any bulls
    for (let i = 0; i < guess.length; i++) {
      if (code[i] == guess[i]) {
        let bull = guess[i];
        // If there is a bull - filter array to remove all codes that don't contain that bull
        let filteredArray = originalArray.filter((num) => {
          return (num[i] == bull);
        });
        originalArray = filteredArray;
      }
    }
    
    // Return filtered array
    return originalArray;

    }
}