import { Module } from '@nestjs/common';
import { SnapService } from './snap.service';
import { SnapController } from './snap.controller';

@Module({
  providers: [SnapService],
  controllers: [SnapController],
})
export class SnapModule {}
