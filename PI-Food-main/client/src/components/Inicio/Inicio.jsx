import {Link}  from 'react-router-dom';
import './Inicio.css';

const Inicio = () =>{

    return(
        <div className="container">

            <img src="https://w7.pngwing.com/pngs/777/495/png-transparent-kitchen-cook-restaurant-chef-vinyl-group-kitchen-miscellaneous-kitchen-food.png" alt="imagen" />
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>

        </div>
    )
};

export default Inicio;