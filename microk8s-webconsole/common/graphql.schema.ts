export interface Addon {
    name: string;
    enabled: boolean;
}

export interface IMutation {
    setAddonStatus(name: string, enabled: boolean, password?: string): Addon | Promise<Addon>;
    setServiceStatus(name: string, enabled: boolean): ServiceInfo[] | Promise<ServiceInfo[]>;
}

export interface Power {
    running: boolean;
}

export interface IQuery {
    getAddons(): Addon[] | Promise<Addon[]>;
    getServiceInfo(): ServiceInfo[] | Promise<ServiceInfo[]>;
    temp__(): boolean | Promise<boolean>;
}

export interface ServiceInfo {
    name: string;
    mode: string;
    status: string;
}
