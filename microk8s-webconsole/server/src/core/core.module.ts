import { Global, Module } from '@nestjs/common';
import { ShellService } from './services/shell/shell.service';

@Global()
@Module({
  providers: [ShellService],
  exports: [ShellService],

})
export class CoreModule {}