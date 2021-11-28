const btn = document.getElementById("getData");
const spinner = document.getElementById("spinner");
const query = document.getElementById("query");
spinner.classList.add("invisible");
btn.addEventListener('click', e => {
    e.preventDefault();
    getData();
});
async function getData() {
    spinner.classList.remove("invisible");
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query.value}`).then(res => res.json()).then(data => { console.log(data); return data; }).then(data => display(data));
    console.log(data);
}
function display(data) {
    const cardTemplate = (idMeal, strMeal, strMealThumb) => {
        return `
                <div class="card crd m-lg-3 m-2" data-id="${idMeal}" onclick="getFood(${idMeal})" style="">
                    <img src="${strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${strMeal}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                            additional
                            content. This content is a little bit longer.</p>
                    </div>
                </div>
            `;
    };
    spinner.classList.add("invisible");
    const meals = data.meals;
    document.getElementById("data").innerHTML = "";
    meals.forEach(meal => {
        const col = document.createElement('div');
        col.classList.add('col');
        col.innerHTML = cardTemplate(meal.idMeal, meal.strMeal, meal.strMealThumb);
        document.getElementById("data").appendChild(col);
    });
}
async function getFood(id) {
    document.getElementById("data").innerHTML = "";
    spinner.classList.remove("invisible");
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const dataJSON = await data.json();
    const displayFood = () => {
        const meal = dataJSON.meals[0];
        console.log(meal);
        const card = `
        <div class="card mb-3 w-100">
            <div class="row g-0">
            <div class="col-md-4">
                <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="${meal.strMeal}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h4 class="card-title">${meal.strMeal} <br>
                    <h6>Origin: ${meal.strArea}</h6>
                    <h6>Category: ${meal.strCategory}</h6>
                    
                    </h4>
                    <h6 class="underlined"><u>How To make:</u></h6>
                    <p class="card-text">${meal.strInstructions}</p>
                    <a href="${meal.strYoutube}" class="btn btn-info" target="_blank">Youtube Recipie</a>
                </div>
            </div>
            </div>
        </div>
        `;
        spinner.classList.add("invisible");
        document.getElementById("data").innerHTML = card;
    };
    displayFood();
}
document.body.addEventListener("change", e => {
    console.log(e.target);
});