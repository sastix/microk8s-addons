import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SnapService } from './snap.service';
import { ServiceInfo } from '@common/graphql.schema';

@Resolver('ServiceInfo')
export class SnapResolvers {

    constructor(private readonly snapService: SnapService) {}

    @Query()
    async getServiceInfo(): Promise<ServiceInfo[]> {
        return await this.snapService.getServices();
    }

    @Mutation('setServiceStatus')
    async setServiceStatus(@Args('name') name: string, @Args('enabled') enabled: boolean): Promise<ServiceInfo>{
        return await this.snapService.setServiceStatus(name, enabled);
    }

    @Mutation('setServiceMode')
    async setServiceMode(@Args('name') name: string, @Args('enabled') enabled: boolean): Promise<ServiceInfo>{
        return await this.snapService.setServiceMode(name, enabled);
    }

    @Mutation('restartService')
    async restartService(@Args('name') name: string): Promise<ServiceInfo> {
        return await this.snapService.restartService(name);
    }
}