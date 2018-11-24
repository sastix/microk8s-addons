import {Body, Controller, Get, Post} from '@nestjs/common';
import { SnapService } from './snap.service';
import { serviceInfo } from '@common/models/service-info.interface.';
import { ServiceInfo } from '@common/graphql.schema';

@Controller('snap')
export class SnapController {

    constructor(private readonly snapService: SnapService) { }

    @Get('/info')
    async snapInfo(): Promise<serviceInfo[]> {
       return this.snapService.getServices();
    }

    @Post('/start')
    async startSnapService(@Body() serviceInfo: ServiceInfo): Promise<serviceInfo[]> {
        return this.snapService.setServiceStatus(serviceInfo.name, true);
    }

    @Post('/stop')
    async stopSnapService(@Body() serviceInfo: ServiceInfo): Promise<serviceInfo[]> {
        return this.snapService.setServiceStatus(serviceInfo.name, false);
    }

}
