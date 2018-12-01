import { Module } from '@nestjs/common';
import { PowerService } from './power.service';
import { PowerResolvers } from './power.resolvers';

@Module({
  providers: [PowerService, PowerResolvers],
  controllers: [],
})
export class PowerModule {}
