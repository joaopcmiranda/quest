export type Area = {
  name: string;
  key: string;
  region: Region;
}

export type Region = {
  name: string;
  key: string;
  areas: Record<string, Area>
}