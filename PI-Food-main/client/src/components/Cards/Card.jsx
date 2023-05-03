//import { useState, useEffect } from "react";
import data from "../../utils/data";
import './Card.css';
import {Link} from 'react-router-dom'
//import axios from "axios";


const Card = () => {

    // const [recipes, setRecipes] = useState[[]];

    // useEffect(()=>{
    //     axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=f64e717600614575b0e38dce0f2bc615&addRecipeInformation=true&number=10`)
    //     .then(({data})=>{
    //         //console.log(data)
    //         if(data.id ) setRecipes(data);
    //         else window.alert('No hay recetas ');
    //     });
    //     return setRecipes([]);
    // }, []);



    return(
        <div className="card">
            {
                data.map(el => (
                    <div key={el.id}>
                        <Link to={`/recipes/${el.id}`}>
                        <h2>{el.title}</h2>
                        </Link>
                        <img src={el.image} alt="" />
                        <h3>{el.diets}</h3>
                    </div>
                ))
            }

        </div>
    )
};

export default Card;