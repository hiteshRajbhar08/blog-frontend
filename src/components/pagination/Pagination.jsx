import './pagination.css';

const Pagination = ({ pages, currentpage, setCurrentPage }) => {
  const generatedPages = [];

  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="page previous"
        onClick={() => setCurrentPage((current) => current - 1)}
        disabled={currentpage === 1}
      >
        Previous
      </button>
      {generatedPages.map((page) => (
        <div
          onClick={() => setCurrentPage(page)}
          className={currentpage === page ? 'page active' : 'page'}
          key={page}
        >
          {page}
        </div>
      ))}
      <button
        className="page next"
        onClick={() => setCurrentPage((current) => current + 1)}
        disabled={currentpage === pages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
