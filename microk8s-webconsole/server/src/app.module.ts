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
import { VersionController } from './version/version.controller';
import { VersionModule } from './version/version.module';
import {VersionService} from "./version/version.service";

@Module({
  imports: [AddonsModule, PowerModule, VersionModule],
  controllers: [AppController, PowerController, SnapController, VersionController],
  providers: [AppService, PowerService, SnapService, ShellService, VersionService],
})
export class AppModule {}
