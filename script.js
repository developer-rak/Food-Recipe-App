const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = 'ea848459';
const APP_KEY = '990a5a530df661c88b7c41d3b1442db3';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=pizza&app_id=${APP_ID}&app_key=${APP_KEY}&to=15`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results) {
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += `
                <div class="item">
					<img src="${result.recipe.image}">
					<div class="flex-container">
						<h1 class="title">${result.recipe.label}</h1>
						<a class="view-button" href="#">View Recipe</a>
					</div>
					<p class="item-data">Calories: ${result.recipe.calories}</p>
				</div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}