const logout = async () => {
  // Call the logout route
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  // If successful redirect to the homepage
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

// DOM targeting and listener for form submission
document.querySelector('#logout').addEventListener('click', logout);
