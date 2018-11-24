import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Addon} from '@common/models/addon.interface';
import {ServiceInfo} from '@common/models/service-info.interface.';
import {Apollo} from 'apollo-angular';
import {IQuery} from '@common/graphql.schema';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';

@Injectable()
export class DashboardService {

  constructor(private apollo: Apollo) {
  }

  getAddons(): Observable<() => Addon[] | Promise<Addon[]>> {
    return this.apollo.watchQuery<IQuery>(
      {
        query: gql`
          query {
            getAddons {
              name
              enabled
            }
          }
        `
      }
    ).valueChanges.pipe(
      map(result => result.data.getAddons)
    );
  }

  getSnapInfo(): Observable<() => ServiceInfo[] | Promise<ServiceInfo[]>> {
    // return this.apollo.watchQuery<IQuery>(
    //   {
    //     query: gql`
    //       query {
    //         getServiceInfo {
    //           name
    //           mode
    //           status
    //         }
    //       }
    //     `
    //   }
    // ).valueChanges.pipe(
    //   map(result => result.data.temp__)
    // );
    return null;
  }
}
