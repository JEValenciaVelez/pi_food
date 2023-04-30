import { Link } from "react-router-dom";
import './Nav.css';



const Nav = () => {

    return (
        <nav className="nav-bar">
            <Link to='/home'>
            <img src="" alt="logo.png" />
            </Link>
            <input type="text" placeholder="Busca tus recetas"/>
            <Link to='/recipes'>
            <button>New Recipe</button>
            </Link>
        </nav>
    )
};

export default Nav;