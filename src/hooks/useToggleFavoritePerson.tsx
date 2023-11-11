import { useEffect, useState } from "react";
import localStorageService from "../services/localStorage";
import { Person, PersonRecord } from "../types";
export function useToggleFavoritePerson(person: Person | PersonRecord) {
  const [isFavorite, setIsFav] = useState(true);

  const { getTokens, setTokens, removeTokens } = localStorageService;

  const toggleFavorite = (url: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const people = getTokens().people();
    const isFoundPerson = people.find((p) => p.url === url);

    if (!!isFoundPerson) {
      removeTokens().person(isFoundPerson);
      setIsFav(true);
    } else {
      setTokens().person(person);
      setIsFav(false);
    }
  };

  useEffect(() => {
    const people = getTokens().people();
    const isFoundPerson = people.find((p) => p.url === person.url);

    if (isFoundPerson) {
      setIsFav(false);
    }
  }, []);

  return { isFavorite, toggleFavorite, setIsFav };
}
