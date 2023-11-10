import { makeAutoObservable, runInAction } from "mobx";
import { Person, ResponseData } from "../types";
import { fetchApiData } from "../helpers/fetchAPI";

class SearchStore {
  search: string = "";
  searchResults: Person[] = [];
  loading: boolean = false;

  page: number = 1;
  total: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setSearch = async (value: string, page: number) => {
    this.setLoading(true);

    runInAction(() => {
      this.search = value;
      this.page = 1;
    });

    if (value !== "") {
      const response: ResponseData<Person[]> = await this.performSearch(value, page);

      this.setData(response.results);
      runInAction(() => {
        this.total = response.count;
      });
    } else {
      this.reset();
    }

    this.setLoading(false);
  };

  reset = () => {
    this.searchResults = [];
    this.page = 1;
    this.total = 0;
    this.search = "";
  };

  setData(values: Person[]) {
    this.searchResults = [...values];
  }

  setLoading(value: boolean) {
    this.loading = value;
  }

  fetchPeople = async (page: number) => {
    await this.setSearch(this.search, page);
    this.page = page;
  };

  private performSearch = async (value: string, page: number): Promise<ResponseData<Person[]>> => {
    return await fetchApiData<ResponseData<Person[]>>(`https://swapi.dev/api/people/?page=${page}&search=${value}`);
  };
}

const store = new SearchStore();

export default store;
