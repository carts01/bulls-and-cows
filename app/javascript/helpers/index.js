export function formatCode(code) {
  const digits = code.split('');
  const codeArray = [];
  for (let i = 0; i < 4; i++) {
    codeArray.push(parseInt(digits[i]));
  }

  return codeArray;
}

export function formatGuess(guess) {
  const number = guess.join('');
  return number;
}

export function capitalize(str) {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function levelSelection(choice) {
  if (choice == "bruce") {
    return 1;
  } else if (choice == "judy") {
    return 2;
  } else if (choice == "lionel") {
    return 3;
  }
}

export function resetTurn(input) {
  input.removeAttribute('disabled');
  input.value = '';
  input.focus();
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
  input.setAttribute('disabled', true);

  setTimeout(clearError, 1200);

  function clearError() {
    element.textContent = '';
    element.classList.add('hidden');
    input.classList.remove('invalid');
    input.removeAttribute('disabled');
    input.value = '';
    input.focus();
  }
}

export function createImageElement(container, source, className) {
  var image = document.createElement("img"); 
  image.src = source; 
  image.classList.add(className);
  container.appendChild(image);
}