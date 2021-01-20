export default class Setup {

  constructor() {
    console.log('Setup game');
    // Get user code and pass it in constructor
  }

  init() {
    return {
      computerCode: this.getComputerCode(),
      playerCode: this.getPlayerCode(),
      numberSet: this.createNumberSet(),
      computerPlayer: this.generateComputerPlayer()
    }
  }

  generateComputerPlayer() {
    const players = ["Lionel", "Alice", "Bruce", "Jacob", "Judy", "Eric", "Leroy", "Sandra", "Mary"];
    const random = Math.floor(Math.random() * Math.floor(players.length));
    console.log(random);
    return players[random];
  }

  createNumberSet() {
    const numberSet = new Set();
    while (numberSet.size < 5040) {
      // Convert codes into strings to ensure that codes passed in are unique
      // [1, 2, 3, 4] !== [1, 2, 3, 4] so duplicate arrays could be added
      let code = this.getComputerCode();
      let str = '';
      code.forEach((c) => {
        str = str + c;
      });
      numberSet.add(str);
    }
    return numberSet;
  }

  getComputerCode(code = []) {
    // Initialize digits array to hold 10 digits from 0-9
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // Iterate four times and add one random digit from the digits array to the code each time
    for (let i = 0; i < 4; i++) {
      let randomIndex = Math.floor(Math.random() * digits.length);
      code[i] = digits[randomIndex];
      digits.splice(randomIndex, 1);
    }

    // console.log(code);
    // Return the final code
    return code;
}


  getPlayerCode (code = []) {

  // Initialize digits array to hold 10 digits from 0-9
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Iterate four times and add one random digit from the digits array to the code each time
  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * digits.length);
    code[i] = digits[randomIndex];
    digits.splice(randomIndex, 1);
  }

  // console.log(code);
  // Return the final code
  return code;
}

}