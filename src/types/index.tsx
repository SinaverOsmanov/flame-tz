type ArrayOfString = string[];

export type ResponseData<T> = {
  count: number;
  next: string;
  previous: null | string;
  results: T;
};

export type Gender = "male" | "n/a" | "female";

export type BaseData = {
  created: Date;
  edited: Date;
  url: string;
};

export type Person = BaseData & {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: Gender;
  homeworld: string;
  films: ArrayOfString;
  species: ArrayOfString;
  vehicles: ArrayOfString;
  starships: ArrayOfString;
};

export type PersonRecord = Omit<Person, "homeworld" | "species" | "vehicles" | "starships" | "films"> & {
  homeworld: PlanetType;
  films: FilmType[];
  species: SpeciesType[];
  vehicles: VehicleType[];
  starships: Starship[];
};

export type PlanetType = BaseData & {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: ArrayOfString;
  films: ArrayOfString;
};

export type FilmType = BaseData & {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  characters: ArrayOfString;
  planets: ArrayOfString;
  starships: ArrayOfString;
  vehicles: ArrayOfString;
  species: ArrayOfString;
};

export type SpeciesType = BaseData & {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: ArrayOfString;
  films: ArrayOfString;
};

export type VehicleType = BaseData & {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: ArrayOfString;
};

export type Starship = BaseData & {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: ArrayOfString;
};
