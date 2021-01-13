export function formatCode(code) {
  const digits = code.split('');
  const codeArray = [];
  for (let i = 0; i < 4; i++) {
    codeArray.push(parseInt(digits[i]));
  }

  return codeArray;
}

export function formatGuess(guess) {
  //const digits = guess.split(',');
  const number = guess.join('');
  return number;
}

export function levelSelection(choice) {
  if (choice == "easy") {
    return 1;
  } else if (choice == "medium") {
    return 2;
  } else if (choice == "hard") {
    return 3;
  }
}

export function resetTurn(input) {
  input.removeAttribute('disabled');
  input.value = '';
}

export function finishGame(form, element, message, playerCode, compCode) {
  form.classList.add('hidden');
  element.textContent = `Your code: ${playerCode} / Computer's code: ${compCode} / Result: ${message}`;
  const playAgain = document.querySelector('.play-again');
  playAgain.classList.remove('hidden');
  playAgain.removeAttribute('disabled');
}

export function getRadioValue(element) {
  for (let i = 0; i < element.length; i++) {
    if (element[i].checked) {
      return element[i].value;
    }
  }
}

export function validateCode(code, element, input) {
  const numericOnly = /\d{4}/;
  const validLength = 4;
  const seenValues = {};
  // Check if code is four digits long
  if (code.length != validLength) {
    displayErrorMessage(element, "Code must be four digits in length", input);
    return false;
  }
  // Check if code is only digits
  if (!numericOnly.test(code)) {
    displayErrorMessage(element, "Code can only contain numeric digits", input);
    return false;
  }
  // Check if code is made of unique digits
  for (let i = 0; i < code.length; i++) {
    if (seenValues[code.charAt(i)]) {
      displayErrorMessage(element, "Code must contain four unique digits", input);
      return false;
    } else {
      seenValues[code.charAt(i)] = true;
    }
  }
  return true;
}

export function displayErrorMessage(element, message, input) {
  element.textContent = message;
  element.classList.remove('hidden');
  input.classList.add('invalid');

  setTimeout(clearError, 3000);

  function clearError() {
    element.textContent = '';
    element.classList.add('hidden');
    input.classList.remove('invalid');
    input.value = '';
  }
}