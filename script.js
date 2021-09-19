let form=document.querySelector('#search');
let input=document.querySelector('#search input');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(input.value!=""){
      let recipe=document.querySelector('#recipes');
      recipe.style.backgroundColor="#FF5C58"
      recipe.style.padding="12rem 0 36rem 0";
      recipe.style.marginTop="-11rem";
      recipe.style.height="40rem";
      fetchdata(input.value);
    }
})


async function fetchdata(inputData){
    const API_ID="d9f6dc81";
    const API_KEY="c0462e3bbce4a4ed0569355214166795";
    let response = await fetch(
        "https://api.edamam.com/api/recipes/v2?type=public&app_id=" +
			API_ID +
			"&app_key=" +
			API_KEY +
			"&q=" +
			inputData
    )
    let data=await response.json();
    console.log(data);
    CreateCards(data);
}

function cards(hits,index){
    return `
        <div class="recipe_card">
             <img src="${hits[index].recipe.image}"
                 class="recipe_img" alt="...">
            <div class="recipe_body">
                <h2 class="recipe_title">${hits[index].recipe.label}</h2>
                <p class="recipe_text">Calories: ${Math.round(
									hits[index].recipe.calories
								)}</p>                
                <p class="recipe_text">Cuisine: ${
									hits[index].recipe.cuisineType
								}</p>
                <p class="recipe_text">Diet Type: ${
									hits[index].recipe.dietLabels
								}</p>
                <a href="${
									hits[index].recipe.url
								}" class="recipe_button">Start Cooking</a>
            </div>
        </div>`;
}

function CreateCards(data){
    document.querySelector("#recipes").innerHTML="";
    var hits =data.hits
    for(let i=0;i<3;i++)
    {
        document.querySelector("#recipes").innerHTML += cards(hits,i);
    }
}