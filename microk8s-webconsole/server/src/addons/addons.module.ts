import { Module } from '@nestjs/common';
import { AddonsService } from './addons.service';
import { AddonsController } from './addons.controller';
import {ShellService} from "../core/services/shell/shell.service";

@Module({
  providers: [AddonsService, ShellService],
  controllers: [AddonsController],
})
export class AddonsModule {}
