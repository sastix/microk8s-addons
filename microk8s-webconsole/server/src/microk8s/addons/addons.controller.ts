import { Controller, Get } from '@nestjs/common';
import { Addon } from '../../../../common/models/addon.interface';
import { AddonsService } from './addons.service';

@Controller('addons')
export class AddonsController {
  constructor(private readonly addonsService: AddonsService) {}

  @Get()
  async findAll(): Promise<Addon[]> {
    return this.addonsService.getAll();
  }
}
