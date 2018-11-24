import { Injectable } from '@nestjs/common';
import { safeLoad } from 'js-yaml';
import { ShellService } from "../core/services/shell/shell.service";
import {Version, WEBCONSOLE_VERSION} from "@common/models/version.interface";

@Injectable()
export class VersionService {
    constructor(private shellService: ShellService) {}

    async getVersion(): Promise<Version>{
        try{
            const parsed = safeLoad(await this.shellService.execCommand('snap', ['info', 'microk8s']));
            const microk8sInstalledVersion: string = parsed['installed'];
            const version: Version = { microk8s: microk8sInstalledVersion , webconsole: WEBCONSOLE_VERSION};
            return version;
        }catch (err) {
            const version: Version = {microk8s: `error getting the version - ${err}`, webconsole: WEBCONSOLE_VERSION};
            return version;
        }
    }
}
