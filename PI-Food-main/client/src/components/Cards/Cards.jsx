
import data from "../../utils/data";
import Card from "./Card";
import './Cards.css'
import Pagination from "./Pagination/Pagination";
import {useState} from 'react';
import axios from "axios";

const Cards = () => {

  //  const {MyContext} = useContext(MyContext);
  //  console.log(MyContext)

    //estados para la paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
      

    // creo estado para almacenar la data obtenida de la peticion http
    const [recipes, setRecipes] = useState([]);

    //creo estado para almacenar la data obtenida del input
    const [name ,setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    };

    
  //creo funcion q me realiza peticion http asyncrona 
    const handleSearch = async () => {

        //console.log(recipes)
        try {
            const response = await axios(`http://localhost:3001/recipes/?name=${name}`);
            const data = await response.data;
            setRecipes(data);
            console.log(data)
          } catch (error) {
            console.log(error)
        
          }
        };

    return(
        <div>
            <div>
    <div className="cards-container">
      <h1>Recetas Disponibles</h1>
      <div className="search">
        <label htmlFor="search">Busca tus recetas</label>
        <input onChange={handleChange} type="search" name="search" />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {recipes.length > 0 ? (
        <Card items={recipes} currentPage={currentPage} itemsPerPage={itemsPerPage} />
      ) : (
        <Card items={data} currentPage={currentPage} itemsPerPage={itemsPerPage} />
      )}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={recipes.length > 0 ? recipes.length : data.length}
        paginate={paginate}
      />
    </div>
  </div>
        </div>
    )
}



export default Cards;