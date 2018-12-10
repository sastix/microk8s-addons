import { Injectable } from '@nestjs/common';
import { safeLoad } from 'js-yaml';
import { ShellService } from '../../core/services/shell/shell.service';
import { Power } from '@common/graphql.schema';
import { ShellCommands } from '../../core/services/shell/shell-commands';

@Injectable()
export class PowerService {

  constructor(private shellService: ShellService, private shellCommands: ShellCommands) { }

  async getState(): Promise<Power> {
    try {
      const parsed = safeLoad(await this.shellService.execCommand(this.shellCommands.mk8sStatus()));
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
    await this.shellService.execCommand(this.shellCommands.mk8sStart(true));
    return { running: true};
  }

  async off(): Promise<Power> {
    await this.shellService.execCommand(this.shellCommands.mk8sStart(false));
    return { running: false };
  }

}
