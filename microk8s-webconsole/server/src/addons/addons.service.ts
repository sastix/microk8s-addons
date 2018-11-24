import { Injectable } from '@nestjs/common';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { safeLoad } from 'js-yaml';
import { Addon } from '@common/models/addon.interface';
import { from, observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

const exec_promise = promisify(execFile);

@Injectable()
export class AddonsService {
  async getAll(): Promise<Addon[]> {
    return await from(exec_promise('microk8s.status',  ['--yaml'])).pipe(
      map(r => safeLoad(r.stdout).addons),
      map(addons => {
        const values: Addon[] = [];
        for (const key in addons){
          if (addons.hasOwnProperty(key)){
            values.push({name: key, enabled: addons[key]});
          }
        }
        return values;
      }),
    ).toPromise();
  }
}
