import { Injectable } from '@nestjs/common';
import { safeLoad } from 'js-yaml';
import { ShellService } from "../core/services/shell/shell.service";
import {Version} from "@common/models/version.interface";
const packageJson = require('../../package.json');

@Injectable()
export class VersionService {
    constructor(private shellService: ShellService) {}

    async getVersion(): Promise<Version>{
        try{
            const parsed = safeLoad(await this.shellService.execCommand('snap', ['info', 'microk8s']));
            const microk8sInstalledVersion: string = parsed['installed'];
            const version: Version = { microk8s: microk8sInstalledVersion , webconsole: packageJson.version};
            return version;
        }catch (err) {
            const version: Version = {microk8s: `error getting the version - ${err}`, webconsole: packageJson.version};
            return version;
        }
    }
}
