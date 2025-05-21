function loadComments() {
    fetch(`https://jsonplaceholder.typicode.com/comments`)
    .then(response => response.json())
    .then(json => displayComments(json));
}
loadComments();
function displayComments(comments) {
    comments.forEach(comment => {
        const commentDiv = document.getElementById('comments');
        const div = document.createElement('div');
        div.classList.add('comment');
        div.innerHTML = `
        <h1>Name: ${comment?.name}</h1>
        <p>Email: ${comment?.email}</p>
        <span>Body: ${comment?.body}</span>
        `
            commentDiv.appendChild(div);
        });
    }
