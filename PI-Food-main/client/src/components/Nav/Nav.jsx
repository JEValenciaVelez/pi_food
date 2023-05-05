import { Link } from "react-router-dom";
import './Nav.css';
import data from "../../utils/data";
import axios from "axios";


 //creo contexto con mayuscula inicial para que react lo pueda leer como componente para envolver un componente y pasarle data, otra opcion de pasar data entre componentes
//  const MyContext = React.createContext();

const Nav = () => {

    //aqui va la logica de los botones, y estados para el renderizado de las cards pasando props a searchBar para el boton de busqueda, abria q pasarle recipes para setear el resultado segun la busqueda
    //implementar algoritmos de ordenamiento para los botones de ordenamiento de las cards


    //funcion que toma el valor del boton y setea el estado option del componente
    const handleOption = (e) => {


        if(e.target.value === 'gluten free'){

            const itemsFiltrados = data.filter(el=>el.diets.includes(e.target.value));
            console.log(itemsFiltrados);

        }

        if(e.target.value ==="ketogenic"){

            const itemsFiltrados = data.filter(el=>el.diets.includes(e.target.value));
            console.log(itemsFiltrados)
            if(itemsFiltrados.length===0) return window.alert(`No hay registros`);
        }

        if(e.target.value ==="vegetarian"){

            const itemsFiltrados = data.filter(el=>el.diets.includes(e.target.value));
            console.log(itemsFiltrados)
            if(itemsFiltrados.length===0) return window.alert(`No hay registros`);
        }

        if(e.target.value ==="vegan"){

            const itemsFiltrados = data.filter(el=>el.diets.includes(e.target.value));
            console.log(itemsFiltrados);
            if(itemsFiltrados.length===0) return window.alert(`No hay registros`);
        }

        
        if(e.target.value ==="pescatarian"){

            const itemsFiltrados = data.filter(el=>el.diets.includes(e.target.value));
            console.log(itemsFiltrados);
            if(itemsFiltrados.length===0) return window.alert(`No hay registros`);
        }

        if(e.target.value ==="paleolithic"){

            const itemsFiltrados = data.filter(el=>el.diets.includes(e.target.value));
            console.log(itemsFiltrados)
            if(itemsFiltrados.length===0) return window.alert(`No hay registros`);
        } 
        
        if(e.target.value ==="api"){

            let data = [];

            const apiData = async ()=>{

                const response = await axios.get('http://localhost:3001/recipes/');

                data = response.data;

                console.log(data)

                return;
            };

            apiData();
        }        

    };
    

    return (
        <nav className="nav-bar">
        <Link to='/home'>
        {/* <img src="https://w7.pngwing.com/pngs/777/495/png-transparent-kitchen-cook-restaurant-chef-vinyl-group-kitchen-miscellaneous-kitchen-food.png" alt="logo.png" /> */}
        </Link>
        <div className="nav-filters">
            <select onChange={handleOption}>
                <option value="">Filtrar por dieta</option>
                <option value="gluten free">Gluten free</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="paleolithic">Paleolithic</option>
            </select>
            <select onChange={handleOption}>
                <option value="">Filtrar por origen</option>
                <option value="api">API</option>
                <option value="database">Database</option>
            </select>
        </div>
        <div className="nav-order">
            <button>Ordenar por nombre A-Z</button>
            <button>Ordenar por nombre Z-A</button>
            <button>Ordenar por comida saludable ascendente</button>
            <button>Ordenar por comida saludable descendente</button>
        </div>
        
        <div className="nav-buttons">
            <Link to='/recipes'>
                <button>Agregar Receta</button>
            </Link>
        </div>
    </nav>
    )
};

export default Nav;