let numberSet;
let computerCode = [];
let playerCode = [];

export function setup() {

  //createNumberSet(numberSet);
  getComputerCode(computerCode);
  getPlayerCode(playerCode);

  return {
    //numberSet: numberSet,
    computerCode: computerCode,
    playerCode: playerCode
  };
}

function createNumberSet(numberSet) {
  numberSet = new Set();

  while (numberSet.size < 5040) {
    numberSet.add(getComputerCode());
  }

  console.log('Number Set');
  return numberSet;
}

function getComputerCode(code = []) {
    // Initialize digits array to hold 10 digits from 0-9
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // Iterate four times and add one random digit from the digits array to the code each time
    for (let i = 0; i < 4; i++) {
      let randomIndex = Math.floor(Math.random() * digits.length);
      code[i] = digits[randomIndex];
      digits.splice(randomIndex, 1);
    }

    console.log(code);
    // Return the final code
    return code;
}


function getPlayerCode (code) {

  // Initialize digits array to hold 10 digits from 0-9
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Iterate four times and add one random digit from the digits array to the code each time
  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * digits.length);
    code[i] = digits[randomIndex];
    digits.splice(randomIndex, 1);
  }

  console.log(code);
  // Return the final code
  return code;
}