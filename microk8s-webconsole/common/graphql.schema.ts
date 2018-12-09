export interface Addon {
    name: string;
    enabled: boolean;
}

export interface JournalCtlLog {
    MESSAGE?: string;
    SYSLOG_IDENTIFIER?: string;
    _HOSTNAME?: string;
    _PID?: string;
    _UID?: string;
    _BOOT_ID?: string;
    PRIORITY?: string;
    _MACHINE_ID?: string;
    _EXE?: string;
    _COMM?: string;
}

export interface MicroK8sOverview {
    timestamp: string;
    output: string;
}

export interface IMutation {
    setAddonStatus(name: string, enabled: boolean, password?: string): Addon | Promise<Addon>;
    setPower(enabled: boolean): Power | Promise<Power>;
    setServiceStatus(name: string, enabled: boolean): ServiceInfo | Promise<ServiceInfo>;
    setServiceMode(name: string, enabled: boolean): ServiceInfo | Promise<ServiceInfo>;
    restartService(name: string): ServiceInfo | Promise<ServiceInfo>;
}

export interface Power {
    running: boolean;
}

export interface IQuery {
    getAddons(): Addon[] | Promise<Addon[]>;
    getMicroK8sOverview(): MicroK8sOverview | Promise<MicroK8sOverview>;
    getPower(): Power | Promise<Power>;
    getServiceInfo(): ServiceInfo[] | Promise<ServiceInfo[]>;
    getServiceLogs(name: string, size: string): ServiceLogs | Promise<ServiceLogs>;
    temp__(): boolean | Promise<boolean>;
}

export interface ServiceInfo {
    name: string;
    mode: string;
    status: string;
}

export interface ServiceLogs {
    name: string;
    logs?: JournalCtlLog[];
}
