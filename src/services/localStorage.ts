import { Person } from "../types";

const PERSON_KEY = "person";

type LocalSetStorageType = {
  person: (token: Person) => void;
  people: (people: Person[]) => void;
};
type LocalGetStorageType = {
  people: () => Person[];
};

export function setTokens(): LocalSetStorageType {
  return {
    person: (payload: Person) => {
      const people = getTokens().people();
      const isPersonFound = people.find((p) => p.name === payload.name);

      if (!isPersonFound) {
        localStorage.setItem(PERSON_KEY, JSON.stringify([...people, payload]));
      }
    },
    people: (payload: Person[]) => {
      localStorage.setItem(PERSON_KEY, JSON.stringify([...payload]));
    },
  };
}

export function getTokens(): LocalGetStorageType {
  return {
    people: () => JSON.parse(localStorage.getItem(PERSON_KEY) ?? "[]"),
  };
}

export function removeTokens() {
  return {
    person: (payload: Person) => {
      let people = getTokens().people();

      if (!Array.isArray(people)) {
        throw new Error("Invalid data");
      }

      people = people.filter((p) => p.name !== payload.name);
      setTokens().people(people);
    },
  };
}

const localStorageService = {
  setTokens,
  getTokens,
  removeTokens,
};

export default localStorageService as typeof localStorageService;
