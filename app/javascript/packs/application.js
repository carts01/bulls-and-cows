// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

import 'materialize-css/dist/js/materialize'

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

window.game = window.game || {};

game.Play = function Play() {
  this.games = {};
}

game.Play.prototype = Object.assign({}, game.Play.prototype, {
  _createNewGame: function(user) {
    console.log(user);
  },

  _createNumberSet: function() {
    let numberSet = new Set();

    while (numberSet.size < 5040) {
      numberSet.add(this._getComputerCode());
    }

    return numberSet;
  },

  _getComputerCode: function() {
    // Initialize digits array to hold 10 digits from 0-9
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    // Initialize an empty array to hold the final code
    const code = [];

    // Iterate four times and add one random digit from the digits array to the code each time
    for (let i = 0; i < 4; i++) {
      let randomIndex = Math.floor(Math.random() * digits.length);
      code[i] = digits[randomIndex];
      digits.splice(randomIndex, 1);
    }

    // Return the final code
    return code;
  },

  _getPlayerCode: function() {
    // Initialize digits array to hold 10 digits from 0-9
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    // Initialize an empty array to hold the final code
    const code = [];

    // Iterate four times and add one random digit from the digits array to the code each time
    for (let i = 0; i < 4; i++) {
      let randomIndex = Math.floor(Math.random() * digits.length);
      code[i] = digits[randomIndex];
      digits.splice(randomIndex, 1);
    }

    // Return the final code
    return code;
  },

  _getBulls: function(code, guess) {
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
  },

  _getCows: function(code, guess) {
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
  },

  _checkCode: function(code, guess) {
    let bullCount = 0;
    let bulls = [];
    let cowCount = 0;
    let cows = [];
    let turns = 0;

    let i = 0;
    while (i < code.length && i < guess.length) {
      if (code[i] == guess[i]) {
        bullCount += 1;
        bulls.push(code[i]);
      }
      i++;
    }

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
   return bullCount;
   // return bulls;
  }
})

document.addEventListener('DOMContentLoaded', function() {
  let newGame = new game.Play();

  // Create a set containing all 5040 unique combinations
  let numberSet = Array.from(newGame._createNumberSet());
  console.log(numberSet.length);

  // Create a random code for the player to guess
  let code = newGame._getComputerCode();
  console.log(code);

  // Easy game play
  let turns = 1;
  while (turns <= 7) {

    // User guess
    let userGuess = newGame._getPlayerCode();
    let bullCount = newGame._getBulls(code, userGuess);
    let cowCount = newGame._getCows(code, userGuess);
    console.log("-------Player----------")
    console.log("Player guess: " + userGuess);
    console.log("Bulls: " + bullCount + " / Cows: " + cowCount)
    console.log(" ")
    if (bullCount == 4) {
      console.log('Player wins');
      break;
    } 

    // Computer guess
    let compGuess = newGame._getComputerCode();
    let compBullCount = newGame._getBulls(code, compGuess);
    let compCowCount = newGame._getCows(code, compGuess);
    console.log("-------Computer----------")
    console.log("Comp guess: " + compGuess);
    console.log("Bulls: " + compBullCount + " / Cows: " + compCowCount)
    console.log(" ")
    if (compBullCount == 4) {
      console.log('Computer wins');
      break;
    } 

    // Remove from array the codes that have already been guessed
    console.log(typeof compGuess);
    console.log(typeof numberSet[0]);
    const found = numberSet.indexOf(compGuess);
    console.log(found);
    numberSet.splice(found, 1);
    console.log(numberSet.length)

    turns++;

    // End of game (draw)
    if (turns == 8) {
      console.log("Draw")
    }
  }



});

