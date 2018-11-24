import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import {SnapService} from "./snap.service";

@Resolver('ServiceInfo')
export class SnapResolvers {

    constructor(private readonly snapService: SnapService) {}

    @Query()
    async getServiceInfo() {
        return await this.snapService.getServices();
    }

}