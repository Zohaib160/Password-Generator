// Elements
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const generateBtn = document.getElementById('generate');
const passwordOutput = document.getElementById('password');
const copyBtn = document.getElementById('copy');

const checkInput = document.getElementById('checkPassword');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');

// Update slider display
lengthSlider.addEventListener('input', () => {
  lengthValue.textContent = lengthSlider.value;
});

// Generate password
generateBtn.addEventListener('click', () => {
  const length = +lengthSlider.value;
  const useUpper = document.getElementById('uppercase').checked;
  const useLower = document.getElementById('lowercase').checked;
  const useNumbers = document.getElementById('numbers').checked;
  const useSpecial = document.getElementById('special').checked;

  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  
  let allChars = '';
  if (useUpper) allChars += upperChars;
  if (useLower) allChars += lowerChars;
  if (useNumbers) allChars += numberChars;
  if (useSpecial) allChars += specialChars;

  if (!allChars) {
    alert('Please select at least one character type!');
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  passwordOutput.value = password;
  checkPasswordStrength(password); // show strength automatically
  checkInput.value = password; // paste in strength checker input
});

// Copy password
copyBtn.addEventListener('click', () => {
  if (passwordOutput.value === '') {
    alert('No password to copy!');
    return;
  }
  passwordOutput.select();
  passwordOutput.setSelectionRange(0, 99999);
  document.execCommand('copy');
  alert('Password copied to clipboard!');
});

// Evaluate password strength
checkInput.addEventListener('input', () => {
  checkPasswordStrength(checkInput.value);
});

function checkPasswordStrength(password) {
  let strength = 0;
  
  const lengthCriteria = password.length >= 8;
  const upperCriteria = /[A-Z]/.test(password);
  const lowerCriteria = /[a-z]/.test(password);
  const numberCriteria = /[0-9]/.test(password);
  const specialCriteria = /[!@#$%^&*()_+~`|}{[\]:;?><,./\-]/.test(password);

  const checks = [lengthCriteria, upperCriteria, lowerCriteria, numberCriteria, specialCriteria];
  strength = checks.filter(Boolean).length;

  let strengthPercent = (strength / 5) * 100;
  let color = 'red';
  let text = 'Weak';

  if (strength <= 2) { color = 'red'; text = 'Weak'; }
  else if (strength === 3) { color = 'yellow'; text = 'Medium'; }
  else if (strength === 4) { color = 'orange'; text = 'Strong'; }
  else if (strength === 5) { color = 'green'; text = 'Very Strong'; }

  strengthFill.style.width = strengthPercent + '%';
  strengthFill.style.background = color;
  strengthText.textContent = text;
}

