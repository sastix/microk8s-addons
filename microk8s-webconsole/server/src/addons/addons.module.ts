import { Module } from '@nestjs/common';
import { AddonsService } from './addons.service';
import { AddonsController } from './addons.controller';

@Module({
  providers: [AddonsService],
  controllers: [AddonsController],
})
export class AddonsModule {}
