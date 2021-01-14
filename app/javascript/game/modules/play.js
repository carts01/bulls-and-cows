import Setup from './setup_class';
import { formatGuess, finishGame } from '../../helpers'

import bullSVG from '../../images/bull.svg';
import cowSVG from '../../images/sacred-cow.svg';

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

    const form = document.querySelector('#guessForm');
    const messageContainer = document.querySelector('.message-container');

    if (player == "user") {
      let bullCount = this.getBulls(code, guess);
      let cowCount = this.getCows(code, guess);
      console.log("-------Player----------")
      console.log("Player guess: " + guess);
      console.log("Bulls: " + bullCount + " / Cows: " + cowCount)
      console.log(" ")
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
      return {
        bullCount,
        cowCount
      }
    }
  }

  displayTableRow(turn, guess, icons, table) {
    if (table.classList.contains('hidden')) {
      table.classList.remove('hidden');
    }
    const tableBody = table.querySelector('tbody');
    const data = [turn, formatGuess(guess), icons.bulls.innerHTML, icons.cows.innerHTML];
    let tableRow = document.createElement('tr');
    data.forEach((elem) => {
      let tableData = document.createElement('td');
      tableData.innerHTML = elem;
      tableRow.appendChild(tableData);
    });
    tableBody.appendChild(tableRow);
  }

  displayIcons(bullCount, cowCount) {
    // Create images and then output them in results table
    // Use a loop to determine how many to show
    const bullList = document.createElement('div');
    const bullIcons = document.createElement('div');
    for (let i = 0; i < bullCount; i++) {
      var bullImage = document.createElement("img"); 
      bullImage.src = bullSVG; 
      bullImage.classList.add('svg-icon');
      bullIcons.appendChild(bullImage);
    }
  
    const cowList = document.createElement('div');
    const cowIcons = document.createElement('div');
    for (let i = 0; i < cowCount; i++) {
      var cowImage = document.createElement("img"); 
      cowImage.src = cowSVG; 
      cowImage.classList.add('svg-icon');
      cowIcons.appendChild(cowImage);
    }
  
    bullList.appendChild(bullIcons);
    cowList.appendChild(cowIcons);
    return {
      bulls: bullList,
      cows: cowList
     }
  }

  finishGame(form, element, message, playerCode, compCode) {
    form.classList.add('hidden');
    element.textContent = `Your code: ${playerCode} / Computer's code: ${compCode} / Result: ${message}`;
    const playAgain = document.querySelector('.play-again');
    playAgain.classList.remove('hidden');
    playAgain.removeAttribute('disabled');
  }

}