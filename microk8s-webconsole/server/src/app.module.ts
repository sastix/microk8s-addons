import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddonsModule } from './addons/addons.module';

@Module({
  imports: [AddonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
