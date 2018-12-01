import { Injectable } from '@nestjs/common';
import { safeLoad } from 'js-yaml';
import { ShellService } from '../core/services/shell/shell.service';
import { ServiceInfo } from '@common/graphql.schema';

@Injectable()
export class SnapService {

    constructor(private shellService: ShellService) { }

    async getServices(): Promise<ServiceInfo[]> {
        const parsedOutput = safeLoad(await this.shellService.execCommand('snap', ['info', 'microk8s']));

        const serviceInfoList = [];

        for (const element in parsedOutput.services) {
            const opts: string = parsedOutput.services[element];
            const el = opts.split(', ');
            serviceInfoList.push({name: element, mode: el[1].replace(' ', ''), status: el[2].replace(' ', '')});
        }

        return serviceInfoList;
    }

    async getService(name: string): Promise<ServiceInfo> {
        const parsedOutput = safeLoad(await this.shellService.execCommand('snap', ['info', 'microk8s']));

        for (const element in parsedOutput.services) {
            const opts: string = parsedOutput.services[element];
            const el = opts.split(', ');
            if(element === name) {
                return {name: element, mode: el[1].replace(' ', ''), status: el[2].replace(' ', '')};
            }
        }
    }

    async setServiceStatus(serviceName: string, active: boolean): Promise<ServiceInfo> {
        await this.shellService.execCommand('sudo',  ['systemctl', active ? 'start' : 'stop', 'snap.' + serviceName + '.service']);

        return this.getService(serviceName);
    }

    async setServiceMode(serviceName: string, enabled: boolean): Promise<ServiceInfo> {
        await this.shellService.execCommand('sudo',  ['systemctl', enabled ? 'enable' : 'disable', 'snap.' + serviceName + '.service']);

        return this.getService(serviceName);
    }

    async restartService(serviceName: string): Promise<ServiceInfo> {
        await this.shellService.execCommand('sudo',  ['systemctl', 'restart', 'snap.' + serviceName + '.service']);

        return this.getService(serviceName);
    }

}
