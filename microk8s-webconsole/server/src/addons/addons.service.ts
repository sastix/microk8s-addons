import { Injectable } from '@nestjs/common';
import { safeLoad } from 'js-yaml';
import { Addon } from '@common/models/addon.interface';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import {ShellService} from '../core/services/shell/shell.service';

@Injectable()
export class AddonsService {

  constructor(private shellService: ShellService) { }

  async getAll(): Promise<Addon[]> {
    return await from(this.shellService.execCommand('microk8s.status', ['--yaml'])).pipe(
      map(r => safeLoad(r).addons),
      map(addons => {
        const values: Addon[] = [];
        for (const key in addons){
          if (addons.hasOwnProperty(key)){
            values.push({name: key, enabled: addons[key] === 'enabled'});
          }
        }
        return values;
      }),
    ).toPromise();
  }
}
