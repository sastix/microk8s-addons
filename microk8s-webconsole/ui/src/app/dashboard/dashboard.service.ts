import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Addon} from '@common/models/addon.interface';
import {ServiceInfo} from '@common/models/service-info.interface.';
import {Apollo} from 'apollo-angular';
import {IQuery} from '@common/graphql.schema';
import {map} from 'rxjs/operators';
import {GetAddOns, GetServiceInfo, SetAddonStatus} from './dashboard.gql';

@Injectable()
export class DashboardService {

  constructor(private apollo: Apollo) {
  }

  getAddons(): Observable<() => Addon[] | Promise<Addon[]>> {
    return this.apollo.watchQuery<IQuery>(
      {
        query: GetAddOns
      }
    ).valueChanges.pipe(
      map(result => result.data.getAddons)
    );
  }

  setAddonStatus(name: string, enabled: boolean): Observable<() => Addon | Promise<Addon>> {
    return this.apollo.mutate({
      mutation: SetAddonStatus,
      variables: {
        name: name,
        enabled: enabled
      }
    });
  }

  getSnapInfo(): Observable<() => ServiceInfo[] | Promise<ServiceInfo[]>> {
    return this.apollo.watchQuery<IQuery>(
      {
        query: GetServiceInfo
      }
    ).valueChanges.pipe(
      map(result => result.data.getServiceInfo)
    );
  }
}
