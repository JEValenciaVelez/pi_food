import { Link } from "react-router-dom";
import './Nav.css';
import data from "../../utils/data";
import axios from "axios";


 

const Nav = ({setFilteredData, setOrder}) => {



    //funcion para los filtros ***********************************************************************************
    const handleOption = async (e) => {
        switch (e.target.value) {
          case 'gluten free': {
            const itemsFiltrados = data.filter((el) => el.diets.includes(e.target.value));
            console.log(itemsFiltrados);
            setFilteredData(itemsFiltrados);//seteo filtered data del componente padre home para luego pasarselo a cards y renderice la data
            break;
          }
          case 'ketogenic':
          case 'vegetarian':
          case 'vegan':
          case 'pescatarian':
          case 'paleolithic': {
            const itemsFiltrados = data.filter((el) => el.diets.includes(e.target.value));
            console.log(itemsFiltrados);
            setFilteredData(itemsFiltrados);
            if (itemsFiltrados.length === 0) {
              window.alert('No hay registros');
            }
            break;
          }
          case 'api': {
            try {
              const response = await axios.get('http://localhost:3001/recipes/');//peticion a mi servidor
              const apiData = response.data;
              console.log(apiData);
              setFilteredData(apiData);
            } catch (error) {
              console.error(error);
            }
            break;
          }
          case 'database': {
            try {
              const response = await axios.get('http://localhost:3001/recipes/');//peticion a mi servidor
              const dataBase = response.data;
              console.log(dataBase);
              setFilteredData(dataBase);
            } catch (error) {
              console.error(error);
            }
            break;
          }
          default: {
            console.log(`Valor no válido: ${e.target.value}`);
            break;
          }
        }
      };

      //************************************************************************************************* */

      //funcion para los bobotenes de ordenamientos
      const handleOrder = (e) =>{

        console.log('clic en ordenar')
          switch (e.target.value) {

              case "A-Z": {
                const newArray = [...data].sort((a, b) => a.title.charAt(0).localeCompare(b.title.charAt(0)));
                console.log(newArray)
                setOrder(newArray);
                break;
              }
              case "Z-A": {
                const newArray = [...data].sort((a, b) => b.title.charAt(0).localeCompare(a.title.charAt(0)));//para ordenar strings descendente
                console.log(newArray)
                setOrder(newArray);
                break;
              }
              case "asc": {
                const newArray = [...data].sort((a, b) => a.healthScore - b.healthScore);//para ordenar numeros ascendente
                console.log(newArray)
                setOrder('orden asc',newArray);
                break;
                
              }
              case "des": {
                const newArray = [...data].sort((a, b) => b.healthScore - a.healthScore);
                console.log(newArray)
                setOrder('orden des', newArray);
                break;
                
              }
            
              default :{
                console.log(`Valor no válido: ${e.target.value}`);
                break;
            }
        }

    };


      //************************************************************************************************ */
    
    

    return (
        <nav className="nav-bar">
        <Link to='/home'>
        {/* <img src="https://w7.pngwing.com/pngs/777/495/png-transparent-kitchen-cook-restaurant-chef-vinyl-group-kitchen-miscellaneous-kitchen-food.png" alt="logo.png" /> */}
        </Link>
        <div className="nav-filters">
            <select onChange={handleOption}>
                <option value="">Filtrar por dieta</option>
                <option value="gluten free">Gluten free</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="paleolithic">Paleolithic</option>
            </select>
            <select onChange={handleOption}>
                <option value="">Filtrar por origen</option>
                <option value="api">API</option>
                <option value="database">Database</option>
            </select>
        </div>
        <div className="nav-order">
            <button onClick={handleOrder} value="A-Z">Ordenar por nombre A-Z</button>
            <button onClick={handleOrder} value="Z-A">Ordenar por nombre Z-A</button>
            <button onClick={handleOrder} value="asc">Ordenar por comida saludable ascendente</button>
            <button onClick={handleOrder} value="des">Ordenar por comida saludable descendente</button>
        </div>
        
        <div className="nav-buttons">
            <Link to='/recipes'>
                <button>Agregar Receta</button>
            </Link>
        </div>
    </nav>
    )
};

export default Nav;