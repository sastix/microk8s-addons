import { Power } from '@common/graphql.schema';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PowerService } from './power.service';

@Resolver('Power')
export class PowerResolvers {

  constructor(private readonly powerService: PowerService) {}

  @Query()
  async getPower(): Promise<Power> {
    return await this.powerService.getState();
  }

  @Mutation('setPower')
  async setAddonStatus(@Args('enabled') enabled: boolean): Promise<Power> {
    if (enabled){
      return this.powerService.on();
    }
    return this.powerService.off();
  }
}