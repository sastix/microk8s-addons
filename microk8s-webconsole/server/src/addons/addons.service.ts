import { Injectable } from '@nestjs/common';
import { safeLoad } from 'js-yaml';
import { Addon } from '@common/models/addon.interface';
import {ShellService} from "../core/services/shell/shell.service";

@Injectable()
export class AddonsService {

    constructor(private shellService: ShellService) { }

    async getAll(): Promise<Addon[]> {
      const parsed = safeLoad(await this.shellService.execCommand('microk8s.status', ['--yaml']));;

      const addonsList = [];

      for (const addon in parsed.addons) {
        const isEnabled: boolean = parsed.addons[addon] === 'enabled';
        addonsList.push({name: addon, enabled: isEnabled});
      }

      return addonsList;
  }
}
