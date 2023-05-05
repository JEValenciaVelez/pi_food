
import './Pagination.css'



const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className={currentPage === 1 ? "disabled" : ""}>
          <button onClick={() => paginate(currentPage - 1)}>Prev</button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? "active" : ""}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
        <li className={currentPage === pageNumbers.length ? "disabled" : ""}>
          <button onClick={() => paginate(currentPage + 1)}>Next</button>
        </li>
      </ul>
    </nav>
  );
};
    
  
  

export default Pagination;