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

function flashCopySuccess() {
  document.querySelector("#copysuccess").classList.remove("fade-out");
  // Wait a bit before fading out
  setTimeout(function() {
    document.querySelector("#copysuccess").classList.add("fade-out");
  }, 700);
}

function flashCopyFailed() {
  document.querySelector("#copyfail").classList.remove("fade-out");
  // Wait a bit before fading out
  setTimeout(function() {
    document.querySelector("#copyfail").classList.add("fade-out");
  }, 700);
}

function askForPasswordLength(){
  for(elem of document.querySelectorAll(".password-length")) {
    elem.classList.remove("hidden");
  }
}

function askForCharSets(){
    // Hide password length settings
    for(elem of document.querySelectorAll(".password-length")) {
      elem.classList.add("hidden");
    }

    // Show character set settings
    for(elem of document.querySelectorAll(".charset")) {
      elem.classList.remove("hidden");
    }

    // Hide next button
    document.querySelector(".next-button").classList.add("hidden");
    // Show finish button
    document.querySelector(".finish-button").classList.remove("hidden");
}

function finishQuestions(){
    // Proceed if password is generated successfully
    if(writePassword()) {

      // Return elements to original positions
      document.querySelector(".settings").appendChild(document.querySelector(".form-group"));
      document.querySelector(".card-footer").appendChild(document.querySelector("#error"));

      // Hide finish button
      document.querySelector(".finish-button").classList.add("hidden");

      // Hide character set settings
      for(elem of document.querySelectorAll(".charset")) {
        elem.classList.add("hidden");
      }

      // Close the modal
      document.querySelector(".modal").close();
    }
}

// To allow the password length and character sets to be changed in two different locations, we'll move the settings form into the modal when the user clicks the generate button
function showQuestions(){
  const modal = document.querySelector(".modal");
  const settingsForm = document.querySelector(".form-group");

  // Move our settings form into the modal
  modal.appendChild(settingsForm);

  // Start the questions with the password length
  askForPasswordLength();

  // Show the next button
  document.querySelector(".next-button").classList.remove("hidden");

  // Move error field into modal
  modal.appendChild(document.querySelector("#error"));

  // Show the modal
  modal.showModal();
}

function writePassword(){
  var password = generatePassword();

  // Bail if empty password is returned
  if(!password) { return; }

  var passwordText = document.querySelector("#password");

  passwordText.value = password;

  // Make copy text visible
  document.querySelector(".copy").classList.remove("invisible");

  return password;  
}

// Write password to the #password input
function generate() {
  // Always clear error message
  showError("");
  // Check if the quick settings are closed
  if(!document.querySelector("#quick-menu").checked) {
    // Get settings by prompting user sequentially
    showQuestions();
  } else {
    writePassword();
  }

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
    
    // Copy password to clipboard
    navigator.clipboard.writeText(this.value).then(function() {
      flashCopySuccess();
    }, function(err) {
      flashCopyFailed();
      console.error('Could not copy text: ', err);
    });
  });

  // Show quick settings when user toggles the quick settings radio button
  document.querySelector("#quick-menu").addEventListener("change", function() {
    for(elem of document.querySelectorAll(".quick-setting")) {
      elem.classList.toggle("hidden");
    }
  });

  // Add event listener to generate button
  document.querySelector("#generate").addEventListener("click", generate);

  // Add event listener to next button
  document.querySelector("#next").addEventListener("click", function() {
    askForCharSets();
  });

  // Add event listener to finish button
  document.querySelector("#finish-questions").addEventListener("click", () => {
    finishQuestions();
  });
});