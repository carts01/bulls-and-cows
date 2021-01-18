// Create a set containing all 5040 unique combinations
//let numberSet = Array.from(newGame._createNumberSet());
//console.log(numberSet.length);

// Create a random code for the player to guess
//let code = newGame._getComputerCode();
//console.log(code);

// Easy game play

import Setup from './setup_class';
import Play from './play';
import { formatCode, resetTurn, validateCode, formatGuess } from '../../helpers';

export default class Easy extends Play {
  
  constructor() {
    super();
  }

  playGame(numberSet, computerCode, playerCode) {

    this.compCode = computerCode;
    this.playerCode = playerCode;
    console.log(this.compCode);

    this.setup = new Setup();

    let turns = 1;

    const form = document.querySelector('#guessForm');
    const guess = document.querySelector('#userGuess');
    const resultContainer = document.querySelector('.result-container');
    const errorContainer = document.querySelector('.guess-error');
    const userTable = document.querySelector('.players-table');
    const compTable = document.querySelector('.comp-table');
    
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      guess.setAttribute('disabled', true);
      const validCode = validateCode(guess.value, errorContainer, guess);
      if (validCode == false) {
        setTimeout(resetTurn, 100, guess);
        return;
      }
      let userGuess = formatCode(guess.value);
      let userCount = this.checkCode(userGuess, computerCode, "user");
      let userIcons = this.displayIcons(userCount.bullCount, userCount.cowCount);
      this.displayTableRow(turns, userGuess, userIcons, userTable);
      if (userCount.bullCount == 4) {
        // End game here and stop computer from guessing
        this.finishGame(form, resultContainer, "Player wins", formatGuess(this.playerCode), formatGuess(this.compCode));
        return;
      }
      let compGuess = this.setup.getComputerCode();
      let compCount = this.checkCode(compGuess, playerCode, "comp");
      let compIcons = this.displayIcons(compCount.bullCount, compCount.cowCount);
      this.displayTableRow(turns, compGuess, compIcons, compTable);
      if (compCount.bullCount == 4) {
        // End game here and stop computer from guessing
        this.finishGame(form, resultContainer, "Computer wins", formatGuess(this.playerCode), formatGuess(this.compCode));
        return;
      }
      turns++;
      if (turns > 7) {
        this.finishGame(form, resultContainer, "Draw", formatGuess(this.playerCode), formatGuess(this.compCode));
        return;
      }
      // Function to wait a second or so
      setTimeout(resetTurn, 1000, guess);
      console.log('1000ms later');
    });

  }
}