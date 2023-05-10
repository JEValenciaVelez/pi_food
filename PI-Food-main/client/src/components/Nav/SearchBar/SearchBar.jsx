import axios from 'axios';
import './SearchBar.css';
import { useEffect, useState } from 'react';



const SearchBar = () => {
   
    const [recipes, setRecipes] = useState([]);
    const [name ,setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    };

    useEffect(() => {
        const getRecipes = async () => {
          try {
            const response = await axios(`http://localhost:3001/recipes/?name=${name}`);
            const data = await response.data;
            setRecipes(data);
            console.log(data)
          } catch (error) {
            console.log(error);
          }
        };
        getRecipes();
      }, [name]);

    

    const handleSearch = () => {
        console.log(recipes)
        
    };


    return(
        <div className="search">
            <label htmlFor="search">Busca tus recetas</label>
            <input onChange={handleChange} type="search" name="search" />
            <button onClick={handleSearch}>Buscar</button>
        </div>
    )
};

export default SearchBar;