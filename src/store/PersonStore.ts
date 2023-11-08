import { makeAutoObservable } from "mobx";
import { Person } from "../types";

class PersonStore {
  person: Person | null = null;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
  async getPerson(id: string) {
    this.loading = true;

    const response = await fetch(`https://swapi.dev/api/people/${id}`);

    if (!response.ok) throw new Error();

    const data: Person = await response.json();

    this.person = data;

    this.loading = false;
  }
}

const store = new PersonStore();

export default store;
