import Easy from './modules/easy';
import Medium from './modules/medium';
import Setup from './modules/setup';
import { formatCode, levelSelection, getRadioValue, validateCode, capitalize } from '../helpers/index';

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

  testCodes() {
    const setup = new Setup();
    let numberSet = setup.createNumberSet();
    let numberArray = [...numberSet]
    let random = Math.floor(Math.random() * Math.floor(numberArray.length));
    // let compGuess = numberArray[random];
    let compGuess = [1, 4, 7, 9];
    // let userCode = setup.getComputerCode();
    let userCode = [1, 5, 3, 2];
    console.log("Original array length: " + numberArray.length);
    console.log(userCode);
    console.log("Original guess: " + compGuess);
    let newArray = [];
    let index = 0;
    for (let i = 0; i < compGuess.length; i++) {
      // Check if there is a bull
      if (userCode[i] == compGuess[i]) {
        let bull = compGuess[i];
        console.log("Bull: " + compGuess[i]);
        console.log("Index: " + i);
        index = i;

        // If there is a bull - create new array containing only codes that contain that bull in the correct position
        numberArray.forEach(num => {
          if (num[i] === bull) {
            newArray.push(num);
          }
        });

        break;
        }
      }

      console.log(newArray);

      let indexTwo = 0;
      let thirdArray = [];
      if (newArray.length > 0) {
        let newRandom = Math.floor(Math.random() * Math.floor(newArray.length));
        // let secondGuess = newArray[newRandom];
        let secondGuess = [1, 6, 4, 2];
        console.log('Second Guess: ' + secondGuess);
        for (let i = 0; i < secondGuess.length; i++) {
          console.log("First bull: " + userCode[index]);
          // Check if there is a bull
          
          if (i !== index) {
            if (userCode[i] == secondGuess[i]) {
              let secondBull = secondGuess[i];
              console.log("Bull (2nd round): " + secondBull);
              console.log("Index (2nd round): " + i);
              indexTwo = i;
      
              // If there is a bull - create new array containing only codes that contain that bull in the correct position
              newArray.forEach(num => {
                if (num[i] === secondBull) {
                  thirdArray.push(num);
                }
              });
            
              }
          } 
          }
          console.log(thirdArray);
      }

      let fourthArray = [];
      if (thirdArray.length > 0) {
        let newRandom = Math.floor(Math.random() * Math.floor(newArray.length));
        // let secondGuess = newArray[newRandom];
        let thirdGuess = [1, 6, 3, 2];
        console.log('Third Guess: ' + thirdGuess);
        for (let i = 0; i < thirdGuess.length; i++) {
          console.log("First bull: " + userCode[index]);
          console.log("Second bull: " + userCode[indexTwo]);
          // Check if there is a bull
          
          if (i !== index && i !== indexTwo) {
            if (userCode[i] == thirdGuess[i]) {
              let thirdBull = thirdGuess[i];
              console.log("Bull (3rd round): " + thirdBull);
              console.log("Index (3rd round): " + i);
      
              // If there is a bull - create new array containing only codes that contain that bull in the correct position
              thirdArray.forEach(num => {
                if (num[i] === thirdBull) {
                  fourthArray.push(num);
                }
              });
            
              }
          } 
          }
          console.log(fourthArray);
      }

     
    
  }

  checkBulls(code, guess, bulls, numbers) {
    // Loop through numbers (which will be a new array each time - if it has been whittled down accordingly)
    // Use logic above to check codes against guesses
    // Bulls are passed in so we can check that we aren't checking them multiple times
  }
  
  start(userCode, levelCode) {

    const setup = new Setup();
    let comp = setup.getComputerCode();
    let numberSet = setup.createNumberSet();
    let player = formatCode(userCode);
    let level = levelSelection(levelCode);
    const computerName = capitalize(levelCode);
    //let computerName = setup.generateComputerPlayer();

    console.log(comp);
    console.log(player)
    console.log(level);

    console.log(typeof numberSet);
    const easy = new Easy();
    const medium = new Medium(numberSet, comp, player);
    //const hard = new Hard(numberSet, comp, player);

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
      easy.playGame(numberSet, comp, player);
    } else if (level == 2) {
      console.log("medium level selected");
      medium.playGame(numberSet, comp, player);
    } else if (level == 3) {
      console.log("hard level selected");
      //console.log(hard.playGame());
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

  // Testing random code
  document.querySelector('.testing-code').addEventListener('click', (event) => {
    event.preventDefault();
    game.testCodes();
  })

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