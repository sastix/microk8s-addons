import { Controller, Get } from '@nestjs/common';
import { SnapService } from "./snap.service";
import {serviceInfo} from "@common/models/service-info.interface.";

@Controller('snap')
export class SnapController {

    constructor(private readonly snapService: SnapService) { }

    @Get('/info')
    async snapInfo(): Promise<serviceInfo[]> {
       return this.snapService.getServices();
    }

}
