import { useEffect, useState } from "react";



const Pagination = ({ totalItems, itemsPerPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const pages = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    const handleClick = (page)=>{
        setCurrentPage(page);
    };

    useEffect(()=>{
        // Aquí se puede agregar la lógica para actualizar la URL o hacer una llamada a la API
        console.log(`navegando a la pagina ${currentPage}`)
    },[currentPage])
  
    return (
      <div className="pagination">
        {pages.map((page) => (
          <button onClick={()=>handleClick(page)} key={page}>{page}</button>
        ))}
      </div>
    );
  };
  

export default Pagination;