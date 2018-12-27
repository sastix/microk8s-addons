import { Injectable } from '@nestjs/common';
import { safeLoad } from 'js-yaml';
import { ShellService } from '../core/services/shell/shell.service';
import { JournalCtlLog, ServiceInfo, ServiceLogs } from '@common/graphql.schema';
import { ShellCommands } from '../core/services/shell/shell-commands';

@Injectable()
export class SnapService {

    constructor(private shellService: ShellService, private shellCommands: ShellCommands) { }

    async getServices(): Promise<ServiceInfo[]> {
        const parsedOutput = safeLoad(await this.shellService.execCommand(this.shellCommands.snapInfo('microk8s')));

        const serviceInfoList = [];

        for (const element in parsedOutput.services) {
            const opts: string = parsedOutput.services[element];
            const el = opts.split(', ');
            serviceInfoList.push({name: element, mode: el[1].replace(' ', ''), status: el[2].replace(' ', '')});
        }

        return serviceInfoList;
    }

    async getService(name: string): Promise<ServiceInfo> {
        const parsedOutput = safeLoad(await this.shellService.execCommand(this.shellCommands.snapInfo('microk8s')));

        for (const element in parsedOutput.services) {
            const opts: string = parsedOutput.services[element];
            const el = opts.split(', ');
            if(element === name) {
                return {name: element, mode: el[1].replace(' ', ''), status: el[2].replace(' ', '')};
            }
        }
    }

    async setServiceStatus(serviceName: string, active: boolean): Promise<ServiceInfo> {
        await this.shellService.execCommand(this.shellCommands.serviceStart(serviceName, active));

        return this.getService(serviceName);
    }

    async setServiceMode(serviceName: string, enabled: boolean): Promise<ServiceInfo> {
        await this.shellService.execCommand(this.shellCommands.serviceEnable(serviceName, enabled));

        return this.getService(serviceName);
    }

    async restartService(serviceName: string): Promise<ServiceInfo> {
        await this.shellService.execCommand(this.shellCommands.serviceRestart(serviceName));

        return this.getService(serviceName);
    }

    async getServiceLogs(serviceName: string, size: string): Promise<ServiceLogs> {
        const output = await this.shellService.execCommand(this.shellCommands.serviceLogs(serviceName, size));
        const logs : [JournalCtlLog] = JSON.parse(`[ ${output.replace(new RegExp('}\n{', 'g'), '},\n{')} ]`);

        return {name: serviceName, logs: logs}
    }

}
