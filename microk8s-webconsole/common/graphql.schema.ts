export class Addon {
    name: string;
    enabled: boolean;
}

export abstract class IQuery {
    abstract getAddons(): Addon[] | Promise<Addon[]>;

    abstract temp__(): boolean | Promise<boolean>;
}
