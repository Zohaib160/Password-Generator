const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const generateBtn = document.getElementById('generate');
const passwordOutput = document.getElementById('password');
const copyBtn = document.getElementById('copy');

// Update slider value display
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
});

// Copy password to clipboard
copyBtn.addEventListener('click', () => {
  if (passwordOutput.value === '') {
    alert('No password to copy!');
    return;
  }
  passwordOutput.select();
  passwordOutput.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand('copy');
  alert('Password copied to clipboard!');
});
