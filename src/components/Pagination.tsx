type PaginationPropsType = {
  current: number;
  pageSize: number;
  total: number;
  getPageList: (page: number) => void;
};

const Pagination = ({ total, pageSize = 5, current, getPageList }: PaginationPropsType) => {
  const pageNumbers: string[] = new Array(Math.ceil(total / pageSize)).fill("");

  const renderPageNumbers = () => {
    return pageNumbers.map((_, index) => {
      const page = index + 1;
      const isActive = page === current;

      return (
        <span key={page} onClick={() => getPageList(page)} className={`page_number${isActive ? " active" : ""}`}>
          {page}
        </span>
      );
    });
  };

  if (total < pageSize) return <div></div>;

  return (
    <div className="pagination">
      {total >= pageSize && (
        <div>
          <button disabled={current === 1} onClick={() => getPageList(current - 1)}>
            prev
          </button>
        </div>
      )}

      <div className="pagination_pages">{renderPageNumbers()}</div>

      {total >= pageSize && (
        <div>
          <button disabled={current === Math.ceil(total / pageSize)} onClick={() => getPageList(current + 1)}>
            next
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
