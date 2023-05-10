
const axios = require('axios');
const {Recipe, Diet} = require('../db');
const{URL, API_KEY} = process.env;




const getRecipeById = async (id) => {

   try {
    const response = await axios.get(`${URL}${id}/information?apiKey=${API_KEY}`);
    const data = response.data;

    if (Object.keys(data).length > 0) {
      const recipe = {
        id: data.id,
        name: data.title,
        image: data.image,
        summary: data.summary.replace(/<\/?[^>]+(>|$)/g, ""),
        healthscore: data.healthScore,
        steps: data.instructions.replace(/<\/?[^>]+(>|$)/g, ""),
        vegetarian: data.vegetarian,
        vegan: data.vegan,
        glutenFree: data.glutenFree,
        diets: data.diets
      };

      return recipe;
    } else {
      throw new Error("No se encontraron datos para esa receta.");
    } 
  } catch (error) { 

    console.error(error);

    await Recipe.sync();

    const recipeFromDb = await Recipe.findByPk(id);

    if (recipeFromDb) {

      return recipeFromDb.toJSON();

    } else {

      throw new Error("No se encontró la receta en la base de datos.");

    }
  }
   
};



const getRecipeByName = async (name) =>{

    try {

        if (!name) {
          const response = await axios.get(`${URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=20`);
          const data = response.data;
    
          const elementsOfData = Object.values(data)[0];
          return elementsOfData; 
        }

        const nameToLowerCase = name.toLowerCase();
    
        const response = await axios.get(`${URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=20`);
        const data = response.data;
    
        let results = [];
    
        if (data) {

          const elementsOfData = Object.values(data)[0];
    
          for (let i = 0; i < elementsOfData.length; i++) {

            const arr = elementsOfData[i].title.toLowerCase().replace(",", "").split(" ");
            if (arr.includes(nameToLowerCase)) results.push(elementsOfData[i]);
          }

          results = results.map((el) => ({
            id: el.id,
            name: el.title,
            image: el.image,
            summary: el.summary.replace(/<\/?[^>]+(>|$)/g, ""),
            vegetarian: el.vegetarian,
            vegan: el.vegan,
            glutenFree: el.glutenFree,
            diets: el.diets
          }));
        }

  
        if (results.length === 0) {
          
          await Recipe.sync();

          
          const recipesInDb = await Recipe.findAll({ 
            where: {
              name: nameToLowerCase.split(",")[0]
            }
          });

          
          if (recipesInDb.length === 0) throw new Error("No se encontraron registros.");
    
          return recipesInDb.map((recipe) => recipe.toJSON());
        }
    
        return results;

      } catch (error) {
        
        console.error(error);
        throw error;
      }
   
};




const createRecipe = async (recipe) => {

  if (!recipe.name || !recipe.summary || !recipe.image || !recipe.healthScore || !recipe.steps) {
    throw new Error('The recipe must have properties name, summary, image, healthScore, steps');
  }

  
  const recipeEncontrada = await Recipe.findOne({
    where: { name: recipe.name }
  });

  if (recipeEncontrada) {
    throw new Error('The recipe already exists in the database');
  }

  await Recipe.sync();

  
  const newRecipe = await Recipe.create({
    name: recipe.name,
    image: recipe.image,
    summary: recipe.summary,
    healthScore: recipe.healthScore,
    steps: recipe.steps
  });

  console.log('Recipe created in the database:', newRecipe);

  return 'Recipe created successfully';
  
};




const getDiets = async () => {

    const response = await axios.get(`${URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`);   

    const data = response.data;

    const elementsOfData = Object.values(data)[0];

    const allDiets = [];

    for(let i = 0; i < elementsOfData.length; i++) {
        const el = elementsOfData[i];
        allDiets.push(el.diets.join(',').split(','));
    }

    const newArray = allDiets.flat();

    const newArrayUnico = newArray.filter((item,index,self)=> self.indexOf(item)===index);

    await Diet.sync();

    for(let i = 0; i < newArrayUnico.length; i++) {
        const el = newArrayUnico[i];
        await Diet.create({
            Nombre: el
        });
    }

    await Diet.sync();

    const dietsEnBD = await Diet.findAll();
    
    const nombres = dietsEnBD.map((diet) => diet.Nombre);
    
    if(nombres.length<1) throw new Error('No existen registros');

    return nombres.join(',');
    
    
};


const getDataBase = async () => {

  await Recipe.sync();

  const recipesDB = await Recipe.findAll();

  if (recipesDB.length === 0) {
    console.log("No hay recetas en la base de datos");
    return "No hay recetas en la base de datos"; 
  }

  return recipesDB;

};



const deleteRecipe = async (name) => {
  
  await Recipe.sync();

  let recipe = await Recipe.findOne({
    where:{
      name: name
    }
  });

  if (!recipe) {
    throw new Error(`No se encontró la receta con nombre ${name}`);
  }

  await recipe.destroy();

  return `Se eliminó la receta  ${name} exitosamente`;

};




module.exports = {getRecipeById, getRecipeByName, createRecipe, getDiets,getDataBase, deleteRecipe};