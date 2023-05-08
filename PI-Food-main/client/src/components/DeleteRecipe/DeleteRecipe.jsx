import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import './DeleteRecipe.css'



//componenete de eliminacion de receta de base de datos
const DeleteRecipe = () => {
    // creo estado para nombre de receta y su metodo de cambio de estado
    const [name, setName] = useState('');
  
    // creo función que me setea el valor del name
    const handleChange = (e) => {
      setName(e.target.value);
    };
  
    // función que hace la petición HTTP
    const handleSubmit = async (e) => {
      e.preventDefault();//funcion que evita que se refresque la pagina
  
      try {
        const response = await axios.delete('http://localhost:3001/deleteRecipe', { data: { name } });
        console.log(`Esta es la data de respuesta http: ${response.data}`, `el nombre de la receta enviada: ${name}`);
      } catch (error) {
        console.log(error.message);
      }
    };
  
    return (
      <form className="delete-form" onSubmit={handleSubmit}>
        <h1>Elimina Receta de la base de datos</h1>
        <span>Escribe el nombre de la receta que deseas eliminar como está en la carta</span>
        <input type="text" value={name} onChange={handleChange} placeholder="Nombre de la receta" />
        <button type="submit">Eliminar Receta</button>
        <Link to='/home'>
        <h1>Volver al home</h1>
        </Link>
      </form>
    );
  };
  

export default DeleteRecipe;