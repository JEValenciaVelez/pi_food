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


router.get('/recipes/',  (req, res)=>{
    const{name} = req.query;
    res.status(200).send(`nombre de receta ${name}`)
});



router.post('/recipes', (req, res)=>{
    const recipe = req.body;
    res.status(200).json({nuevaReceta: recipe});
})



router.get('/diets',(req, res)=>{
    const {name, age} = req.body;
    res.status(200).send(`name: ${name}, edad: ${age}`);
})


module.exports = router;
