//import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Card.css';



//el componente card me recibe por parametro un objeto con propiedad 'items' que es un array de objetos del componente padre
const Card = ({items}) => {

    //pruebo por consola que me llegue el item
    console.log(items);

    //el componente me renderiza en el DOM
    return(
        //un contenedor card
        <div className="card">
            {
                //mapeo el array y desestructuro lo que voy a renderizar en los elementos html del DOM
                items.map(el => (
                    <div key={el.id}>
                        <Link to={`/recipes/${el.id}`}>
                        <h2>{el.title}</h2>
                        <h2>{el.name}</h2>
                        </Link>
                        <img src={el.image} alt="" />
                        {/* <h2>{el.summary}</h2> */}
                        <h3>{el.diets}</h3>
                    </div>
                ))
            }

        </div>
    )
};

//exporto el componente card para ser usado fuera de este modulo
export default Card;