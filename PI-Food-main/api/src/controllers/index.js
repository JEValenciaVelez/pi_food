
const axios = require('axios');
const {Recipe, Diet} = require('../db');
const{URL, API_KEY} = process.env;




const getRecipeById = async (id) => {

   const response = await axios.get(`${URL}${id}/information?apiKey=${API_KEY}`);   

   const data = response.data;

   console.log(data)

   if(data){

     //abstraigo data de la api
   const recipe = {
    id: data.id,
    name: data.title,
    image: data.image,
    summary: data.summary.replace(/<\/?[^>]+(>|$)/g, ""), //elimino caracteres irregulares del texto
    healthscore: data.healthScore,
    steps: data.instructions.replace(/<\/?[^>]+(>|$)/g, ""),
    vegetarian: data.vegetarian,
    vegan: data.vegan,
    glutenFree: data.glutenFree,
    diets: data.diets

    };

    return recipe;

   }

    //sincronizo la tabla Recipe de base de datos
    await Recipe.sync();

    //de la tabla me traigo por id
    const RecetasEnBd = await Recipe.findAll({
        where:{ID: id}
    });
    // const recetaById = RecetasEnBd.map(rec=> rec.ID === id);

     return RecetasEnBd;

   
};



const getRecipeByName = async (name) =>{

    const nameToLowerCase = name.toLowerCase();

    const response = await axios.get(`${URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`);   

    const data = response.data;

    if(data){

        const elementsOfData = Object.values(data)[0];
        console.log(elementsOfData)
        let results = [];
    
        for(let i=0; i<elementsOfData.length; i++){
            const arr = elementsOfData[i].title.toLowerCase().replace(',','').split(' ');
           console.log(arr,arr.includes(nameToLowerCase))
           if(arr.includes(nameToLowerCase)) results.push(elementsOfData[i]);
           
        }
    
        results= results.map(el=>{
            return {
                id:el.id,
                name: el.title,
                image: el.image,
                summary: el.summary.replace(/<\/?[^>]+(>|$)/g, ""),
                vegetarian: el.vegetarian,
                vegan: el.vegan,
                glutenFree: el.glutenFree,
                diets: el.diets
            }
        })
    
        return results;  
    }

   
    const recetaEnBd = await Recipe.findAll({
        where: {
         Nombre: name
         }
     });
 
     if(!recetaEnBd) throw new Error('No se encontraron registros');

     return recetaEnBd;
};




const createRecipe = async (recipe) => {

    if( !recipe.name || !recipe.summary || !recipe.image || !recipe.healthScore || !recipe.steps){
        throw new Error('La receta debe tener propiedades  name, summary, image,healthScore, steps ');
    }

    //busco la receta en la BD
    const recipeEncontrada = await Recipe.findAll({
        where:{Nombre: recipe.name}
    });
    console.log('receta encontrada en BD',recipeEncontrada);
    if(recipeEncontrada.length>0) throw new Error('La receta existe en base de datos')


    //lleno los campos de la tabla Recipe de la bd con la data
    const newRecipe = await Recipe.create({
        Nombre: recipe.name,
        imagen: recipe.image,
        ResumenDelPlato: recipe.summary,
        healthScore: recipe.healthScore,
        PasoApaso: recipe.steps
    });

    //console.log('receta creada en base de datos',newRecipe);

    return `Receta creada con exito`;
  
};




const getDiets = async () => {

    const response = await axios.get(`${URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`);   

    const data = response.data;

    //console.log(data);
    const elementsOfData = Object.values(data)[0];

    const allDiets = [];

    //extraigo de la api la datas de dietas y la guardo en un array
     elementsOfData.forEach(async el => {
        //console.log(el.diets.join(','));
        allDiets.push(el.diets.join(',').split(','));
    });

    //console.log(allDiets)
//como allDiets es un array de arrays, para eliminar los arrays internos y dejar solo los strings en un solo array 
    const newArray = allDiets.flat(); //guardo alldiets en newarray sin los arrays anidados

    const newArrayUnico = newArray.filter((item,index,self)=> self.indexOf(item)===index); // eliminar elementos duplicados

    //console.log(newArrayUnico);

    //ahora puedo guardar cada elemento del array en la tabla diets usando un foreach
    newArrayUnico.forEach(async el=>{
        await Diet.create({
            Nombre: el
        })
    });

    // const descripcionTabla = await Diet.describe(); // describe la tabla Diet

    // console.log(descripcionTabla);
    await Diet.sync(); // sincroniza el modelo con la base de datos

    const dietsEnBD = await Diet.findAll(); // obtiene todos los registros de la tabla Diet en un array
    
    const nombres = dietsEnBD.map((diet) => diet.Nombre); // obtiene la columna Nombre de cada registro
    
    //console.log(nombres); // muestra todos los valores de la columna Nombre
    if(nombres.length<1) throw new Error('No existen registros');

    return nombres.join(',');
    
};




module.exports = {getRecipeById, getRecipeByName, createRecipe, getDiets};