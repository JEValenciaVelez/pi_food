//import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Card.css';




const Card = ({items}) => {
   


    return(
        
        <div className="card">
            {
                
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


export default Card;