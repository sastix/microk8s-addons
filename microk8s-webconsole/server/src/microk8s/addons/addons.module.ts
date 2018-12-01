import { Module } from '@nestjs/common';
import { AddonsService } from './addons.service';
import { AddonsResolvers } from './addons.resolvers';
import { ShellCommands } from '../../core/services/shell/shell-commands';

@Module({
  providers: [AddonsService, AddonsResolvers, ShellCommands],
  controllers: [],
})
export class AddonsModule {}
