import { Module } from '@nestjs/common';
import { PowerService } from './power.service';
import { PowerResolvers } from './power.resolvers';
import { ShellCommands } from '../../core/services/shell/shell-commands';

@Module({
  providers: [PowerService, PowerResolvers, ShellCommands],
  controllers: [],
})
export class PowerModule {}
