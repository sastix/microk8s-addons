import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { execFile, exec } from 'child_process';

const exec_promise = promisify(execFile);
const exec_sudo_promise = promisify(exec);

@Injectable()
export class ShellService {

  async execCommand(cmd: string, args: string [], password?: string): Promise<string> {
    if (password){
      const argString = args.join(' ');
      const command = `echo ${password} | sudo -S ${cmd} ${argString}`;
      const { stdout, stderr } = await exec_sudo_promise(command);
      return stdout;
    } else {
      const { stdout, stderr } = await exec_promise(cmd, args);
      return stdout;
    }
  }
}
