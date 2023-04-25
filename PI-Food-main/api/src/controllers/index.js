
const axios = require('axios');
const{URL, API_KEY} = process.env;





const getRecipeById = async (id) => {

   const response = await axios.get(`${URL}${id}/information?apiKey=${API_KEY}`);   

   const data = response.data;

   //console.log(data);

   if(!data) throw new Error(`Not Found`);

   const recipe = {
    id: data.id,
    name: data.title,
    summary: data.summary.replace(),
    healthscore: data.healthScore,
    steps: data.instructions,
    vegetarian: data.vegetarian,
    vegan: data.vegan,
    glutenFree: data.glutenFree,
    diets: data.diets
};

   return recipe;

     
};








module.exports = {getRecipeById};