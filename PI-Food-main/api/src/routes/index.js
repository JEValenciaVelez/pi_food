const { Router } = require('express');
const { getRecipeById, getRecipeByName, createRecipe, getDiets } = require('../controllers');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes/:idRecipe', async (req, res)=>{
    const {idRecipe} = req.params;

    try{
        res.status(200).json( await getRecipeById(idRecipe));
    }catch(error){
        res.status(404).json({err: error.message});
    }
});

// Esta ruta obtiene el detalle de una receta específica. Es decir que devuelve un objeto con la información pedida en el detalle de una receta.
// La receta es recibida por parámetro (ID).
// Tiene que incluir los datos de los tipos de dietas asociados a la receta.
// Debe funcionar tanto para las recetas de la API como para las de la base de datos.


router.get('/recipes/', async (req, res)=>{

    const{name} = req.query;
    
    try{
        res.status(200).json( await getRecipeByName(name));
    }catch(error){
        res.status(404).json({err: error.message});
    }
});

// Esta ruta debe obtener todas aquellas recetas que coincidan con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
// Debe poder buscarla independientemente de mayúsculas o minúsculas.
// Si no existe la receta, debe mostrar un mensaje adecuado.
// Debe buscar tanto las de la API como las de la base de datos.



router.post('/recipes', async (req, res)=>{
    const recipe = req.body;

    try{
        res.status(200).json(await createRecipe(recipe));
    }catch(error){
        res.status(404).json({err: error.message});
    }
})



router.get('/diets',async (req, res)=>{
    
    
    try{
        res.status(200).json(await getDiets())
    }catch(error){
        res.status(404).json({err: error.message});
    }
})


module.exports = router;
