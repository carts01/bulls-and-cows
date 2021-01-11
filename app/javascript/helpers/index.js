export function formatCode(code) {
  const digits = code.split('');
  const codeArray = [];
  for (let i = 0; i < 4; i++) {
    codeArray.push(parseInt(digits[i]));
  }

  return codeArray;
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