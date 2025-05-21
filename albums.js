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