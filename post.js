function loadPosts(){
    fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(response => response.json())
    .then(json => displayPosts(json));

}
loadPosts();
function displayPosts(posts){
    posts.forEach(post => {
        const postDiv = document.getElementById('posts');
        const div = document.createElement('div');
        div.classList.add('post');
        div.innerHTML = `
        <h1>Title: ${post?.title}</h1>
        <p>Description: ${post?.body}</p>
        <span>UserId: ${post?.userId}</span>
        `
            postDiv.appendChild(div);
        });
    }