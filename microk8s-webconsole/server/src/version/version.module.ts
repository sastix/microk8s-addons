import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import {VersionController} from "./version.controller";
import {ShellService} from "../core/services/shell/shell.service";

@Module({
    providers: [VersionService, ShellService],
    controllers: [VersionController]
})
export class VersionModule {}
