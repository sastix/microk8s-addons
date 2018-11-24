export interface Addon {
  name: string;
  enabled: boolean;
}

export interface Query {
  getAddons: Addon[];
}
