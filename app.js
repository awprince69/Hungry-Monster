const searchMeals = () => {
    const inputValue = document.getElementById('inputValue').value;
    document.getElementById('mealDetail').innerText = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(response => response.json())
        .then(data => displaySearchMeals(data.meals))
        .catch(error => displayErrorMessage(`There are no such a result for '${inputValue}'`))
}


const displaySearchMeals = meals => {
    const mealsDiv = document.getElementById('mealsDiv')
    mealsDiv.innerText = " ";
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
        .catch(error=>console.log(error))
}


const renderMealsInfo = meal => {
    const mealDiv = document.getElementById('mealDetail')
    document.getElementById('mealDetail').innerHTML = "";
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


const displayErrorMessage= error=>{
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.innerText= error;
}