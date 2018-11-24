import { Controller, Get } from '@nestjs/common';
import {VersionService} from "./version.service";
import {Version} from "@common/models/version.interface";

@Controller('version')
export class VersionController {
    constructor(private readonly versionService: VersionService){}

    @Get()
    async getVersion(): Promise<Version>{
        return this.versionService.getVersion();
    }
}
