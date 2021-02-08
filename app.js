const searchMeals = () => {
    const inputValue = document.getElementById('inputValue').value;
    if (inputValue == "") {
        return;
    }
    // previous display text clear after every new search
    document.getElementById('mealDetail').innerText = "";
    document.getElementById('ingredient').innerText = "";
    document.getElementById('errorMessage').innerText = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(response => response.json())
        .then(data => displaySearchMeals(data.meals))
        .catch(error => displayErrorMessage('Something went wrong! Please try again...'));
}


//display food name and image
const displaySearchMeals = meals => {
    const mealsDiv = document.getElementById('mealsDiv');
    mealsDiv.innerText = " ";
    meals.forEach(mealsInfo => {
        const newDiv = document.createElement('div');
        newDiv.className = "foods";
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


//fetch data to get food details 
const displayMealsDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    fetch(url)
        .then(res => res.json())
        .then(data => renderMealsInfo(data.meals[0]))
        .catch(error => console.log(error));
}


//display ingredients with food image and name
const renderMealsInfo = meal => {
    const mealDiv = document.getElementById('mealDetail')
    document.getElementById('mealDetail').innerHTML = "";
    const mealInfo = `
    <img src="${meal.strMealThumb}">
    <h3 id="textStyle"> ${meal.strMeal}</h3>
    <h5> Ingredients</h5>
    `
    mealDiv.innerHTML = mealInfo;

    const ingredients = [meal.strIngredient1, meal.strIngredient2, meal.strIngredient3, meal.strIngredient4, meal.strIngredient5, meal.strIngredient6, meal.strIngredient7, meal.strIngredient8, meal.strIngredient9, meal.strIngredient10];

    const ul = document.getElementById('ingredient');
    ul.innerHTML = "";
    ingredients.forEach(ingredientsElement => {
        if (ingredientsElement === "" || ingredientsElement === null) {
            return ingredientsElement;
        } else {
            const ul = document.getElementById('ingredient');
            const li = document.createElement('li');
            li.innerText = ingredientsElement;
            ul.appendChild(li);
        }
    });
}


//function for error message 
const displayErrorMessage = error => {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.innerText = error;
}