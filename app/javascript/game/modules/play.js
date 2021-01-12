import Setup from './setup_class';
import { formatGuess } from '../../helpers'

export default class Play {

  constructor () {
    
  }

  playGame(compCode, playerCode) {
    console.log('to be overridden in level-specific classes');
  }

  getBulls(code, guess) {
    let bullCount = 0;
    let bulls = [];

    let i = 0;
    while (i < code.length && i < guess.length) {
      if (code[i] == guess[i]) {
        bullCount += 1;
        bulls.push(code[i]);
      }
      i++;
    }

    return bullCount;
  }

  getCows(code, guess) {
    let cowCount = 0;
    let cows = [];

    for (let i = 0; i < code.length; i++) {
      if (code[i] != guess[i]) {
        for (let j = 0; j < guess.length; j++) {
          if (code[i] == guess[j]) {
            cowCount += 1;
            cows.push(guess[j]);
          }
        }
      }
    }

    return cowCount;
  }

  checkCode(guess, code, player) {
    if (player == "user") {
      let bullCount = this.getBulls(code, guess);
      let cowCount = this.getCows(code, guess);
      console.log("-------Player----------")
      console.log("Player guess: " + guess);
      console.log("Bulls: " + bullCount + " / Cows: " + cowCount)
      console.log(" ")
      if (bullCount == 4) {
        console.log('Player wins');
        // function to end game
      } 
      return {
        bullCount,
        cowCount
      }
    } else if (player == "comp") {
      let bullCount = this.getBulls(code, guess);
      let cowCount = this.getCows(code, guess);
      console.log("-------Computer----------")
      console.log("Comp guess: " + guess);
      console.log("Bulls: " + bullCount + " / Cows: " + cowCount)
      console.log(" ")
      if (bullCount == 4) {
        console.log('Computer wins');
        // function to end game
      } 
      return {
        bullCount,
        cowCount
      }
    }
  }

  displayTableRow(turn, guess, count, table) {
    const data = [turn, formatGuess(guess), count.bullCount, count.cowCount];
    let tableRow = document.createElement('tr');
    data.forEach((elem) => {
      let tableData = document.createElement('td');
      tableData.innerHTML = elem;
      tableRow.appendChild(tableData);
    });
    table.appendChild(tableRow);
  }

}