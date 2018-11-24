import { Injectable } from '@nestjs/common';
import {promisify} from "util";
import {execFile} from "child_process";

const exec_promise = promisify(execFile);

@Injectable()
export class ShellService {

    async execCommand(cmd: string, args: string []): Promise<string> {
        const { stdout, stderr } = await exec_promise(cmd,  args);

        return stdout;
    }

}
