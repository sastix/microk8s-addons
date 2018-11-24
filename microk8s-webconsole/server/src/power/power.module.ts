import { Module } from '@nestjs/common';
import { PowerService } from './power.service';
import { PowerController } from './power.controller';

@Module({
  providers: [PowerService],
  controllers: [PowerController],
})
export class PowerModule {}
