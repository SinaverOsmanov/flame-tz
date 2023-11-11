import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";
import searchStore from "../store/SearchStore";
import { useNavigateToPersonUrl } from "../hooks/useNavigateToUrl";
import Pagination from "./Pagination";

const Search = observer(() => {
  const navigate = useNavigateToPersonUrl();

  const { search, searchResults, loading, page, total } = searchStore;

  async function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    await searchStore.searchQuery(event.target.value, 1);
  }

  async function fetchPeopleDataByPage(page: number) {
    await searchStore.searchQuery(search, page);
  }

  const renderSearchResults = () => {
    if (total > 0) {
      return searchResults.map((p) => (
        <p className="search_list__item" key={p.name} onClick={() => navigate(p.url)}>
          {p.name}
        </p>
      ));
    } else if (total === 0) {
      return <p className="search_list__item disable">Not found</p>;
    } else return null;
  };

  return (
    <div className="search">
      <div className={`search_input${loading ? " spinner" : ""}`}>
        <input type="text" value={search} onChange={handleInputChange} />
      </div>
      {!loading && search.length !== 0 && (
        <div className="search_list">
          {renderSearchResults()}
          <Pagination current={page} pageSize={10} getPageList={fetchPeopleDataByPage} total={total} />
        </div>
      )}
    </div>
  );
});

export default Search;
