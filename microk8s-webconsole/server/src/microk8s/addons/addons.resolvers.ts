import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { AddonsService } from './addons.service';
import { Addon } from '@common/graphql.schema';

@Resolver('Addons')
export class AddonsReslovers {

  constructor(private readonly addonsService: AddonsService) {}

  @Query()
  async getAddons(): Promise<Addon[]> {
    return await this.addonsService.getAll();
  }

  @Mutation('setAddonStatus')
  async setAddonStatus(@Args('name') name: string, @Args('enabled') enabled: boolean): Promise<Addon>{
    await this.addonsService.setAddonStatus(name, enabled);
    const updated: Addon = { name: '', enabled: false};
    updated.name = name;
    updated.enabled = enabled;
    return updated;
  }
}