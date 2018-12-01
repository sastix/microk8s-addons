import { Module } from '@nestjs/common';
import { SnapService } from './snap.service';
import { SnapResolvers } from './snap.resolvers';
import { ShellService } from '../core/services/shell/shell.service';
import { ShellCommands } from '../core/services/shell/shell-commands';

@Module({
  providers: [SnapService, ShellService, SnapResolvers, ShellCommands],
  controllers: [],
})
export class SnapModule {}
