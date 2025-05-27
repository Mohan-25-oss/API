// Navbar Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('active');
});

// DOM Elements
const foodSearchInput = document.getElementById('foodSearch');
const foodSearchButton = document.getElementById('foodSearchButton');
const foodsContainer = document.getElementById('foods');
const foodDetails = document.getElementById('food-details');

// Load food categories initially
const loadFoodCategories = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => {
            console.error("Error loading categories:", error);
            foodsContainer.innerHTML = '<p class="error">There is a loading issues</p>';
        });
};

// Display categories
const displayCategories = (foods) => {
    foodsContainer.innerHTML = '';
    foods.forEach(food => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add("food");
        foodDiv.innerHTML = `
            <img src="${food.strCategoryThumb}" alt="${food.strCategory}">
            <h3>Category: ${food.strCategory}</h3>
            <p>Description: ${food.strCategoryDescription.slice(0, 100)}...</p>
            <button onclick="loadMealsByCategory('${food.strCategory}')">ore items...</button>
        `;
        foodsContainer.appendChild(foodDiv);
    });
};

// Search foods
const searchFoods = () => {
    const searchTerm = foodSearchInput.value.trim();
    if (!searchTerm) {
        alert("দয়া করে খাবারের নাম লিখুন");
        return;
    }

    foodsContainer.innerHTML = '<p>লোড হচ্ছে...</p>';
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(res => res.json())
        .then(data => {
            if (data.meals) {
                displayMealResults(data.meals);
            } else {
                foodsContainer.innerHTML = '<p class="no-results">No foods are found</p>';
            }
        })
        .catch(error => {
            console.error("Search error:", error);
            foodsContainer.innerHTML = '<p class="error">Searching some issues</p>';
        });
};

// Display search results
const displayMealResults = (meals) => {
    foodsContainer.innerHTML = '';
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add("food");
        mealDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strArea} • ${meal.strCategory}</p>
            <button onclick="showMealDetails('${meal.idMeal}')">রেসিপি দেখুন</button>
        `;
        foodsContainer.appendChild(mealDiv);
    });
};

// Load meals by category
const loadMealsByCategory = (category) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => res.json())
        .then(data => {
            if (data.meals) {
                const categoryContainer = document.createElement('div');
categoryContainer.className = 'category-container';

// Create title span
const categoryTitle = document.createElement('span');
categoryTitle.className = 'category-title';
categoryTitle.textContent = `${category} All Foods`;

// Create meals grid container
const mealsDiv = document.createElement('div');
mealsDiv.className = 'meals-grid';

// Append elements
categoryContainer.appendChild(categoryTitle);
categoryContainer.appendChild(mealsDiv);
                
                data.meals.forEach(meal => {
                    const mealDiv = document.createElement('div');
                    mealDiv.className = "meal-item";
                    mealDiv.onclick = () => showMealDetails(meal.idMeal);
                    mealDiv.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <h3>${meal.strMeal}</h3>
                    `;
                    mealsDiv.appendChild(mealDiv);
                });

                categoryContainer.appendChild(mealsDiv);
                foodsContainer.innerHTML = '';
                foodsContainer.appendChild(categoryContainer);

                const detailsDiv = document.createElement('div');
                detailsDiv.id = 'meal-details-container';
                detailsDiv.style.display = 'grid, grid-template-columns: repeat(3, 1fr);';
                foodsContainer.appendChild(detailsDiv);
            } else {
                foodsContainer.innerHTML = `<p>${category} Not found this type </p>`;
            }
        })
        .catch(error => {
            console.error("Category error:", error);
            foodsContainer.innerHTML = '<p class="error">data loading issue</p>';
        });
};

// Show meal details
const showMealDetails = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            if (data.meals && data.meals[0]) {
                const meal = data.meals[0];
                window.scrollTo(0, 0);

                foodDetails.innerHTML = `
                    <div class="food-detail-card">
                        <button onclick="goBackToList()" class="back-button">←Back</button>
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <div class="food-info">
                            <h1>Dish: ${meal.strMeal}</h1>
                            <p><strong>Category:</strong> ${meal.strCategory || 'N/A'}</p>
                            <p style="display:none"><strong>Area:</strong> ${meal.strArea || 'N/A'}</p>
                            <p style="display:none"><strong>Instructions:</strong> ${meal.strInstructions || 'N/A'}</p>
                            <h3 style="display:none">Ingredients:</h3>
                            <ul style="display:none">${getIngredientsList(meal)}</ul>
                            <a style="display:none" href="${meal.strYoutube}" target="_blank" class="map-btn">Watch on YouTube</a>
                        </div>
                    </div>
                `;

                foodsContainer.style.display = "none";
                foodDetails.style.display = "block";
            }
        })
        .catch(error => {
            console.error("Details error:", error);
        });
};

// Back to list view
const goBackToList = () => {
    foodDetails.style.display = "none";
    foodsContainer.style.display = "grid";
};

// Extract ingredients
const getIngredientsList = (meal) => {
    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return ingredients;
};

// Load all meals initially
const loadFoods = async () => {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    const data = await res.json();
    displayMealResults(data.meals);
};

// Initial load
loadFoodCategories();

// Search events
foodSearchButton.addEventListener('click', searchFoods);
foodSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchFoods();
});
/*add */
// In showMealDetails function:
foodsContainer.classList.add('hidden');
foodDetails.style.display = "block";

// In goBackToList function:
foodsContainer.classList.remove('hidden');
foodDetails.style.display = "none";