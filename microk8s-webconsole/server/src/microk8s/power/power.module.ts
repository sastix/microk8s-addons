import { Module } from '@nestjs/common';
import { PowerService } from './power.service';
import { PowerController } from './power.controller';
import {ShellService} from '../../core/services/shell/shell.service';

@Module({
  providers: [PowerService, ShellService],
  controllers: [PowerController],
})
export class PowerModule {}
