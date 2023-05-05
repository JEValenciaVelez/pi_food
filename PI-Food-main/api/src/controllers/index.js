
const axios = require('axios');
const {Recipe, Diet} = require('../db');
const{URL, API_KEY} = process.env;




const getRecipeById = async (id) => {

    //un bloque try-catch para manejar errores y evitar que el programa se detenga si ocurre un error durante la consulta a la API.
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
    }  //Si la respuesta de la API no contiene datos, lanzo un error para manejarlo en el catch
  } catch (error) { //Moví la sincronización de la tabla Recipe y la búsqueda de la receta en la base de datos al bloque catch, para que se ejecute solo si ocurre un error al consultar la API.
    console.error(error);

    // Si ocurre un error, sincroniza la tabla Recipe de base de datos y busca la receta por ID.
    await Recipe.sync();

    //Usé findByPk en lugar de findAll para buscar la receta por ID en la base de datos, ya que solo estamos buscando una receta y no varias.
    const recipeFromDb = await Recipe.findByPk(id);

    if (recipeFromDb) {
        //Usé toJSON() para devolver los datos de la receta desde la base de datos como un objeto JSON en lugar de un modelo Sequelize
      return recipeFromDb.toJSON();
    } else {
      throw new Error("No se encontró la receta en la base de datos.");
    }
  }
   
};



const getRecipeByName = async (name) =>{

    try {
        if (!name) {
          const response = await axios.get(`${URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`);
          const data = response.data;
    
          const elementsOfData = Object.values(data)[0];
          return elementsOfData;
        }
    
        const nameToLowerCase = name.toLowerCase();
    
        const response = await axios.get(`${URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`);
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
          // Si no se encontraron resultados en la búsqueda, se sincroniza la tabla Recipe de la Bd y se busca por nombre.
          await Recipe.sync();
    
          const recipesInDb = await Recipe.findAll({
            where: {
              Nombre: nameToLowerCase.split(",")[0]
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

   // valido q se ingresen las propiedades requeridas del objeto recipe
  if (!recipe.name || !recipe.summary || !recipe.image || !recipe.healthScore || !recipe.steps) {
    throw new Error('The recipe must have properties name, summary, image, healthScore, steps');
  }

  // Chekeo q exista en base de datos
  const recipeEncontrada = await Recipe.findOne({
    where: { Nombre: recipe.name }
  });
  if (recipeEncontrada) {
    throw new Error('The recipe already exists in the database');
  }

  //sincronizo tabla de recetas de la base de datos
  await Recipe.sync();

  // creo la receta en la base de datos
  const newRecipe = await Recipe.create({
    Nombre: recipe.name,
    imagen: recipe.image,
    ResumenDelPlato: recipe.summary,
    healthScore: recipe.healthScore,
    PasoApaso: recipe.steps
  });

  console.log('Recipe created in the database:', newRecipe);

  return 'Recipe created successfully';
  
};




const getDiets = async () => {

    const response = await axios.get(`${URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`);   

    const data = response.data;

    const elementsOfData = Object.values(data)[0];

    const allDiets = [];

    //Utilizo un ciclo for en lugar de un forEach debido a que este último no espera a que todas las promesas se resuelvan
    //antes de continuar, lo que puede causar errores al momento de guardar los datos en la BD.
    for(let i = 0; i < elementsOfData.length; i++) {
        const el = elementsOfData[i];
        allDiets.push(el.diets.join(',').split(','));
    }

    const newArray = allDiets.flat();

    const newArrayUnico = newArray.filter((item,index,self)=> self.indexOf(item)===index);

    await Diet.sync();

    //Utilizo un ciclo for en lugar de un forEach por la misma razón que antes.
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




module.exports = {getRecipeById, getRecipeByName, createRecipe, getDiets};