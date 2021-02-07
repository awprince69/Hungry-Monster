const searchMeals = () => {
    const inputValue = document.getElementById('inputValue').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            if (inputValue == ""){
                const showError = document.getElementById('errorMessage');
                const errorMessage = document.createElement('h2');
                errorMessage.innerText = `There are no search result for ${inputValue}`
                showError.appendChild(errorMessage);
            }
            displaySearchMeals(data.meals)
        })
        .catch(error => console.log(error))
}


const displaySearchMeals = meals => {
    const mealsDiv = document.getElementById('mealsDiv')
    meals.forEach(mealsInfo => {
        const newDiv = document.createElement('div');
        newDiv.className = "foods"
        const foodInfo = `
            <div class="detail" onclick="displayMealsDetails('${mealsInfo.strMeal}')" >
            <img src="${mealsInfo.strMealThumb}">
            <h4 id="textSpacing"> ${mealsInfo.strMeal} </h4>  
            </div>
        `
        newDiv.innerHTML = foodInfo;
        mealsDiv.appendChild(newDiv);
    });
}


const displayMealsDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    fetch(url)
        .then(res => res.json())
        .then(data => renderMealsInfo(data.meals[0]))
}


const renderMealsInfo = meal => {
    const mealDiv = document.getElementById('mealDetail')
    const mealInfo = `
    <img src="${meal.strMealThumb}">
    <h3> ${meal.strMeal}</h3>
    <h5> Ingredients</h5>

    <li>${meal.strIngredient1}</li>
    <li>${meal.strIngredient2}</li>
    <li>${meal.strIngredient3}</li>
    <li>${meal.strIngredient4}</li>
    <li>${meal.strIngredient5}</li>
    <li>${meal.strIngredient6}</li>
    <li>${meal.strIngredient7}</li>
    <li>${meal.strIngredient8}</li>
    <li>${meal.strIngredient9}</li>
    <li>${meal.strIngredient10}</li>
    `
    mealDiv.innerHTML = mealInfo;
}