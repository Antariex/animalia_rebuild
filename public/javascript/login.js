(function () {
  let password = document.querySelector(".password");
  let toggleBtn = document.querySelector(".toggle-password");

  let helperText = {
    charLength: document.querySelector(".helper-text .length"),
    lowercase: document.querySelector(".helper-text .lowercase"),
    uppercase: document.querySelector(".helper-text .uppercase"),
    special: document.querySelector(".helper-text .special"),
  };

  let pattern = {
    charLength: function () {
      if (password.value.length >= 8) {
        return true;
      }
      return false; 
    },
    lowercase: function () {
      let regex = /^(?=.*[a-z]).+$/; // Lowercase character pattern

      if (regex.test(password.value)) {
        return true;
      }
      return false;
    },
    uppercase: function () {
      let regex = /^(?=.*[A-Z]).+$/; // Uppercase character pattern

      if (regex.test(password.value)) {
        return true;
      }
      return false;
    },
    special: function () {
      let regex = /^(?=.*[0-9_\W]).+$/; // Special character or number pattern

      if (regex.test(password.value)) {
        return true;
      }
      return false;
    },
  };

  // Listen for input event on password field
  password.addEventListener("input", function () {
    // Check that password is a minimum of 8 characters
    patternTest(pattern.charLength(), helperText.charLength);

    // Check that password contains a lowercase letter
    patternTest(pattern.lowercase(), helperText.lowercase);

    // Check that password contains an uppercase letter
    patternTest(pattern.uppercase(), helperText.uppercase);

    // Check that password contains a number or special character
    patternTest(pattern.special(), helperText.special);

    // Check that all requirements are fulfilled
    if (
      hasClass(helperText.charLength, "valid") &&
      hasClass(helperText.lowercase, "valid") &&
      hasClass(helperText.uppercase, "valid") &&
      hasClass(helperText.special, "valid")
    ) {
      addClass(password.parentElement, "valid");
    } else {
      removeClass(password.parentElement, "valid");
    }
  });

  // Toggle password visibility on button click
  toggleBtn.addEventListener("click", function () {
    if (password.type === "password") {
      password.type = "text";
      toggleBtn.className = "fa-solid fa-eye"; 
    } else {
      password.type = "password";
      toggleBtn.className = "fa-solid fa-eye-slash";
    }
  });

  function patternTest(pattern, response) {
    if (pattern) {
      addClass(response, "valid");
    } else {
      removeClass(response, "valid");
    }
  }

  function addClass(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += " " + className;
    }
  }

  function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else
      el.className = el.className.replace(
        new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"),
        " "
      );
  }

  function hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
    }
  }
})();
