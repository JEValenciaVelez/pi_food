
import Card from "./Card";
import './Cards.css'
import Pagination from "./Pagination/Pagination";
import { useState, useEffect } from 'react'; // se agrega useEffect para hacer la petición http en el montaje del componente
import axios from "axios";
import data from "../../utils/data";

//componente cards es el encargado de renderizar las card 
//recibe por parametro dos objetos uno con prop items que es un array de objetos, y otro con prop order que es un array de objetos ordenados , todos del componente padre
const Cards = ({items, order}) => {

  //console.log(order)
 // estados para la paginación
 const [currentPage, setCurrentPage] = useState(1);//estado para pagina actual y para su cambio de estado
 const [itemsPerPage, setItemsPerPage] = useState(6);//estado para items por pagina y su cambio de estado

 const indexOfLastItem = currentPage * itemsPerPage;//indice del ultimo item
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;//indice del primer item

 //funcion q toma un numero de pagina y setea es estado de la pagina actual con ese numero, es una funcion de paginacion
 const paginate = (pageNumber) => {
   setCurrentPage(pageNumber);
 };

 // creo estado para almacenar la data obtenida de la petición http
 const [recipes, setRecipes] = useState([]);

 // creo estado para almacenar la data obtenida del input
 const [name, setName] = useState('');

 //funcion asyncrona de busqueda
 const handleSearch = async () => {
   try {//prueba accion
    //espero respuesta de la ruta
     const response = await axios.get(`http://localhost:3001/recipes/?name=${name}`);
     //guardo respuesta
     const data = response.data;
     //seteo estado de las recetas con la respuesta
     setRecipes(data);
   } catch (error) { //si hay error lo atrapo
     console.log(error); // lo muestro por consola
   }
 };

 //captu
 const handleChange = (e) => {
   if (e.target.name === 'search') {//capturo el nombre que cargo el evento y lo evaluo
     setName(e.target.value);//seteo el estado name con el value del elemento que cargo el evento
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