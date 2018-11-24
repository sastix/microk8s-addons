export interface Addon {
    name: string;
    enabled: boolean;
}

export interface IMutation {
    setAddonStatus(name: string, enabled: boolean): Addon | Promise<Addon>;
}

export interface IQuery {
    getAddons(): Addon[] | Promise<Addon[]>;
    temp__(): boolean | Promise<boolean>;
}
