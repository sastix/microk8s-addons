import { Injectable } from '@nestjs/common';
import { safeLoad } from 'js-yaml';
import { Power } from '../../../../common/models/power.interface';
import { ShellService } from '../../core/services/shell/shell.service';

@Injectable()
export class PowerService {

  constructor(private shellService: ShellService) { }

  async getState(): Promise<Power> {
    try {
      const parsed = safeLoad(await this.shellService.execCommand('microk8s.status', ['--yaml']));
      const isRunning: boolean = parsed.microk8s.running;
      const power: Power = { running: true };
      power.running = isRunning;
      return power;
    } catch(err) {
      const power: Power = { running: false };
      return power;
    }
  }

  async on(): Promise<Power> {
    await this.shellService.execCommand('microk8s.start', []);
    const power: Power = { running: true};
    power.running = true;
    return power;
  }

  async off(): Promise<Power> {
    await this.shellService.execCommand('microk8s.stop', []);
    const power: Power = { running: true};
    power.running = false;
    return power;
  }

}
