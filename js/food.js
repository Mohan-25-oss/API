/*Navbar Start*/
document.querySelectorAll('.dropdown-list a').forEach(link => {
    link.addEventListener('click', (e) => {
        // ইভেন্ট প্রোপাগেশন বন্ধ করবেন না
        // e.stopPropagation(); // এটা থাকলে রিমুভ করুন
    });
});
// Navbar End
const loadFoodApi = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(res => res.json())
    .then(data => displayFoods(data.categories))
}
loadFoodApi();
const displayFoods = (foods) => {
    const uiDiv = document.getElementById('foods');
    foods.forEach(food => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add("food");
        foodDiv.innerHTML = `
            <img src="${food.strCategoryThumb}" alt="${food.strCategory} image">
            <h3>Category: ${food.strCategory}</h3>
            <p>Description: ${food.strCategoryDescription.slice(0, 100)}...</p>
            <button onclick="loadSingleFoodByName('${food.strCategory}')">See Details</button>
        `;
        uiDiv.appendChild(foodDiv);
    });
}