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
const loadCountryApi = () => {
    fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => displayCountries(data))
}

loadCountryApi()

const displayCountries = (countries)=>{
    const uiDiv = document.getElementById('countries')
    countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add("country")
        console.log(countryDiv);
        countryDiv.innerHTML= `
        <img src="${country.flags.png}" alt="${country.name.common} flag">
        <h3>Name: ${country.name.common}</h3>
        <p>Population: ${country.population}</p>
        <button onclick="loadSingleCountryByName('${country.name.common}')">See Details</button>
        `
        uiDiv.appendChild(countryDiv)
        
    });
    
}

const loadSingleCountryByName = (name) => {
    const url = `https://restcountries.com/v3.1/name/${name}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySingleCountry(data[0]));
}

const displaySingleCountry = (country) => {
    window.scrollTo(0, 0); // Scroll to the top of the page
    // console.log(country);
    // console.log(country-details);
    const countryDetails = document.getElementById('country-details');
    countryDetails.innerHTML = `
    <img src="${country.flags.png}" alt="${country.name.common} flag">
    <h1>Name: ${country.name.common}</h1>
    <h1>Capital: ${country.capital}</h1>
    <h3>Population: ${country.population}</h3>
    <h3>Maps: ${country.maps}</h3>
    <a href="">YouTube</a>
    <a href="${country.maps?.googleMaps || '#'}" 
        target="_blank" 
        class="https://maps.app.goo.gl/K7DFerrTtVJtmyfy6">Map</a>
    `;   

}