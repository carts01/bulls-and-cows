import Easy from './modules/easy';
import Medium from './modules/medium';
import Hard from './modules/hard';
import Setup from './modules/setup';
import { formatCode, levelSelection, getRadioValue, validateCode, capitalize } from '../helpers/index';
import { codes } from '../helpers/codes';

class Play {

  selectors = {
    codeForm: '#codeForm',
    guessForm: '#guessForm',
    userCode: '#userCode',
    showUser: '.show-user-code',
    userGuessLabel: 'label[for=userGuess]',
    compTableName: '.comp-table--name',
    playerTableName: '.players-table--name',
    error: '.code-error',
    replay: '.play-again',
    radioLevel: '[name="level-group"]',
    sessionUserName: '#sessionUserName'
  }

  classes = {
    hidden: 'hidden',
    disabled: 'disabled',
    invalid: 'invalid'
  }
  
  start(userCode, levelCode) {

    // Get set of 5040 unique codes
    const codesArray = codes();

    // Set up computer player (code, name and level)
    const setup = new Setup();
    const comp = setup.getComputerCode();
    const computerName = capitalize(levelCode);
    const playerName = document.querySelector(this.selectors.sessionUserName);
    const level = levelSelection(levelCode);
 
    // Set up user player
    const player = formatCode(userCode);
    /* Need to get name of player */

    // Create set
    // let numberSet = setup.createNumberSet();

    // Convert array of 5040 unique strings into array of arrays
    // let numberArray = [...numberSet]
    // let codesArray = numberArray.map((num) => {
     //  return formatCode(num);
    // });

    // Set up the game UI 
    /*
      - Hide original code submission form
      - Show new guessing form
      - Show user's secret code
      - Set up table to display results of each round
    */
    const codeForm = document.querySelector(this.selectors.codeForm);
    const guessForm = document.querySelector(this.selectors.guessForm);
    const userCodeContainer = document.querySelector(this.selectors.showUser);
    const userGuessLabel = document.querySelector(this.selectors.userGuessLabel);
    const compTableName = document.querySelector(this.selectors.compTableName);
    const playerTableName = document.querySelector(this.selectors.playerTableName);
    
    codeForm.classList.add(this.classes.hidden);
    guessForm.classList.remove(this.classes.hidden);
    userCodeContainer.textContent = `Your secret code is ${userCode}`;
    userGuessLabel.textContent = `Guess ${computerName}'s secret code`;
    compTableName.textContent = computerName;
    playerTableName.textContent = playerName !== null ? playerName.value : 'Guest';

    // Initialize and play game of selected level
    if (level == 1) {
      const easy = new Easy();
      easy.playGame(codesArray, comp, player, computerName, (playerName !== null ? playerName.value : 'Guest'));
    } else if (level == 2) {
      const medium = new Medium();
      medium.playGame(codesArray, comp, player, computerName, (playerName !== null ? playerName.value : 'Guest'));
    } else if (level == 3) {
      const hard = new Hard();
      hard.playGame(codesArray, comp, player, computerName, (playerName !== null ? playerName.value : 'Guest'));
    }

  }

}

document.addEventListener('turbolinks:load', function() {
  // On document load - initialize Play class
  const game = new Play();
  // Set up selectors for initial code submission stage
  const form = document.querySelector(game.selectors.codeForm);
  const errorContainer = document.querySelector(game.selectors.error);
  const playAgain = document.querySelector(game.selectors.replay);
  const radioLevel = document.querySelectorAll(game.selectors.radioLevel);
  const codeInput = document.querySelector(game.selectors.userCode);
  if (codeInput !== null || codeInput !== null) {
    codeInput.focus();
  }

  // Set pre-checked input to be equal to the last level selected
  if (radioLevel != null || radioLevel != undefined) {
    const preferredLevel = localStorage.getItem('preferredLevel');
    if (preferredLevel == 'bruce') {
      //console.log('bruce');
      radioLevel[0].checked = true;
    } else if (preferredLevel == 'judy') {
      //console.log('judy');
      radioLevel[1].checked = true;
    } else if (preferredLevel == 'lionel') {
      //console.log('lionel');
      radioLevel[2].checked = true;
    }
  }

  // Add event listener on initial code submission form
  if (form !== null) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      // Get selected level and user code
      const levelCode = getRadioValue(radioLevel);
      // Save selected level using localStorage
      localStorage.setItem('preferredLevel', levelCode);
      // Get user code and check it is valid - if so start game else return
      const userCode = codeInput.value;
      const validCode = validateCode(userCode, errorContainer, codeInput);
      if (validCode) {
        game.start(userCode, levelCode);
      } else {
        return;
      }
    });
  }

  // Add event listener for playing again (this is hidden until game is complete)
  playAgain.addEventListener('click', (event) => {
    event.preventDefault();
    location.reload();
  })
});