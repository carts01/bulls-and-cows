// Create a set containing all 5040 unique combinations
//let numberSet = Array.from(newGame._createNumberSet());
//console.log(numberSet.length);

// Create a random code for the player to guess
//let code = newGame._getComputerCode();
//console.log(code);

// Easy game play

import Setup from './setup_class';
import Play from './play';
import { formatCode, resetTurn, finishGame } from '../../helpers';

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
    const userTable = document.querySelector('.players__table');
    const compTable = document.querySelector('.comp__table');
    
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      guess.setAttribute('disabled', true);
      let userGuess = formatCode(guess.value);
      let userCount = this.checkCode(userGuess, computerCode, "user");
      this.displayTableRow(turns, userGuess, userCount, userTable);
      if (userCount.bullCount == 4) {
        // End game here and stop computer from guessing
        finishGame(form, resultContainer, "Player wins");
        return;
      }
      let compGuess = this.setup.getComputerCode();
      let compCount = this.checkCode(compGuess, playerCode, "comp");
      this.displayTableRow(turns, compGuess, compCount, compTable);
      if (compCount.bullCount == 4) {
        // End game here and stop computer from guessing
        finishGame(form, resultContainer, "Computer wins");
        return;
      }
      turns++;
      if (turns > 7) {
        finishGame(form, resultContainer, "Draw");
        return;
      }
      // Function to wait a second or so
      setTimeout(resetTurn, 1000, guess);
      console.log('1000ms later');
    });

  }
}