import {Link}  from 'react-router-dom';
import './Inicio.css';

const Inicio = () =>{

    return(
        <div className="container">

            <img 
            src="../../../../cooking.png" 
            alt="imagen" />
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>

        </div>
    )
};

export default Inicio;