import { Injectable } from '@nestjs/common';
import { promisify } from "util";
import { safeLoad } from 'js-yaml';
import {execFile} from "child_process";
import { serviceInfo } from "@common/models/service-info.interface.";

const exec_promise = promisify(execFile);

@Injectable()
export class SnapService {

    async getServices(): Promise<serviceInfo[]> {
        const { stdout, stderr } = await exec_promise('snap',  ['info', 'microk8s']);
        const parsedOutput = safeLoad(stdout);
        const serviceInfoList = [];

        for(const element in parsedOutput.services) {
            const opts: string = parsedOutput.services[element];
            const el = opts.split(', ');
            serviceInfoList.push({name: element, mode: el[1].replace(' ', ''), status: el[2].replace(' ', '')});
        }

        return serviceInfoList;
    }

}
