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
