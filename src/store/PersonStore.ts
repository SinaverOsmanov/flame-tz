import { makeAutoObservable } from "mobx";
import { FilmType, Person, PersonRecord, PlanetType, SpeciesType, Starship, VehicleType } from "../types";
import { fetchApiData, fetchLinkedObjects } from "../helpers/fetchAPI";

class PersonStore {
  person: PersonRecord | null = null;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchPerson(id: string) {
    this.setLoading(true);

    const data = await fetchApiData<Person>(`https://swapi.dev/api/people/${id}`);

    const homeworld = await fetchApiData<PlanetType>(data.homeworld);
    const species = await fetchLinkedObjects<SpeciesType>(data.species);
    const films = await fetchLinkedObjects<FilmType>(data.films);
    const vehicles = await fetchLinkedObjects<VehicleType>(data.vehicles);
    const starships = await fetchLinkedObjects<Starship>(data.starships);

    const settleData = {
      homeworld,
      species,
      vehicles,
      starships,
      films,
    };

    type ResultObject = { [K in keyof typeof settleData]: (typeof settleData)[K] };

    const result = await Promise.allSettled(Object.entries(settleData));

    const resultObject: ResultObject = result.reduce((acc, cur) => {
      if (cur.status === "fulfilled" && cur.value) {
        const [key, data] = cur.value;

        if (Object.keys(acc).length === 0) {
          return acc;
        } else {
          (acc as any)[key] = data;
        }
      }

      return acc;
    }, settleData);

    this.setData({ ...data, ...resultObject });

    this.setLoading(false);
  }

  setData(value: PersonRecord) {
    this.person = value;
  }

  setLoading(value: boolean) {
    this.loading = value;
  }
}

const store = new PersonStore();

export default store;
