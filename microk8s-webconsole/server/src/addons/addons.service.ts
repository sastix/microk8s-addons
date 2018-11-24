import { Injectable } from '@nestjs/common';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { safeLoad } from 'js-yaml';
import { Addon } from '@common/models/addon.interface';

const exec_promise = promisify(execFile);

@Injectable()
export class AddonsService {
  async getAll(): Promise<Addon[]> {
    const response = await exec_promise('microk8s.status',  ['--yaml']);
    const parsed = safeLoad(response.stdout);
    const addonsList = [];
    for (const addon in parsed.addons) {
      const isEnabled: boolean = parsed.addons[addon] === 'enabled';
      addonsList.push({name: addon, enabled: isEnabled});
    }
    return addonsList;
  }
}
