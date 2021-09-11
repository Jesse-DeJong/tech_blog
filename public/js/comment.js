const commentFormHandler = async (event) => {
    event.preventDefault();

    // Grab the ID for Article the Comment realates to 
    const articleId = event.target.id;
    // DOM targeting 
    const contents = document.querySelector(`#commentField-${articleId}`).value;
    // If user has entered a comment
    if (contents && articleId) {
      // Call the comment route with the userdata
       const response = await fetch('/api/comments/publish', {
        method: 'POST',
        body: JSON.stringify({ contents, articleId }),
        headers: { 'Content-Type': 'application/json' },
      });
      // If successful redirect to the homepage
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Publishing comment unsuccessful, please try again.');
      }
    }
  };
    
  // DOM targeting across DIV to add eachlistener for form submission
  document
    .querySelectorAll('.commentField').forEach(button => {
        button.addEventListener('click', commentFormHandler)
    });
