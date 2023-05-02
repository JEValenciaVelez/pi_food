import { Link } from "react-router-dom";
import './Nav.css';
import SearchBar from "./SearchBar/SearchBar";



const Nav = () => {

    return (
        <nav className="nav-bar">
        <Link to='/home'>
        <img src="https://w7.pngwing.com/pngs/777/495/png-transparent-kitchen-cook-restaurant-chef-vinyl-group-kitchen-miscellaneous-kitchen-food.png" alt="logo.png" />
        </Link>
        <div className="nav-filters">
            <select>
                <option value="">Filtrar por dieta</option>
                <option value="gluten free">Gluten free</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="paleolithic">Paleolithic</option>
            </select>
            <select>
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
        <SearchBar/>
        <div className="nav-buttons">
            <Link to='/recipes'>
                <button>Agregar Receta</button>
            </Link>
        </div>
    </nav>
    )
};

export default Nav;