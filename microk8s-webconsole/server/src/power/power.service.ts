import { Injectable } from '@nestjs/common';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { safeLoad } from 'js-yaml';
import { Power } from '@common/models/power.interface';

const exec_promise = promisify(execFile);

@Injectable()
export class PowerService {
  async getState(): Promise<Power> {
    try {
      const response = await exec_promise('microk8s.status',  ['--yaml']);
      const parsed = safeLoad(response.stdout);
      const isRunning: boolean = parsed['microk8s']['running'];
      const power: Power = { running: true }
      power.running = isRunning
      return power
    } catch(err) {
      const power: Power = { running: false }
      return power
    }
  }

  async on(): Promise<Power> {
    const response = await exec_promise('microk8s.start');
    const power: Power = { running: true}
    power.running = true
    return power
  }

  async off(): Promise<Power> {
    const response = await exec_promise('microk8s.stop');
    const power: Power = { running: true}
    power.running = false
    return power
  }
}
