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