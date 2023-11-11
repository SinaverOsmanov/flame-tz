import { makeAutoObservable, runInAction } from "mobx";
import { Person, ResponseData } from "../types";
import { fetchApiData } from "../helpers/fetchAPI";
import { debounce } from "./../helpers/debounce";

class SearchStore {
  search: string = "";
  searchResults: Person[] = [];
  loading: boolean = false;

  page: number = 1;
  total: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setSearch = async (value: string) => {
    this.search = value;
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

  fetchPeople = async (query: string, page: number) => {
    try {
      runInAction(() => {
        this.setLoading(true);
        this.page = 1;
      });

      if (query !== "") {
        const response = await this.performSearch(query, page);

        runInAction(() => {
          this.setData(response.results);
          this.total = response.count;
          this.page = page;
        });
      } else {
        this.reset();
      }
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  private performSearch = async (value: string, page: number): Promise<ResponseData<Person[]>> => {
    return await fetchApiData<ResponseData<Person[]>>(`https://swapi.dev/api/people/?page=${page}&search=${value}`);
  };

  searchQuery = async (val: string, page: number) => {
    runInAction(() => {
      this.setLoading(true);
    });

    this.setSearch(val);
    await this.debounceFetchPeople(val, page);
  };

  debounceFetchPeople = debounce(this.fetchPeople, 700);
}

const store = new SearchStore();

export default store;
