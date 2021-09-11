const articleFormHandler = async (event) => {
    event.preventDefault();
  
    // DOM targeting for user input
    const title = document.getElementById('article-title-form').value;
    const content = document.getElementById('article-content-form').value;
    // Test user has provided a title and content
    if (title && content) {
      // Call the article route with the userdata
      const response = await fetch('/api/articles/publish', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
      // If successful redirect to the homepage
      if (response.ok) {
        document.location.replace('/api/articles');
      } else {
        alert('Publishing article unsuccessful, please try again.');
      }
    }
  };
  
const deleteReqHandler = async (event) => {
  event.preventDefault();

    // Grab the ID for Article the deletion request realates to 
    const articleId = event.target.id;
    console.log(articleId);
    // Call the comment route with the userdata
    const response = await fetch(`/api/articles/${articleId}`, {
        method: 'DELETE',
        body: JSON.stringify({ articleId }),
        headers: { 'Content-Type': 'application/json' },
    });
    // If successful redirect to the homepage
    if (response.ok) {
      document.location.replace(`/api/articles/`);
    } else {
      alert('Requested deletion unsuccessful, please try again.');
    }
};

// DOM targeting and listener for form submission
document
  .getElementById('article-form')
  .addEventListener('click', articleFormHandler);

// DOM targeting across DIV to add eachlistener for DELETION request
document
.querySelectorAll('.deleteBtn').forEach(button => {
    button.addEventListener('click', deleteReqHandler)
});