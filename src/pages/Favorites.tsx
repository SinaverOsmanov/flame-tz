import React, { useEffect, useState } from "react";
import localStorageService from "../services/localStorage";
import { Person } from "../types";
import { useNavigate } from "react-router-dom";
import BackButton from "./../components/BackButton";

const Favorites = () => {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState<Person[]>([]);

  const removeFavorite = (person: Person) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    localStorageService.removeTokens().person(person);

    const filteredFavorite = favorites.filter((f) => f.name !== person.name);

    setFavorites(filteredFavorite);
  };

  useEffect(() => {
    const data = localStorageService.getTokens().people();

    setFavorites(data);
  }, []);

  return (
    <>
      <div className="list">
        <div className="list_head">
          <div className="list_col">name</div>
          <div className="list_col">height</div>
          <div className="list_col">mass</div>
          <div className="list_col">hair_color</div>
          <div className="list_col">Remove favorite</div>
        </div>
        <div className="list_body">
          {favorites &&
            favorites.map((person, _, array) => (
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
                  <button className="remove_button" onClick={removeFavorite(person)}>
                    remove
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <BackButton />
    </>
  );
};

export default Favorites;
