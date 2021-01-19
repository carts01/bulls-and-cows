import Setup from './setup';
import { formatGuess, createImageElement, finishGame } from '../../helpers'

import bullSVG from '../../images/bull.svg';
import cowSVG from '../../images/sacred-cow.svg';

export default class Play {

  constructor () {
    this.form = document.querySelector(this.selectors.form);
    this.guess = document.querySelector(this.selectors.guess);
    this.resultContainer = document.querySelector(this.selectors.resultContainer);
    this.errorContainer = document.querySelector(this.selectors.errorContainer);
    this.playerTable = document.querySelector(this.selectors.playerTable);
    this.compTable = document.querySelector(this.selectors.compTable);
  }

  selectors = {
    form: '#guessForm',
    guess: '#userGuess',
    messageContainer: '.message-container',
    resultContainer: '.result-container',
    errorContainer: '.guess-error',
    playerTable: '.players-table',
    compTable: '.comp-table',
    replay: '.play-again'
  }

  classes = {
    hidden: 'hidden',
    disabled: 'disabled'
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
    if (table.classList.contains(this.classes.hidden)) {
      table.classList.remove(this.classes.hidden);
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
    const bullList = document.createElement('div');
    const bullIcons = document.createElement('div');
    for (let i = 0; i < bullCount; i++) {
      createImageElement(bullIcons, bullSVG, 'svg-icon');
    }
  
    const cowList = document.createElement('div');
    const cowIcons = document.createElement('div');
    for (let i = 0; i < cowCount; i++) {
      createImageElement(cowIcons, cowSVG, 'svg-icon');
    }
  
    bullList.appendChild(bullIcons);
    cowList.appendChild(cowIcons);

    return {
      bulls: bullList,
      cows: cowList
     }
  }

  finishGame(form, element, message, playerCode, compCode) {
    form.classList.add(this.classes.hidden);
    element.textContent = `Your code: ${playerCode} / Computer's code: ${compCode} / Result: ${message}`;
    const playAgain = document.querySelector(this.selectors.replay);
    playAgain.classList.remove(this.classes.hidden);
    playAgain.removeAttribute('disabled');
  }

}