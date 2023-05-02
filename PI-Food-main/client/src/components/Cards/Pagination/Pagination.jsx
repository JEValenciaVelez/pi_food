


const Pagination = ({ totalItems, itemsPerPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  
    return (
      <div className="pagination">
        {pages.map((page) => (
          <button key={page}>{page}</button>
        ))}
      </div>
    );
  };
  

export default Pagination;