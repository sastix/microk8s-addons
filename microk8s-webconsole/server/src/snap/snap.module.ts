import { Module } from '@nestjs/common';
import { SnapService } from './snap.service';
import { SnapResolvers } from './snap.resolvers';
import { ShellService } from '../core/services/shell/shell.service';

@Module({
  providers: [SnapService, ShellService, SnapResolvers],
  controllers: [],
})
export class SnapModule {}
