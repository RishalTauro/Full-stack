// Form validation and DOM manipulation
document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const output = document.getElementById('output');

  // Password validation for strength
  const passwordHelp = document.getElementById('passwordHelp');
  const strongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  
  if (!strongPassword.test(password)) {
    passwordHelp.textContent = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a number.";
    passwordHelp.style.color = "red";
  } else {
    passwordHelp.textContent = "Password is strong.";
    passwordHelp.style.color = "green";

    // DOM update based on interaction
    output.innerHTML = `<div class="alert alert-success">Welcome, ${username}!</div>`;
  }
});

// Client-side routing with hash change
window.addEventListener('hashchange', function() {
  const section = window.location.hash.replace('#', '');
  const routeOutput = document.getElementById('routeOutput');
  
  switch(section) {
    case 'form':
      routeOutput.innerHTML = '<h3>You are on the form page.</h3>';
      break;
    case 'home':
      routeOutput.innerHTML = '<h3>Welcome to the homepage.</h3>';
      break;
    default:
      routeOutput.innerHTML = '<h3>404: Page not found.</h3>';
  }
});
