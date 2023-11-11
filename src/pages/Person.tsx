import { useNavigate, useParams } from "react-router-dom";
import personStore from "../store/PersonStore";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import BackButton from "../components/BackButton";
import { mappingToStringByKey } from "../helpers/mappingToStringByKey";
import localStorageService from "../services/localStorage";
import { PersonRecord } from "../types";

const Person = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { person, loading } = personStore;
  const [isFavorite, setIsFav] = useState(true);

  const { getTokens, setTokens, removeTokens } = localStorageService;
  const navigate = useNavigate();

  useEffect(() => {
    if (!!id) {
      personStore.fetchPerson(id);
    } else {
      navigate("/peoples");
    }
  }, [id, navigate]);

  const columnHeaders = [
    "gender",
    "height",
    "mass",
    "hair_color",
    "birth_year",
    "eye_color",
    "skin_color",
    "homeworld",
    "films",
    "species",
    "vehicles",
    "starships",
  ];

  const toggleFavorite = (person: PersonRecord) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const people = getTokens().people();
    const isFoundPerson = people.find((p) => p.url === person.url);

    if (!!isFoundPerson) {
      removeTokens().person(person);
      setIsFav(true);
    } else {
      setTokens().person(person);
      setIsFav(false);
    }
  };
  if (!person) return <div className="spinner"></div>;
  if (loading) return <div className="spinner"></div>;

  return (
    <div className="person-details">
      <header>
        <div>
          <h1 className="title">{person.name}</h1>
        </div>
        <div>
          <button onClick={toggleFavorite(person)} className={`${isFavorite ? "" : "remove_button"}`}>
            {isFavorite ? "Add" : "remove"}
          </button>
        </div>
      </header>
      <div className="list">
        <div className="list_head">
          {columnHeaders.map((key) => (
            <div className="list_col" key={key}>
              {key}
            </div>
          ))}
        </div>
        <div className="list_body">
          <div className="list_item disable">
            <div className="list_col">{person.gender}</div>
            <div className="list_col">{person.height}</div>
            <div className="list_col">{person.mass}</div>
            <div className="list_col">{person.hair_color}</div>
            <div className="list_col">{person.birth_year}</div>
            <div className="list_col">{person.eye_color}</div>
            <div className="list_col">{person.skin_color}</div>
            <div className="list_col">{person.homeworld.name}</div>
            <div className="list_col">{mappingToStringByKey(person.films, "title")}</div>
            <div className="list_col">{mappingToStringByKey(person.species, "name")}</div>
            <div className="list_col">{mappingToStringByKey(person.vehicles, "name")}</div>
            <div className="list_col">{mappingToStringByKey(person.starships, "name")}</div>
          </div>
        </div>
      </div>

      <BackButton />
    </div>
  );
});

export default Person;
