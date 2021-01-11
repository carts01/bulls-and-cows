// Create a set containing all 5040 unique combinations
//let numberSet = Array.from(newGame._createNumberSet());
//console.log(numberSet.length);

// Create a random code for the player to guess
//let code = newGame._getComputerCode();
//console.log(code);

// Easy game play

import Setup from './setup_class';
import Play from './play';

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
    while (turns <= 7) {
      // User guess
      let userGuess = this.setup.getPlayerCode();
      //let userInput = this.getUserGuess();
      //console.log(userInput);
      //let computerCode = computerCode;
      let bullCount = this.getBulls(this.compCode, userGuess);
      let cowCount = this.getCows(this.compCode, userGuess);
      console.log("-------Player----------")
      console.log("Player guess: " + userGuess);
      console.log("Bulls: " + bullCount + " / Cows: " + cowCount)
      console.log(" ")
      if (bullCount == 4) {
        console.log('Player wins');
        break;
      } 

      // Computer guess
      let compGuess = this.setup.getComputerCode();
      //let playerCode = playerCode;
      let compBullCount = this.getBulls(this.playerCode, compGuess);
      let compCowCount = this.getCows(this.playerCode, compGuess);
      console.log("-------Computer----------")
      console.log("Comp guess: " + compGuess);
      console.log("Bulls: " + compBullCount + " / Cows: " + compCowCount)
      console.log(" ")
      if (compBullCount == 4) {
        console.log('Computer wins');
        break;
      } 

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
    }
  }
}