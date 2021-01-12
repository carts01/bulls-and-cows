// Create a set containing all 5040 unique combinations
//let numberSet = Array.from(newGame._createNumberSet());
//console.log(numberSet.length);

// Create a random code for the player to guess
//let code = newGame._getComputerCode();
//console.log(code);

// Easy game play

import Setup from './setup_class';
import Play from './play';
import { formatCode, resetTurn } from '../../helpers';

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
    // get user guess from DOM and add it to userGuess variable
    // temporarily disable input in DOM
    // check bulls and cows
    // Display results
    // Repeat for computer guess
    // Increment turns (and display how many turns gone)
    // Enable input for next round

    const form = document.querySelector('#guessForm');
    const guess = document.querySelector('#userGuess');
    const userTable = document.querySelector('.players__table--body');
    const compTable = document.querySelector('.comp__table--body');
    
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      guess.setAttribute('disabled', true);
      let userGuess = formatCode(guess.value);
      let userCount = this.checkCode(userGuess, computerCode, "user");
      let compGuess = this.setup.getComputerCode();
      let compCount = this.checkCode(compGuess, playerCode, "comp");
      console.log(compCount);
      console.log('Turns: ' + turns);
      this.displayTableRow(turns, userGuess, userCount, userTable);
      this.displayTableRow(turns, compGuess, compCount, compTable);
      turns++;
      // Function to wait a second or so
      setTimeout(resetTurn, 1000, guess);
      console.log('1000ms later');
    });

    /*while (turns <= 7) {
      // User guess
      // let userGuess = this.setup.getPlayerCode();
      //let userInput = this.getUserGuess();
      //console.log(userInput);
      //let computerCode = computerCode;

      let userGuess = false;

      userGuess = formatCode(document.querySelector('#userGuess').value);

      // Remove from array the codes that have already been guessed
      //console.log(typeof compGuess);
      //console.log(typeof numberSet[0]);
      //const found = numberSet.indexOf(compGuess);
      //console.log(found);
      //numberSet.splice(found, 1);
      //console.log(numberSet.length)

      turns++;

      // End of game (draw)
      if (turns == 8) {
        console.log("Draw")
      }
    }*/
  }
}