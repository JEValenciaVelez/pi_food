
import Nav from "./Nav/Nav";
import Cards from "./Cards/Cards";
import Footer from "./Footer/Footer";

const Home = () => {

    return(
        <div>
            <Nav/>
            <div>
                <span>Mira tus recetas</span>
                <span> Busca tus recetas favoritas, tenemos mas de 100 disponibles!</span>
                <Cards/>
            </div>
            <Footer/>
        </div>
    )
};

export default Home;