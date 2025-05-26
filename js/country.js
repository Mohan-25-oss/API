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
// country start
// DOM এলিমেন্ট সিলেক্ট করা
const countrySearchInput = document.getElementById('countrySearch');
const countrySearchButton = document.getElementById('countrySearchButton');
const countriesContainer = document.getElementById('countries');
const countryDetails = document.getElementById('country-details');

// প্রাথমিকভাবে সব দেশ লোড করা
const loadCountryApi = () => {
    fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => displayCountries(data))
    .catch(error => {
        console.error("Error loading countries:", error);
        countriesContainer.innerHTML = '<p class="error">দেশ লোড করতে সমস্যা হয়েছে</p>';
    });
};

// দেশ সার্চ করার ফাংশন
const searchCountries = () => {
    const searchTerm = countrySearchInput.value.trim();
    
    if (!searchTerm) {
        alert("দয়া করে দেশের নাম লিখুন");
        return;
    }

    countriesContainer.innerHTML = '<p>লোড হচ্ছে...</p>';
    
    fetch(`https://restcountries.com/v3.1/name/${searchTerm}`)
    .then(res => res.json())
    .then(data => {
        if (data.length > 0) {
            displaySingleCountry(data[0]); // প্রথম ম্যাচ করা দেশ দেখাবে
        } else {
            countriesContainer.innerHTML = '<p class="no-results">কোন দেশ পাওয়া যায়নি</p>';
        }
    })
    .catch(error => {
        console.error("Search error:", error);
        countriesContainer.innerHTML = '<p class="error">সার্চ করতে সমস্যা হয়েছে</p>';
    });
};

// সব দেশ দেখানোর ফাংশন
const displayCountries = (countries) => {
    countriesContainer.innerHTML = '';
    
    countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add("country");
        countryDiv.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common} flag">
            <h3>Country: ${country.name.common}</h3>
            <p><strong>Capital:</strong> ${country.capital || 'N/A'}</p>
            <p>Population: ${country.population.toLocaleString()}</p>
            <button onclick="loadSingleCountryByName('${country.name.common}')">See details</button>
        `;
        countriesContainer.appendChild(countryDiv);
    });
};

// দেশের নাম দিয়ে বিস্তারিত লোড করা
const loadSingleCountryByName = (name) => {
    const url = `https://restcountries.com/v3.1/name/${name}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySingleCountry(data[0]))
    .catch(error => {
        console.error("Country details error:", error);
        countryDetails.innerHTML = '<p class="error">দেশের বিস্তারিত লোড করতে সমস্যা হয়েছে</p>';
    });
};

// একটি দেশের বিস্তারিত দেখানোর ফাংশন
const displaySingleCountry = (country) => {
    window.scrollTo(0, 0); // পেজের উপরে স্ক্রল করবে
    
    countryDetails.innerHTML = `
        <div class="country-detail-card">
            <img src="${country.flags.png}" alt="${country.name.common} flag">
            <div class="country-info">
                <h1>Country: ${country.name.common}</h1>
                <p><strong>Capital:</strong> ${country.capital || 'N/A'}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Currency:</strong> ${country.currencies ? Object.values(country.currencies)[0].name : 'N/A'}</p>
                <p><strong>Language:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                <a href="${country.maps?.googleMaps || 'https://maps.app.goo.gl/hStcg5ocvuK4x7128'}" target="_blank" class="map-btn">গুগল ম্যাপে দেখুন</a>
            </div>
        </div>
    `;
    
    // সার্চ রেজাল্ট দেখানোর পর মূল লিস্ট লুকিয়ে ফেলা
    countriesContainer.style.display = "display: flex";
};

// ইভেন্ট লিসেনার যোগ করা
countrySearchButton.addEventListener('click', searchCountries);
countrySearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchCountries();
});

// পেজ লোড হলে সব দেশ লোড করা
loadCountryApi();