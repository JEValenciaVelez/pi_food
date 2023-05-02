import { Link } from "react-router-dom";
import './Nav.css';



const Nav = () => {

    return (
        <nav className="nav-bar">
            <Link to='/home'>
            <img src="https://w7.pngwing.com/pngs/777/495/png-transparent-kitchen-cook-restaurant-chef-vinyl-group-kitchen-miscellaneous-kitchen-food.png" alt="logo.png" />
            </Link>
            <input type="text" placeholder="Busca tus recetas"/>
            <Link to='/recipes'>
            <button>New Recipe</button>
            </Link>
        </nav>
    )
};

export default Nav;