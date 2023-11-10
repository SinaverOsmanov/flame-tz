import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import peopleStore from "../store/PeopleStore";
import Pagination from "./Pagination";
import PeopleListItem from "./PeopleListItem";

const PeopleList = observer(() => {
  const { people, loading, total, page } = peopleStore;

  async function fetchPeopleDataByPage(page: number) {
    await peopleStore.fetchPeople(page);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        await fetchPeopleDataByPage(1);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="spinner"></div>;

  return (
    <>
      <div className="list">
        <div className="list_head">
          <div className="list_col">name</div>
          <div className="list_col">height</div>
          <div className="list_col">mass</div>
          <div className="list_col">hair_color</div>
          <div className="list_col">Add Favorite/Remove favorite</div>
        </div>
        <div className="list_body">
          {people && !loading && people.map((person) => <PeopleListItem item={person} key={person.url} />)}
        </div>
      </div>
      <Pagination total={total} pageSize={10} current={page} getPageList={fetchPeopleDataByPage} />
    </>
  );
});

export default PeopleList;
