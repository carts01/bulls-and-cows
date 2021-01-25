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
    radioLevel: '[name="level-group"]'
  }

  classes = {
    hidden: 'hidden',
    disabled: 'disabled',
    invalid: 'invalid'
  }
  
  start(userCode, levelCode) {

    const setup = new Setup();
    let comp = setup.getComputerCode();
 
    // Create set
    // let numberSet = setup.createNumberSet();

    // Convert array of 5040 unique strings into array of arrays
    // let numberArray = [...numberSet]
    // let codesArray = numberArray.map((num) => {
     //  return formatCode(num);
    // });

   // console.log(numberSet);
   // console.log(numberArray);
   // console.log(codesArray);
    
    let codesArray = codes();

    let player = formatCode(userCode);
    let level = levelSelection(levelCode);
    const computerName = capitalize(levelCode);
    //let computerName = setup.generateComputerPlayer();

    console.log(comp);
    console.log(player)
    console.log(level);

    const easy = new Easy();
    const medium = new Medium();
    const hard = new Hard();

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
    playerTableName.textContent = 'Player X';

    if (level == 1) {
      console.log("easy level selected");
      easy.playGame(codesArray, comp, player);
    } else if (level == 2) {
      console.log("medium level selected");
      medium.playGame(codesArray, comp, player);
    } else if (level == 3) {
      console.log("hard level selected");
      hard.playGame(codesArray, comp, player);
    }

  }
}

document.addEventListener('turbolinks:load', function() {
  const game = new Play();
  const form = document.querySelector(game.selectors.codeForm);
  const codeInput = document.querySelector(game.selectors.userCode);
  const errorContainer = document.querySelector(game.selectors.error);
  const playAgain = document.querySelector(game.selectors.replay);
  const radioLevel = document.querySelectorAll(game.selectors.radioLevel);
  codeInput.focus();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const levelCode = getRadioValue(radioLevel);
    console.log(event);
    const userCode = codeInput.value;
    const validCode = validateCode(userCode, errorContainer, codeInput);
    if (validCode) {
      game.start(userCode, levelCode);
    } else {
      return;
    }
  });

  playAgain.addEventListener('click', (event) => {
    event.preventDefault();
    location.reload();
  })
});