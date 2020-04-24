export interface Addon {
  name: string;
  description: string;
  status: "enabled" | "disabled";
  version: string;
}

export interface AddonStatus {
  status: number;
  logs: string;
}

export interface Status {
  addons: Addon[],
  microk8s: {running: boolean}
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

export interface Power {
  running: boolean;
}

export interface ServiceInfo {
  name: string;
  // mode: string;
  // status: string;
}

export interface ServiceLogs {
  name: string;
  logs?: JournalCtlLog[];
}

export interface Version {
  microk8s: string;
  webconsole: string;
}


