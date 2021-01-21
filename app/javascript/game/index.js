import Easy from './modules/easy';
import Medium from './modules/medium';
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
    let numberSet = setup.createNumberSet();

    // Convert array of 5040 unique strings into array of arrays
    let numberArray = [...numberSet]
    let codesArray = numberArray.map((num) => {
      return formatCode(num);
    });

    console.log(numberSet);
    console.log(numberArray);
    console.log(codesArray);
    

    let player = formatCode(userCode);
    let level = levelSelection(levelCode);
    const computerName = capitalize(levelCode);
    //let computerName = setup.generateComputerPlayer();

    console.log(comp);
    console.log(player)
    console.log(level);

    const easy = new Easy();
    const medium = new Medium();
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
      easy.playGame(codesArray, comp, player);
    } else if (level == 2) {
      console.log("medium level selected");
      medium.playGame(codesArray, comp, player);
    } else if (level == 3) {
      console.log("hard level selected");
      //console.log(hard.playGame());
    }

  }

  testCodesHard(userCodeTest, bulls) {

    const setup = new Setup();
 
    // Create set
    let numberSet = setup.createNumberSet();

    // Convert array of 5040 unique strings into array of arrays
    let numberArray = [...numberSet]
    let codesArray = numberArray.map((num) => {
      return formatCode(num);
    });

    let compGuess = [1, 2, 3, 4];

    console.log("user code: " + userCodeTest);
    console.log("Before array length: " + codesArray.length);
    console.log("Original guess: " + compGuess);
    console.log("Bulls length: " + bulls.length);

    const cacheBulls = bulls.map(bull => bull);

    let afterGuess = this.refineNumberSetHard(userCodeTest, compGuess, bulls, cacheBulls, codesArray);
    this.numberSet = afterGuess.numbers;
    bulls = afterGuess.bulls;
    console.log("Cached bulls: " + cacheBulls.length);
    console.log("New bulls: " + bulls.length);

    console.log("-----------------------------------------------");
    console.log("Bulls (index): " + bulls);
    console.log("After array length: " + codesArray.length);
    console.log("-----------------------------------------------");
 }

 refineNumberSetHard(code, guess, bulls, prevBulls, numbers) {
  let originalArray = numbers;
  let guessIndex = originalArray.indexOf(guess);
  if (guessIndex !== -1) {
    originalArray.splice(guessIndex, 1);
  }
  
  let newArray = [];
  for (let i = 0; i < guess.length; i++) {

      if (code[i] == guess[i]) {
        let bull = guess[i];
        bulls.push(i);

        originalArray.forEach(num => {
          if (num[i] === bull) {
            newArray.push(num);
          }
        });

        break;
    } else {
      for (let j = 0; j < guess.length; j++) {
        if (code[i] == guess[j]) {
          let cow = guess[j];
          console.log(cow);
          
          originalArray.forEach(num => {
            if(num[i] == cow) {
              originalArray.splice(originalArray.indexOf())
            }
          })
        }
      }
    }
  }

  if (bulls.length > prevBulls.length) {
    console.log("-----------------------------------------------");
    console.log("Recursion - call function a second time");
    console.log("Current Bulls count: " + bulls.length);
    console.log("Previous Bulls count: " + prevBulls.length);
    console.log("New array length: " + newArray.length);
    console.log("-----------------------------------------------");
    prevBulls.push(1);
    this.refineNumberSetHard(code, guess, bulls, prevBulls, newArray);
  }
    if (newArray.length > 0) {
      return {
        numbers: newArray,
        bulls: bulls
      }
    } else {
      return {
        numbers: originalArray,
        bulls: bulls
      } 
    }
  }

  testCodesMedium(userCodeTest, bulls) {

     const setup = new Setup();
  
     // Create set
     let numberSet = setup.createNumberSet();
 
     // Convert array of 5040 unique strings into array of arrays
     let numberArray = [...numberSet]
     let codesArray = numberArray.map((num) => {
       return formatCode(num);
     });

     let compGuess = [1, 2, 3, 4];

     console.log("user code: " + userCodeTest);
     console.log("Before array length: " + codesArray.length);
     console.log("Original guess: " + compGuess);
     console.log("Bulls length: " + bulls.length);

     const cacheBulls = bulls.map(bull => bull);
 
     let afterGuess = this.refineNumberSetMedium(userCodeTest, compGuess, bulls, cacheBulls, codesArray);
     this.numberSet = afterGuess.numbers;
     bulls = afterGuess.bulls;
     console.log("Cached bulls: " + cacheBulls.length);
     console.log("New bulls: " + bulls.length);

     console.log("-----------------------------------------------");
     console.log("Bulls (index): " + bulls);
     console.log("After array length: " + codesArray.length);
     console.log("-----------------------------------------------");
  }

  refineNumberSetMedium(code, guess, bulls, prevBulls, numbers) {
    let originalArray = numbers;
    let guessIndex = originalArray.indexOf(guess);
    if (guessIndex !== -1) {
      originalArray.splice(guessIndex, 1);
    }
    
    let newArray = [];
    for (let i = 0; i < guess.length; i++) {
      if (!bulls.includes(i)) {
        if (code[i] == guess[i]) {
          let bull = guess[i];
          bulls.push(i);

          originalArray.forEach(num => {
            if (num[i] === bull) {
              newArray.push(num);
            }
          });

          break;
        }
      }
    }

    if (bulls.length > prevBulls.length) {
      console.log("-----------------------------------------------");
      console.log("Recursion - call function a second time");
      console.log("Current Bulls count: " + bulls.length);
      console.log("Previous Bulls count: " + prevBulls.length);
      console.log("New array length: " + newArray.length);
      console.log("-----------------------------------------------");
      prevBulls.push(1);
      this.refineNumberSetMedium(code, guess, bulls, prevBulls, newArray);
    }
      if (newArray.length > 0) {
        return {
          numbers: newArray,
          bulls: bulls
        }
      } else {
        return {
          numbers: originalArray,
          bulls: bulls
        } 
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
  // Testing
  const codeInputTest = document.querySelector('#userCodeTest');
  codeInput.focus();

  // Testing random code
  document.querySelector('.testing-code').addEventListener('click', (event) => {
    event.preventDefault();
    const userCodeTest = codeInputTest.value;
    const bulls = [];
    //game.testCodesMedium(userCodeTest, bulls);
    game.testCodesHard(userCodeTest, bulls);
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