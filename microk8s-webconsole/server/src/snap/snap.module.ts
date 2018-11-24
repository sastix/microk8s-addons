import { Module } from '@nestjs/common';
import { SnapService } from './snap.service';
import { SnapController } from './snap.controller';
import {ShellService} from "../core/services/shell/shell.service";
import {SnapResolvers} from "./snap.resolvers";

@Module({
  providers: [SnapService, ShellService, SnapResolvers],
  controllers: [SnapController],
})
export class SnapModule {}
