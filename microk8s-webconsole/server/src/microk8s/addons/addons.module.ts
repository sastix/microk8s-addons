import { Module } from '@nestjs/common';
import { AddonsService } from './addons.service';
import { AddonsReslovers } from './addons.resolvers';

@Module({
  providers: [AddonsService, AddonsReslovers],
  controllers: [],
})
export class AddonsModule {}
