import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { join } from 'path';
import { CoreModule } from './core/core.module';
import { Microk8sModule } from './microk8s/microk8s.module';
import { SnapModule } from './snap/snap.module';
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
  imports: [
      AddonsModule,
      PowerModule,
      VersionModule,
    Microk8sModule,
    CoreModule,
    SnapModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), '../common/graphql.schema.ts'),
        outputAs: 'interface',
      },
    }),
  ],
  controllers: [],
  controllers: [AppController, PowerController, SnapController, VersionController],
  providers: [AppService, PowerService, SnapService, ShellService, VersionService],
})
export class AppModule {}
