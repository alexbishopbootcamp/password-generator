// Assignment code here
function generatePassword(){
  // Clear any previous errors
  showError("");
  
  // Character sets
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const number = "0123456789";
  const special = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  // Initialize our character set
  let charset = '';

  // Build our character set based upon the user's selections
  charset += document.querySelector("#lowercase").checked ? lower : '';
  charset += document.querySelector("#uppercase").checked ? upper : '';
  charset += document.querySelector("#numeric").checked ? number : '';
  charset += document.querySelector("#special").checked ? special : '';

  // Alert the user if no character sets are selected
  if (charset.length === 0) {
    showError("Please select at least one character set.");
    return;
  }
  
  // Get password length
  const passwordLength = document.querySelector("#length").value;

  // Build password
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  // Return password
  return password;
}

function showError(message) {
  const errorSign = document.querySelector("#error");

  errorSign.textContent = message;
}

// Update password length number as user moves the slider
document.querySelector("#length").addEventListener("input", function() {
  document.querySelector("#length-value").value = this.value;
});

// Handle user typing a custom password length
document.querySelector("#length-value").addEventListener("change", function() {
  // Parse input
  this.value = parseInt(this.value);

  // Set length to 8 if user input not a number
  if(isNaN(this.value)) {
    this.value = 8;
  } else {
    // Clamp value to 8-128
    this.value = Math.max(8, Math.min(this.value, 128));
  }
  document.querySelector("#length-value").value = this.value;
  document.querySelector("#length").value = this.value;
});

// Copy password to clipboard when user clicks the password field
document.querySelector("#password").addEventListener("click", function() {
  navigator.clipboard.writeText(this.value).then(function() {
    flashCopyMessage();
  }, function(err) {
    console.error('Could not copy text: ', err);
  });
});

function flashCopyMessage() {
  // TODO: Display a temporary message to the user that the password was copied to the clipboard
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();

  // Bail if empty password is returned
  if(!password) { return; }

  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
