// Assignment code here
function generatePassword(){
  // Clear any previous errors
  showError("");
  
  // Character sets
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const number = "0123456789";
  const special = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

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

function flashCopyMessage() {
  // TODO: Display a temporary message to the user that the password was copied to the clipboard
  document.querySelector("#copyresult").classList.remove("fade-out");
  // Wait a bit before fading out
  setTimeout(function() {
    document.querySelector("#copyresult").classList.add("fade-out");
  }, 700);
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();

  // Bail if empty password is returned
  if(!password) { return; }

  var passwordText = document.querySelector("#password");

  passwordText.value = password;

  // Make copy text visible
  document.querySelector(".copy").classList.remove("invisible");

}

// Wait for document ready
document.addEventListener("DOMContentLoaded", function() {
  
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
    // Only proceed if password field isn't empty
    if(!this.value) { return; }
    
    navigator.clipboard.writeText(this.value).then(function() {
      flashCopyMessage();
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
  });

  // Add event listener to generate button
  document.querySelector("#generate").addEventListener("click", writePassword);
});