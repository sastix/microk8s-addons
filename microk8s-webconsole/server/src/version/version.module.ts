import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import {VersionController} from "./version.controller";
import {ShellService} from "../core/services/shell/shell.service";
import {ShellCommands} from "../core/services/shell/shell-commands";

@Module({
    providers: [VersionService, ShellService, ShellCommands],
    controllers: [VersionController]
})
export class VersionModule {}
