import {Link}  from 'react-router-dom'

const Inicio = () =>{

    return(
        <div className="container">
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
            <img src="" alt="imagen" />
        </div>
    )
};

export default Inicio;