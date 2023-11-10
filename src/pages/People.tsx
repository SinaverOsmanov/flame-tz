import { observer } from "mobx-react-lite";
import Search from "../components/Search";
import PeopleList from "../components/PeopleList";
import { useNavigate } from "react-router-dom";

const People = observer(() => {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <Search />
        <button onClick={() => navigate("/")}>to Home</button>
      </header>
      <PeopleList />
    </div>
  );
});

export default People;
