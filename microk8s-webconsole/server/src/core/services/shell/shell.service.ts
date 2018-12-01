import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { exec } from 'child_process';

const exec_promise = promisify(exec);

@Injectable()
export class ShellService {

    async execCommandOneLine(cmd: string, password?: string): Promise<string> {
        if (password){
            // TODO: Possibly remove
            const command = `echo ${password} | sudo -S ${cmd}`;
            const { stdout, stderr } = await exec_promise(command);
            return stdout;
        } else {
            const command = `${cmd}`;
            const { stdout, stderr } = await exec_promise(command);
            return stdout;
        }
    }
}
