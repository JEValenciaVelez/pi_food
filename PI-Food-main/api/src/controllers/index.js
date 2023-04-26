
const axios = require('axios');
const{URL, API_KEY} = process.env;


const listRecipes = [];  // data para actualizar la base de datos
const listDiets = [];


const getRecipeById = async (id) => {

   const response = await axios.get(`${URL}${id}/information?apiKey=${API_KEY}`);   

   const data = response.data;

   //console.log(data);

   if(!data) throw new Error(`Not Found`);

   const recipe = {
    id: data.id,
    name: data.title,
    summary: data.summary.replace(/<\/?[^>]+(>|$)/g, ""), //elimino caracteres irregulares del texto
    healthscore: data.healthScore,
    steps: data.instructions.replace(/<\/?[^>]+(>|$)/g, ""),
    vegetarian: data.vegetarian,
    vegan: data.vegan,
    glutenFree: data.glutenFree,
    diets: data.diets

    };

    listRecipes.push(recipe);

    return recipe;
   
};


const getRecipeByName = async (name) =>{

    const nameToLowerCase = name.toLowerCase();

    const response = await axios.get(`${URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`);   

    const data = response.data;

    if(!data) throw new Error('Not found');

    const elementsOfData = Object.values(data)[0];

    let results = [];

    for(let i=0; i<elementsOfData.length; i++){
        const arr = elementsOfData[i].title.toLowerCase().replace(',','').split(' ');
       //console.log(arr,arr.includes(nameToLowerCase))
       if(arr.includes(nameToLowerCase)) results.push(elementsOfData[i]);
       
    }

    results= results.map(el=>{
        return {
            id:el.id,
            nombre: el.title,
            pasoApaso: el.summary.replace(/<\/?[^>]+(>|$)/g, ""),
            vegetarian: el.vegetarian,
            vegan: el.vegan,
            glutenFree: el.glutenFree,
            diets: el.diets
        }
    })

    //console.log(results);

    return results;

    
};





module.exports = {getRecipeById, getRecipeByName};