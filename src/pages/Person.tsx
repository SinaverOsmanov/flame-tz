import { useNavigate, useParams } from "react-router-dom";
import personStore from "../store/PersonStore";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import BackButton from "../components/BackButton";

const Person = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { person, loading } = personStore;
  const navigate = useNavigate();

  useEffect(() => {
    if (!!id) {
      personStore.fetchPerson(id);
    } else {
      navigate("/peoples");
    }
  }, [id, navigate]);

  if (loading) return <div className="spinner"></div>;

  if (!person) return <div>User not found</div>;

  return (
    <div>
      <h1 className="title">{person.name}</h1>
      <div className="list">
        <div className="list_head">
          <div className="list_col">height</div>
          <div className="list_col">mass</div>
          <div className="list_col">hair_color</div>
          <div className="list_col">gender</div>
          <div className="list_col">birth_year</div>
          <div className="list_col">eye_color</div>
          <div className="list_col">skin_color</div>
          <div className="list_col">homeworld</div>
          <div className="list_col">mass</div>
          <div className="list_col">films</div>
          <div className="list_col">species</div>
          <div className="list_col">vehicles</div>
          <div className="list_col">starships</div>
        </div>
        <div className="list_body">
          <div className="list_item disable">
            <div className="list_col">{person.height}</div>
            <div className="list_col">{person.mass}</div>
            <div className="list_col">{person.hair_color}</div>
            <div className="list_col">{person.gender}</div>
            <div className="list_col">{person.birth_year}</div>
            <div className="list_col">{person.eye_color}</div>
            <div className="list_col">{person.skin_color}</div>
            <div className="list_col">{person.homeworld.name}</div>
            <div className="list_col">{person.mass}</div>
            <div className="list_col">{person.films.map((f) => f.title).join(", ")}</div>
            <div className="list_col">{person.species.map((f) => f.name).join(", ")}</div>
            <div className="list_col">{person.vehicles.map((f) => f.name).join(", ")}</div>
            <div className="list_col">{person.starships.map((f) => f.name).join(", ")}</div>
          </div>
        </div>
      </div>

      <BackButton />
    </div>
  );
});

export default Person;
