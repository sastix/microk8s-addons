import { Module } from '@nestjs/common';
import { AddonsService } from './addons.service';
import { AddonsResolvers } from './addons.resolvers';

@Module({
  providers: [AddonsService, AddonsResolvers],
  controllers: [],
})
export class AddonsModule {}
