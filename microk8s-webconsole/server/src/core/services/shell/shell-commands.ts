export class ShellCommands {

    serviceRestart(serviceName: string): string {
        return `sudo systemctl restart snap.${serviceName}.service`;
    }

    serviceStart(serviceName: string, enable: boolean) {
        return `sudo systemctl ${enable ? 'start' : 'stop'} snap.${serviceName}.service`;
    }

    serviceEnable(serviceName: string, enabled: boolean) {
        return `sudo systemctl ${enabled ? 'enable' : 'disable'} snap.${serviceName}.service`;
    }

    serviceLogs(serviceName: string, size: string) {
        return `sudo journalctl --lines=${size} --unit=snap.${serviceName}.service --no-pager --output=json-pretty`;
    }

    snapInfo(snapName: string) {
        return `snap info ${snapName}`;
    }

    mk8sStatus() {
        return `microk8s.status --yaml`;
    }

    mk8sOverview() {
        return `microk8s.kubectl get all --all-namespaces`;
    }

    mk8sEnable(addOnName: string, enable: boolean) {
        return `microk8s.${enable ? 'enable' : 'disable'} ${addOnName}`;
    }

    mk8sStart(enable: boolean) {
        return `microk8s.${enable ? 'start' : 'stop'}`;
    }

}