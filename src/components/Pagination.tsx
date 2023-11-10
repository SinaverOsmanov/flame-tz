type PaginationPropsType = {
  current: number;
  pageSize: number;
  total: number;
  getPageList: (page: number) => void;
};

const Pagination = ({ total, pageSize = 5, current, getPageList }: PaginationPropsType) => {
  const pages: string[] = new Array(Math.ceil(total / pageSize)).fill("");

  if (total < pageSize) return <div></div>;

  return (
    <div className="pagination">
      <div>
        <button disabled={current === 1} onClick={() => getPageList(current - 1)}>
          prev
        </button>
      </div>
      <div className="pagination_pages">
        {pages.map((_, index) => {
          const page = index + 1;
          const isActive = page === current;

          return (
            <span key={page} onClick={() => getPageList(page)} className={`page_number${isActive ? " active" : ""}`}>
              {page}
            </span>
          );
        })}
      </div>
      <div>
        <button disabled={current === Math.ceil(total / 10)} onClick={() => getPageList(current + 1)}>
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
