import { useState } from 'react';
import data from '../../utils/data';
import Nav from "../Nav/Nav";
import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer";
import './Home.css';

const Home = () => {

  const [filteredData, setFilteredData] = useState([]);

  return(
    <div className="container">
      <Nav setFilteredData={setFilteredData}/>
      <div className="display-cards">
        <span className="enunciado1">Mira tus recetas!</span>
        <span className="enunciado2"> Busca tus recetas favoritas!</span>
        <Cards items={filteredData.length > 0 ? filteredData : data}/>
      </div>
      <Footer/>
    </div>
  )
};

export default Home;
