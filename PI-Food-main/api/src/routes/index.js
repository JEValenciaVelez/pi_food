const { Router } = require('express');
const { getRecipeById } = require('../controllers');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes/:idRecipe', async (req, res)=>{
    const {idRecipe} = req.params;

    try{
        res.status(200).json({recipe: await getRecipeById(idRecipe)});
    }catch(error){
        res.status(404).json({err: error.message});
    }
});

// Esta ruta obtiene el detalle de una receta específica. Es decir que devuelve un objeto con la información pedida en el detalle de una receta.
// La receta es recibida por parámetro (ID).
// Tiene que incluir los datos de los tipos de dietas asociados a la receta.
// Debe funcionar tanto para las recetas de la API como para las de la base de datos.


router.get('/recipes/',  (req, res)=>{
    const{name} = req.query;
    res.status(200).send(`nombre de receta ${name}`)
});

// Esta ruta debe obtener todas aquellas recetas que coincidan con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
// Debe poder buscarla independientemente de mayúsculas o minúsculas.
// Si no existe la receta, debe mostrar un mensaje adecuado.
// Debe buscar tanto las de la API como las de la base de datos.



router.post('/recipes', (req, res)=>{
    const recipe = req.body;
    res.status(200).json({nuevaReceta: recipe});
})



router.get('/diets',(req, res)=>{
    const {name, age} = req.body;
    res.status(200).send(`name: ${name}, edad: ${age}`);
})


module.exports = router;
