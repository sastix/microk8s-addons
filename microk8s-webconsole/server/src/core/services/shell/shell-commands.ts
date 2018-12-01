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

    snapInfo(snapName: string) {
        return `snap info ${snapName}`;
    }

    mk8sStatus() {
        return `microk8s.status --yaml`;
    }

    mk8sEnable(addOnName: string, enable: boolean) {
        return `microk8s.${enable ? 'enable' : 'disable'} ${addOnName}`;
    }

    mk8sStart(enable: boolean) {
        return `microk8s.${enable ? 'start' : 'stop'}`;
    }

}