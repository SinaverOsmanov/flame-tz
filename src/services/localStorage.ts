import { Person, PersonRecord } from "../types";

const PERSON_KEY = "person";

type LocalSetStorageType = {
  person: (payload: Person | PersonRecord) => void;
  people: (payload: Person[]) => void;
};
type LocalGetStorageType = {
  person: (payload: string) => Person | undefined;
  people: () => Person[] | [];
};

type LocalRemoveStorageType = {
  person: (payload: Person | PersonRecord) => void;
};

export function setTokens(): LocalSetStorageType {
  return {
    person: (payload: Person | PersonRecord) => {
      const people = getTokens().people();
      const isFoundPerson = people.find((p) => p.url === payload.url);

      if (!isFoundPerson) {
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
    person: (payload: string) => {
      const people = getTokens().people();
      return people.find((p) => p.url === payload);
    },
    people: () => JSON.parse(localStorage.getItem(PERSON_KEY) ?? "[]"),
  };
}

export function removeTokens(): LocalRemoveStorageType {
  return {
    person: (payload: Person | PersonRecord) => {
      let people = getTokens().people();

      if (!Array.isArray(people)) {
        console.warn("Invalid data in local storage.");
        people = [];
      }

      people = people.filter((p) => p.url !== payload.url);
      setTokens().people(people);
    },
  };
}

const personLocalStorageService = {
  setTokens,
  getTokens,
  removeTokens,
};

export default personLocalStorageService as typeof personLocalStorageService;
