import { makeAutoObservable, runInAction } from "mobx";
import { Person, ResponseData } from "../types";
import { fetchApiData } from "../helpers/fetchAPI";

class PeopleStore {
  people: Person[] = [];
  loading: boolean = false;
  page: number = 1;
  total: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchPeople(page: number) {
    this.setLoading(true);

    const data = await fetchApiData<ResponseData<Person[]>>(`https://swapi.dev/api/people/?page=${page}`);

    this.setData(data.results);

    runInAction(() => {
      this.page = page;
      this.total = data.count;
    });

    this.setLoading(false);
  }

  setData(values: Person[]) {
    this.people = [...values];
  }

  setLoading(value: boolean) {
    this.loading = value;
  }
}

const store = new PeopleStore();

export default store;
