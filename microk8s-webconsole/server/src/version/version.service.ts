import { Injectable } from '@nestjs/common';
import { safeLoad } from 'js-yaml';
import { ShellService } from "../core/services/shell/shell.service";
import {Version} from "@common/models/version.interface";
import {ShellCommands} from "../core/services/shell/shell-commands";
const packageJson = require('../../package.json');

@Injectable()
export class VersionService {
    constructor(private shellService: ShellService, private shellCommands: ShellCommands) { }
    async getVersion(): Promise<Version>{
        try{
            const parsed = safeLoad(await this.shellService.execCommand(this.shellCommands.snapInfo('microk8s')));
            const microk8sInstalledVersion: string = parsed['installed'];
            const version: Version = { microk8s: microk8sInstalledVersion , webconsole: packageJson.version};
            return version;
        }catch (err) {
            const version: Version = {microk8s: `error getting the version - ${err}`, webconsole: packageJson.version};
            return version;
        }
    }
}
