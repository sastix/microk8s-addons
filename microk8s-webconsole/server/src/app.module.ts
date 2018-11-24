import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddonsModule } from './addons/addons.module';
import { SnapController } from '../src/snap/snap.controller';
import { SnapService } from '../src/snap/snap.service';
import {ShellService} from "./core/services/shell/shell.service";

@Module({
  imports: [AddonsModule],
  controllers: [AppController, SnapController],
  providers: [AppService, SnapService, ShellService],
})
export class AppModule {}
