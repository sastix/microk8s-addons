import { Injectable } from '@nestjs/common';
import { safeLoad } from 'js-yaml';
import { ServiceInfo } from '@common/models/service-info.interface.';
import { ShellService } from '../core/services/shell/shell.service';

@Injectable()
export class SnapService {

    constructor(private shellService: ShellService) { }

    async getServices(): Promise<ServiceInfo[]> {
        const parsedOutput = safeLoad(await this.shellService.execCommand('snap', ['info', 'microk8s']));

        const serviceInfoList = [];

        for(const element in parsedOutput.services) {
            const opts: string = parsedOutput.services[element];
            const el = opts.split(', ');
            serviceInfoList.push({name: element, mode: el[1].replace(' ', ''), status: el[2].replace(' ', '')});
        }

        return serviceInfoList;
    }

    async setServiceStatus(serviceName: string, enabled: boolean): Promise<ServiceInfo[]> {
        await this.shellService.execCommand('sudo',  ['systemctl', enabled ? 'start' : 'stop', 'snap.' + serviceName + '.service']);

        return this.getServices();
    }


}
