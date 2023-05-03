import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import './RecipeDetail.css';


const RecipeDetail = ()=> {

    const {id} = useParams();
    const [recipe, setRecipe] = useState({});

    useEffect(()=>{
        axios.get(`http://localhost:3001/recipes/${id}`)
        .then(({data})=>{
            //console.log(data)
            if(data.id ) setRecipe(data);
            else window.alert('No hay recetas con ese id');
        });
        return setRecipe({});
    }, [id]);

    console.log(recipe)

    return (
       <div className="container">
        <h1>Detalle</h1>
        <Link to='/home'>
        <h2>{recipe.name}</h2>
        </Link>
        
        <img src={recipe.image} alt="" />
        <h2>Resumen del plato</h2>
        <p>{recipe.summary}</p>
        <h2>Healtscore: {recipe.healthscore}</h2>
        <h2>Paso a paso</h2>
        <p>{recipe.steps}</p>
        <h2>Tipos de dieta</h2>
        <p>{recipe.diets}</p>
       </div>
    )
};

export default RecipeDetail;