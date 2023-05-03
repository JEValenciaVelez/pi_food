import './SearchBar.css';



const SearchBar = (name) => {





    return(
        <div className="search">
            <label htmlFor="search">Busca tus recetas</label>
            <input type="search" name="search"/>
            <button>Buscar</button>
        </div>
    )
};

export default SearchBar;