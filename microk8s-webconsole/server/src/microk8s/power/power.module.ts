import { Module } from '@nestjs/common';
import { PowerService } from './power.service';
import {ShellService} from '../../core/services/shell/shell.service';

@Module({
  providers: [PowerService, ShellService],
  controllers: [],
})
export class PowerModule {}
