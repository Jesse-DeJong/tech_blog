const commentFormHandler = async (event) => {
    event.preventDefault();

    // Grab the ID for Article the Comment realates to 
    const articleId = event.target.id;

    // DOM targeting 
    const contents = document.querySelector(`#commentField-${articleId}`).value;
  
    // If user has entered a comment
    if (contents, articleId) {
      // Call the comment route with the userdata
       const postCommentFetch = await fetch('/api/comments/addComment', {
        method: 'POST',
        body: JSON.stringify({ contents, articleId }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (postCommentFetch.status === 200) {
        window.location.replace('/');
      }
    }
  };
    
  // DOM targeting across DIV to add eachlistener for form submission
  document
    .querySelectorAll('.commentField').forEach(button => {
        button.addEventListener('click', commentFormHandler)
    });
