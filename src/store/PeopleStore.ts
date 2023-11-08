import { makeAutoObservable } from "mobx";
import { Person, ResponseData } from "../types";

class PeopleStore {
  people: Person[] | null = null;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
  async getPeople() {
    this.loading = true;

    const response = await fetch("https://swapi.dev/api/people");

    if (!response.ok) throw new Error();

    const jsonResponse: ResponseData = await response.json();
    this.people = [...jsonResponse.results];

    this.loading = false;
  }
}

const store = new PeopleStore();

export default store;
