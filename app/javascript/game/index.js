import Easy from './modules/easy';
// import { setup } from './modules/setup_module';
import Setup from './modules/setup_class'
import { formatCode, levelSelection } from '../helpers/index'

// console.log(sayHi());
// console.log(setup());
// const playerCode = setup().playerCode;
// console.log(playerCode);
document.addEventListener('turbolinks:load', function() {
  //const newGame = new Setup();
  //console.log(newGame);
  //console.log(newGame.init());
  //const computerCode = newGame.getComputerCode();
  //const playerCode = newGame.getPlayerCode();
  //const numberSet = newGame.createNumberSet();

  //const easy = new Easy(numberSet, computerCode, playerCode);

  //console.log(easy.playGame());

});

const EASY = 1;
const MEDIUM = 2;
const HARD = 3;

const YES = 1;
const NO = 2;

class Play {
  
  start() {

    const newGame = new Setup();
    let comp = newGame.getComputerCode();
    let numberSet = newGame.createNumberSet();
    let player = formatCode(document.querySelector('#userCode').value);
    let level = levelSelection(document.querySelector('#levelSelect').value);
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
  //const newGame = new Setup();
  //console.log(newGame);
  //console.log(newGame.init());
  //const computerCode = newGame.getComputerCode();
  //const playerCode = newGame.getPlayerCode();
  //const numberSet = newGame.createNumberSet();

  //const easy = new Easy(numberSet, computerCode, playerCode);

  //console.log(easy.playGame());

  const game = new Play();
  const form = document.querySelector('#codeForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    game.start();
  });
});