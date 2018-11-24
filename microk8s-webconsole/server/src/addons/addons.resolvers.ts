import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { AddonsService } from './addons.service';

@Resolver('Addon')
export class AddonsReslovers {

  constructor(private readonly addonsService: AddonsService) {}

  @Query()
  async getAddons() {
    return await this.addonsService.getAll();
  }
}