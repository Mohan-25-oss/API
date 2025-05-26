/*Navbar Start*/
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});
// Navbar End
// DOM এলিমেন্ট সিলেক্ট করা
const foodSearchInput = document.getElementById('foodSearch');
const foodSearchButton = document.getElementById('foodSearchButton');
const foodsContainer = document.getElementById('foods');

// প্রাথমিকভাবে সব ক্যাটাগরি লোড করা
const loadFoodCategories = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(res => res.json())
    .then(data => displayFoods(data.categories))
    .catch(error => {
        console.error("Error loading categories:", error);
        foodsContainer.innerHTML = '<p class="error">ক্যাটাগরি লোড করতে সমস্যা হয়েছে</p>';
    });
};

// খাবার সার্চ করার ফাংশন
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
            foodsContainer.innerHTML = '<p class="no-results">কোন খাবার পাওয়া যায়নি</p>';
        }
    })
    .catch(error => {
        console.error("Search error:", error);
        foodsContainer.innerHTML = '<p class="error">সার্চ করতে সমস্যা হয়েছে</p>';
    });
};

// ক্যাটাগরি দেখানোর ফাংশন
const displayFoods = (foods) => {
    foodsContainer.innerHTML = '';
    
    foods.forEach(food => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add("food");
        foodDiv.innerHTML = `
            <img src="${food.strCategoryThumb}" alt="${food.strCategory}">
            <h3>Category: ${food.strCategory}</h3>
            <p>Description: ${food.strCategoryDescription.slice(0, 100)}...</p>
            <button onclick="loadMealsByCategory('${food.strCategory}')">See more items...</button>
        `;
        foodsContainer.appendChild(foodDiv);
    });
};

// সার্চ রেজাল্ট দেখানোর ফাংশন
const displayMealResults = (meals) => {
    foodsContainer.innerHTML = '';
    
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add("food");
        mealDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strArea} • ${meal.strCategory}</p>
            <button onclick="viewMealDetails('${meal.idMeal}')">রেসিপি দেখুন</button>
        `;
        foodsContainer.appendChild(mealDiv);
    });
};

// ক্যাটাগরি থেকে মিল লোড করার ফাংশন
const loadMealsByCategory = (category) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(res => res.json())
    .then(data => {
        if (data.meals) {
            displayMealResults(data.meals);
        } else {
            foodsContainer.innerHTML = `<p>${category} ক্যাটাগরিতে কোন খাবার নেই</p>`;
        }
    })
    .catch(error => {
        console.error("Category error:", error);
        foodsContainer.innerHTML = '<p class="error">ডাটা লোড করতে সমস্যা হয়েছে</p>';
    });
};

// মিল ডিটেইলস দেখানোর ফাংশন (তোমাকে এটি ইমপ্লিমেন্ট করতে হবে)
const viewMealDetails = (mealId) => {
    console.log("Meal ID:", mealId);
    // window.location.href = `meal-details.html?id=${mealId}`;
};

// ইভেন্ট লিসেনার যোগ করা
foodSearchButton.addEventListener('click', searchFoods);
foodSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchFoods();
});

// পেজ লোড হলে ক্যাটাগরি লোড করা
loadFoodCategories();