/* eslint-disable no-console */
const checkingLengthString = function (strin, length) {
  return strin.length <= length;
};

// eslint-disable-next-line no-console
console.log(checkingLengthString('hello', 14));
// eslint-disable-next-line no-console
console.log(checkingLengthString('flowers', 7));
// eslint-disable-next-line no-console
console.log(checkingLengthString('helloworld', 5));

const checkingPalindromes = function (string) {
  const wordsWithoutSpaces = string.replaceAll();
  const lowerLetters = wordsWithoutSpaces.toLowerCase();
  return lowerLetters === lowerLetters.split('').reverse().join('');
};

// eslint-disable-next-line no-console
console.log(checkingPalindromes('топот'));
console.log(checkingPalindromes('ДовОд'));
console.log(checkingPalindromes('кекс'));


const findNumbers = function (string) {
  let resultString = '';
  const str = string.toString();

  for (let i = 0; i < string.length; i++) {
    const symbol = parseInt(str[i], 10);
    if (!symbol.isNaN()) {
      resultString += str[i];
    }
  }

  return parseInt(resultString, 10);
};

console.log(findNumbers('2023 год'));
console.log(findNumbers('ECMAScript 2022'));
console.log(findNumbers('1 кефир, 0.5 батона'));
console.log(findNumbers('агент 007'));
console.log(findNumbers('а я томат'));
console.log(findNumbers('2023'));
console.log(findNumbers('-1'));
console.log(findNumbers('1.5'));
