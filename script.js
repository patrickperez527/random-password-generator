function showVal(newVal){
  document.getElementById("lengthValue").innerHTML = newVal;
}

const resultEl = document.getElementById('result');
const clipboardEl = document.getElementById('clipboard');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const message = document.getElementById('message');

const randomFunc = {
  upper: getRandomUpper,
  lower: getRandomLower,
  number: getRandomNumber,
  symbol: getRandomSymbol  
}

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;  
  resultEl.innerText = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);
});

clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

  if(!password){
    message.innerHTML = '<span class="text-danger">Please generate a password first.</span>';
    hideMessage();
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  message.innerHTML = '<span class="text-success">Password copied to clipboard <i class="far fa-check-circle"></i></span>';
  hideMessage();
})

function hideMessage() {
  setTimeout(function() {
          message.textContent = "";
  }, 1000)
}

function generatePassword(length, upper, lower, number, symbol){
  let generatedPassword = '';
  const typesCount = upper + lower + number + symbol;

  const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0]);

  if (typesCount === 0) {
      message.innerHTML = '<span class="text-danger">Please check at least one checkbox.</span>';
      hideMessage();
      return '';
  }

  for (let i = 0; i < length; i+= typesCount) {
      typesArr.forEach(type => {
          const funcName = Object.keys(type)[0];
          generatedPassword += randomFunc[funcName]();
      });
  }
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;

}

function getRandomUpper(){
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower(){
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber(){
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol(){
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}