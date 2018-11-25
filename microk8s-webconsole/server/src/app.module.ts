import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { join } from 'path';
import { CoreModule } from './core/core.module';
import { Microk8sModule } from './microk8s/microk8s.module';
import { SnapModule } from './snap/snap.module';

@Module({
  imports: [
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
  providers: [AppService],
})
export class AppModule {}
