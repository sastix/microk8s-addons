import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import {Addon, IMutation, IQuery, ServiceInfo} from '@common/graphql.schema';
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

  getSnapInfo(): Observable<() => ServiceInfo[] | Promise<ServiceInfo[]>> {
    return this.apollo.watchQuery<IQuery>(
      {
        query: GetServiceInfo
      }
    ).valueChanges.pipe(
      map(result => result.data.getServiceInfo)
    );
  }

  setAddonStatus(name: string, enabled: boolean): Observable<Addon> {
    return this.apollo.mutate<IMutation>({
      mutation: SetAddonStatus,
      variables: {
        name: name,
        enabled: enabled
      }
    }).pipe(
      map(result => {
        return result.data.setAddonStatus;
      })
    );
  }
}
