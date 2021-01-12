import Easy from './modules/easy';
// import { setup } from './modules/setup_module';
import Setup from './modules/setup_class'
import { formatCode, levelSelection, getRadioValue } from '../helpers/index'

const EASY = 1;
const MEDIUM = 2;
const HARD = 3;

const YES = 1;
const NO = 2;

class Play {
  
  start(userCode, levelCode) {

    const setup = new Setup();
    let comp = setup.getComputerCode();
    let numberSet = setup.createNumberSet();
    let player = formatCode(userCode);
    let level = levelSelection(levelCode);
    console.log(comp);
    console.log(numberSet.size);
    console.log(player)
    console.log(level);

    console.log(typeof numberSet);
    const easy = new Easy();
    //const medium = new Medium(numberSet, comp, player);
    //const hard = new Hard(numberSet, comp, player);

    if (level == 1) {
      console.log("easy level selected");
      document.querySelector('#codeForm').classList.add('hidden');
      document.querySelector('#guessForm').classList.remove('hidden');
      document.querySelector('.show-user-code').textContent = userCode;
      easy.playGame(numberSet, comp, player);
    } else if (level == 2) {
      console.log("medium level selected");
      //console.log(medium.playGame());
    } else if (level == 3) {
      console.log("hard level selected");
      //console.log(hard.playGame());
    }

  }
}

document.addEventListener('turbolinks:load', function() {
  const game = new Play();
  const form = document.querySelector('#codeForm');
  const playAgain = document.querySelector('.play-again');
  const radioLevel = document.querySelectorAll('[name="level-group"]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // This needs to be fixed up
    // const levelCode = event.target[2].value;
    const userCode = event.target[0].value;
    const levelCode = getRadioValue(radioLevel);
    // console.log(radioLevel);
    game.start(userCode, levelCode);
  });
  playAgain.addEventListener('click', (event) => {
    event.preventDefault();
    location.reload();
  })
});