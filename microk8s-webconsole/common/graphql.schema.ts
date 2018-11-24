export interface Addon {
    name: string;
    enabled: boolean;
}

export interface IQuery {
    getAddons(): Addon[] | Promise<Addon[]>;
    temp__(): boolean | Promise<boolean>;
}
