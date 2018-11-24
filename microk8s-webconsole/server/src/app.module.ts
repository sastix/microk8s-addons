import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddonsModule } from './addons/addons.module';
import { SnapController } from '../src/snap/snap.controller';
import { SnapService } from '../src/snap/snap.service';
import {ShellService} from "./core/services/shell/shell.service";
import { PowerController } from './power/power.controller';
import { PowerService } from './power/power.service';
import { PowerModule } from './power/power.module';

@Module({
  imports: [AddonsModule, PowerModule],
  controllers: [AppController, PowerController, SnapController],
  providers: [AppService, PowerService, SnapService, ShellService],
})
export class AppModule {}
