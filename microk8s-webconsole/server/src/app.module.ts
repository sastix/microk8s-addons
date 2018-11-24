import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddonsModule } from './addons/addons.module';
import { SnapController } from './snap/snap.controller';
import { SnapService } from './snap/snap.service';
import { ShellService } from './core/services/shell/shell.service';
import { join } from 'path';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    AddonsModule,
    CoreModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql', '../common/types/**/*.graphql'],
      definitions: {
        path: join(process.cwd(), '../common/graphql.schema.ts'),
        outputAs: 'class',
      },
    }),
  ],
  controllers: [AppController, SnapController],
  providers: [AppService, SnapService, ShellService],
})
export class AppModule {}
