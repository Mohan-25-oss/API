/*NAVBAR START*/
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    const menuToggle = document.querySelector(".menu-toggle");
    
    navLinks.classList.toggle("show");
    
    // এক্সেসিবিলিটি উন্নত করতে
    const isExpanded = navLinks.classList.contains("show");
    menuToggle.setAttribute("aria-expanded", isExpanded);
    
    // মোবাইল ভিউতে স্ক্রল লক করতে
    if (isExpanded) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
}

// বাইরে ক্লিক করলে মেনু বন্ধ হবে
document.addEventListener("click", function(event) {
    const navLinks = document.getElementById("navLinks");
    const menuToggle = document.querySelector(".menu-toggle");
    
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        navLinks.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }
});

/*NAVBAR END*/

// USER START
function loadApi(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then/*here all the data is object*/(jason => /*function call here*/ displayInfo(jason));
}
loadApi();

function displayInfo(users){
    const usersDiv = document.getElementById("users");
        // console.log(usersDiv);
    for (const user of users){
        // console.log(user);
        const div = document.createElement('div');
        div.classList.add('user');
        div.innerHTML = `
        <h1>${user?.name}</h1>
        <p>${user?.email}</p>
        <span>${user?.phone}</span>
        <p>${user?.username}</p>
        `
    // console.log(div);
    usersDiv.appendChild(div);
    }
}
// USER END

// POST START
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
    // COMMENTS START
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
// TO DO START
function loadTodos () {
    fetch(`https://jsonplaceholder.typicode.com/todos`)
    .then(response => response.json())
    .then(json => displayTodos(json));
}
loadTodos();
function displayTodos(todos) {
    todos.forEach(todo => {
        const todoDiv = document.getElementById('todos');
        const div = document.createElement('div');
        div.classList.add('todo');
        div.innerHTML = `
        <h1>Title: ${todo?.title}</h1>
        <p>Completed: ${todo?.completed}</p>
        <span>UserId: ${todo?.userId}</span>
        `
            todoDiv.appendChild(div);
        });
    }
    // ALBUM START
    function loadAlbums() {
    fetch(`https://jsonplaceholder.typicode.com/albums`)
    .then(response => response.json())
    .then(json => displayAlbums(json));
}
loadAlbums();

function displayAlbums(albums) {
    albums.forEach(album => {
        const albumDiv = document.getElementById('albums');
        const div = document.createElement('div');
        div.classList.add('album');
        div.innerHTML = `
        <h1>Title: ${album?.title}</h1>
        <span>UserId: ${album?.userId}</span>
        `
            albumDiv.appendChild(div);
        });
    }