
import Card from "./Card";
import './Cards.css'
import Pagination from "./Pagination/Pagination";
import { useState, useEffect } from 'react'; // se agrega useEffect para hacer la petición http en el montaje del componente
import axios from "axios";
import data from "../../utils/data";


const Cards = ({items, order}) => {

  //console.log(order)
 // estados para la paginación
 const [currentPage, setCurrentPage] = useState(1);
 const [itemsPerPage, setItemsPerPage] = useState(6);

 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;

 const paginate = (pageNumber) => {
   setCurrentPage(pageNumber);
 };

 // creo estado para almacenar la data obtenida de la petición http
 const [recipes, setRecipes] = useState([]);

 // creo estado para almacenar la data obtenida del input
 const [name, setName] = useState('');

 const handleSearch = async () => {
   try {
     const response = await axios.get(`http://localhost:3001/recipes/?name=${name}`);
     const data = response.data;
     setRecipes(data);
   } catch (error) {
     console.log(error);
   }
 };

 const handleChange = (e) => {
   if (e.target.name === 'search') {
     setName(e.target.value);
   } else if (e.target.name === 'itemsPerPage') {
     setItemsPerPage(parseInt(e.target.value));
     setCurrentPage(1); // resetear la página actual cuando se cambia la cantidad de ítems por página
   }
 };

 // setear las recetas obtenidas desde el input o desde los props
 useEffect(() => {
  if (order.length > 0) {
    setRecipes(order);
  } else if (items.length > 0) {
    setRecipes(items);
  } else {
    setRecipes(data);
  }
}, [items, order]);

console.log(recipes)

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
          <div className="items-per-page">
            <label htmlFor="itemsPerPage">Cantidad de ítems por página:</label>
            <select onChange={handleChange} name="itemsPerPage">
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="24">24</option>
            </select>
          </div>
          <Card items={recipes.slice(indexOfFirstItem, indexOfLastItem)} />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={recipes.length > 0 ? recipes.length : data.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};




export default Cards;