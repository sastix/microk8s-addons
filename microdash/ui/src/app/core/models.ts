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
}

export interface ServiceLogs {
  name: string;
  logs?: JournalCtlLog[];
}

export interface Version {
  microk8s: string;
  webconsole: string;
}

export interface PodView {
  namespace: string;
  name: string;
  ready: string;
  restarts: number;
  age: string;
}

export interface ServiceView {
  namespace: string;
  name: string;
  type: string;
  cluster_ip: string;
  external_ip: number;
  ports: string;
  age: string;
}

export interface DeploymentView {
  namespace: string;
  name: string;
  ready: string;
  up_to_date: number;
  available: number;
  age: string;
}

export interface ReplicaSetView {
  namespace: string;
  name: string;
  desired: number;
  current: number;
  ready: number;
  age: string;
}

export interface K8sOverview {
  pods: PodView[];
  services: ServiceView[];
  deployments: DeploymentView[];
  replicaSets: ReplicaSetView[];
}
