import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import {Addon, IMutation, IQuery, MicroK8sOverview, Power, ServiceInfo} from '@common/graphql.schema';
import {map, share} from 'rxjs/operators';
import {
  GetAddOns, GetMicroK8sOverview,
  GetMicroK8sPower,
  GetServiceInfo,
  RestartService,
  SetAddonStatus,
  SetMicroK8sPower, SetServiceMode, SetServiceStatus
} from './dashboard.gql';

@Injectable()
export class DashboardService {

  constructor(private apollo: Apollo) {
  }

  getAddons(): Observable<() => Addon[] | Promise<Addon[]>> {
    return this.apollo.watchQuery<IQuery>(
      {
        query: GetAddOns
      }
    ).valueChanges
      .pipe(
        map(({data}) => data.getAddons)
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

  getMicroK8sOverview(): Observable<() => MicroK8sOverview | Promise<MicroK8sOverview>> {
    return this.apollo.watchQuery<IQuery>(
      {
        query: GetMicroK8sOverview
      }
    ).valueChanges.pipe(
      map(result => result.data.getMicroK8sOverview)
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

  getMicroK8sStatus(): Observable<() => Power | Promise<Power>> {
    return this.apollo.watchQuery<IQuery>(
      {
        query: GetMicroK8sPower
      }
    ).valueChanges
      .pipe(
        share(),
        map(result => result.data.getPower)
      );
  }

  setMicroK8sStatus(enabled: boolean): Observable<() => Power | Promise<Power>> {
    return this.apollo.mutate<IMutation>({
      mutation: SetMicroK8sPower,
      variables: {
        enabled: enabled
      }
    }).pipe(
      share(),
      map(result => result.data.setPower)
    );
  }

  restartService(serviceName: string): Observable<ServiceInfo> {
    return this.apollo.mutate<IMutation>(
      {
        mutation: RestartService,
        variables: {
          name: serviceName
        }
      }
    ).pipe(
      map(result => result.data.restartService)
    );
  }

  setServiceMode(serviceName: string, enabled: boolean): Observable<ServiceInfo> {
    return this.apollo.mutate<IMutation>(
      {
        mutation: SetServiceMode,
        variables: {
          name: serviceName,
          enabled: enabled
        }
      }
    ).pipe(
      map(result => result.data.setServiceMode)
    );
  }

  setServiceStatus(serviceName: string, enabled: boolean): Observable<ServiceInfo> {
    return this.apollo.mutate<IMutation>(
      {
        mutation: SetServiceStatus,
        variables: {
          name: serviceName,
          enabled: enabled
        }
      }
    ).pipe(
      map(result => result.data.setServiceStatus)
    );
  }
}


