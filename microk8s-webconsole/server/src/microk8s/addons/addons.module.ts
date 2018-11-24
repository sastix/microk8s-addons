import { Module } from '@nestjs/common';
import { AddonsService } from './addons.service';
import { AddonsController } from './addons.controller';
import { AddonsReslovers } from './addons.resolvers';

@Module({
  providers: [AddonsService, AddonsReslovers],
  controllers: [AddonsController],
})
export class AddonsModule {}
