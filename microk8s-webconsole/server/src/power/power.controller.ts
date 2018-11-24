import { Controller, Get, Post, Res, Body } from '@nestjs/common';
import { Power } from '../../../common/models/power.interface';
import { PowerService } from './power.service';

@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Get()
  async getState(): Promise<Power> {
    return this.powerService.getState();
  }

  @Post()
  async set(@Body() data: Power): Promise<Power> {
    if (data['running']) {
        return this.powerService.on();
    } else {
        return this.powerService.off();
    }
  }
}
