import { Module } from '@nestjs/common';
import { AddonsModule } from './addons/addons.module';

@Module({
  imports: [AddonsModule],
  exports: [AddonsModule],
})
export class Microk8sModule {}
