const mealDetails = document.getElementById('meal-details');
const searchResult = document.getElementById('search-result');
const spinner = document.getElementById('spinner');

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    mealDetails.textContent = '';
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (searchText == '') {
        mealDetails.innerHTML = `
        <h3 class="text-center">nothing to show</h3>
        `;
    }
    // load data
    else {
        spinner.classList.remove('d-none');
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.meals))
    }
}

const displaySearchResult = meals => {
    if (meals === null) {
        spinner.classList.add('d-none');
        mealDetails.innerHTML = `
        <h3 class="text-center">search result matches no food</h3>
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
        spinner.classList.add('d-none')
    }
}

const loadMealDetails = async mealId => {
    spinner.classList.remove('d-none')
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal => {
    mealDetails.textContent = '';
    mealDetails.classList.add('d-none');
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    
    <h3>Meal details</h3>
    <div class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions}
            </p>
            <a target="_blank" href="${meal.strYoutube}" class="btn btn-primary">Go to meal details</a>
        </div>
    </div>
    `;
    mealDetails.appendChild(div);
    spinner.classList.add('d-none');
    mealDetails.classList.remove('d-none');
}