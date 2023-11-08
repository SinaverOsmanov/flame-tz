export type ResponseData = {
  count: number;
  next: string;
  previous: null | string;
  results: Person[];
};

export type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: Gender;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
};

export type Gender = "male" | "n/a" | "female";
