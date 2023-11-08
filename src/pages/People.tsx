import React, { useEffect } from "react";
import peopleStore from "../store/PeopleStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import localStorageService from "../services/localStorage";
import { Person } from "../types";

const People = observer(() => {
  const navigate = useNavigate();

  const toggleFavorite = (person: Person) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    localStorageService.setTokens().person(person);
  };

  useEffect(() => {
    peopleStore.getPeople();
  }, []);

  return (
    <div>
      <div className="list">
        <div className="list_head">
          <div className="list_col">name</div>
          <div className="list_col">height</div>
          <div className="list_col">mass</div>
          <div className="list_col">hair_color</div>
          <div className="list_col">Add Favorite/Remove favorite</div>
        </div>
        <div className="list_body">
          {peopleStore.loading && <div>Loading...</div>}
          {peopleStore.people &&
            !peopleStore.loading &&
            peopleStore.people.map((person, _, array) => (
              <div
                className="list_item"
                key={person.name}
                onClick={() => navigate(`/peoples/${array.indexOf(person) + 1}`)}
              >
                <div className="list_col">{person.name}</div>
                <div className="list_col">{person.height}</div>
                <div className="list_col">{person.mass}</div>
                <div className="list_col">{person.hair_color}</div>
                <div className="list_col">
                  <button onClick={toggleFavorite(person)}>add/remove</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
});

export default People;
