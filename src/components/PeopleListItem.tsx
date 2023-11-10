import { useEffect, useMemo, useState } from "react";
import { useNavigateToPersonUrl } from "../hooks/useNavigateToUrl";
import { Person } from "../types";
import localStorageService from "../services/localStorage";

function PeopleListItem({ item }: { item: Person }) {
  const [added, setAdded] = useState(true);

  const navigate = useNavigateToPersonUrl();

  const { getTokens, setTokens, removeTokens } = localStorageService;

  const toggleFavorite = (person: Person) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const people = getTokens().people();
    const isFoundPerson = people.find((p) => p.url === person.url);

    if (!!isFoundPerson) {
      removeTokens().person(person);
      setAdded(true);
    } else {
      setTokens().person(person);
      setAdded(false);
    }
  };

  const favorite_button = useMemo(() => {
    return added && <button onClick={toggleFavorite(item)}>Add</button>;
  }, [added]);

  useEffect(() => {
    const people = getTokens().people();
    const isFoundPerson = people.find((p) => p.url === item.url);

    if (isFoundPerson) {
      setAdded(false);
    }
  }, []);

  return (
    <div className="list_item" key={item.url} onClick={() => navigate(item.url)}>
      <div className="list_col">{item.name}</div>
      <div className="list_col">{item.height}</div>
      <div className="list_col">{item.mass}</div>
      <div className="list_col">{item.hair_color}</div>
      <div className="list_col">{favorite_button}</div>
    </div>
  );
}

export default PeopleListItem;
