const loginFormHandler = async (event) => {
  event.preventDefault();

  // DOM targeting and remove accidental spaces
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  // Test user has provided an email and a password
  if (email && password) {
    // Call the login route with the userdata
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // If successful redirect to the homepage
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Login unsuccessful, please try again.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  // DOM targeting and remove accidental spaces
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Test user has provided a username, email, and password 
  if (username && email && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If successful redirect to the homepage
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Signup unsuccessful, please try again.');
    }
  }
};

// DOM targeting and listener for form submission
document
  .querySelector('.login-form')
  .addEventListener('click', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('click', signupFormHandler);
