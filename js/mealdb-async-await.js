const errorMessage = document.getElementById('error-message');
errorMessage.style.display = 'none';
const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (searchText == '') {
        searchResult.innerHTML = `
        <p>nothing to show</p>
        `;
    }
    // load data
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        const response = await fetch(url);
        const data = await response.json();
        displaySearchResult(data.meals);
    }
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = ` <div class="loader"> </div>`;
    // const loader = document.querySelector('.loader');
    // console.log(loader);
    // loader.classList.remove('hide');
    if (meals.length == 0) {
        searchResult.innerHTML = `
        <p>search result matches no food</p>
       `
    }
    else {
        for (const meal of meals) {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="col">
                <div onclick="loadMealDetails(${meal.idMeal})" class="card">
                    <img src="${meal.strMealThumb}" class="card - img - top" alt="">
                <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.substr(0, 200)}
                        </p>
                    </div>
                </div>
            </div>
        `;
            searchResult.appendChild(div);
        }
    }
    searchResult.removeChild(searchResult.children[0])
}

const loadMealDetails = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const response = await fetch(url);
    const data = await response.json();
    displayMealDetails(data.meals[0]);
}

const displayMealDetails = meal => {
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions}
            </p>
            <a target="_blank" href="${meal.strYoutube}" class="btn btn-primary">Go to meal details</a>
        </div>
    </div>
    `;
    mealDetails.appendChild(div);
}