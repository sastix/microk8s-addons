import { Module } from '@nestjs/common';
import { AddonsModule } from './addons/addons.module';
import { PowerModule } from './power/power.module';

@Module({
  imports: [AddonsModule, PowerModule],
  exports: [AddonsModule, PowerModule],
})
export class Microk8sModule {}
