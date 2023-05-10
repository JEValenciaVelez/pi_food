import { useState } from 'react';
import data from '../../utils/data';
import Nav from "../Nav/Nav";
import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer";
import './Home.css';

//componente Home
const Home = () => {

  //estados del componente Home
  //en el componente nav seteo el estado de filtereddata y Order deacuero a los eventos del usuario con los botones clickeados.
  //y en el componente cards le paso los estados seteados para renderizado
  const [filteredData, setFilteredData] = useState([]);
  const [order , setOrder] = useState([]);

  return(
    <div className="container">
      <Nav setFilteredData={setFilteredData} setOrder={setOrder}/>
      <div className="display-cards">
        {/* <span className="enunciado1">Mira tus recetas!</span>
        <span className="enunciado2"> Busca tus recetas favoritas!</span> */}
        <Cards items={filteredData.length > 0 ? filteredData : data} order={order.length ? order : []}/>
      </div>
      <Footer/>
    </div>
  )
};

export default Home;
