
import Nav from "../Nav/Nav";
import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer";
import './Home.css';

const Home = () => {

    return(
        <div className="container">
            <Nav/>
            <div className="display-cards">
                <span className="enunciado1">Mira tus recetas!</span>
                <span className="enunciado2"> Busca tus recetas favoritas!</span>
                <Cards/>
            </div>
            <Footer/>
        </div>
    )
};

export default Home;