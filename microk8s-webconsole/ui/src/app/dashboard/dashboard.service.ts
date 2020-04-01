import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';

import {catchError, map, mergeMap, toArray} from 'rxjs/operators';
import {ApiService} from '../core/api.service';
import {HttpResponse} from '@angular/common/http';
import {Addon, AddonStatus, ServiceInfo, Status} from '../core/models';

@Injectable()
export class DashboardService {

  constructor(private apiService: ApiService) {
  }

  getAddons(): Observable<Addon[]> {
    return this.apiService.post('status', {callback: 'xyztoken'})
      .pipe(map((r: HttpResponse<Status>) => r.body.addons));
  }

  getSnapInfo(): Observable<Object> {
    return this.apiService.post('services', {callback: 'xyztoken'})
      .pipe(
        mergeMap((r: HttpResponse<Object>) => from(Object.entries(r.body))),
        map((s: Array<[string, string]>) => new Object({
          name: s[0],
          mode: s[1].toString().split(',')[1].trim(),
          status: s[1].toString().split(',')[2].trim()
        })),
        toArray()
      );
  }

  getMicroK8sOverview(): Observable<string> {
    return this.apiService.post('overview', {callback: 'xyztoken'}, null, 'text')
      .pipe(
        map((r: HttpResponse<Object>) => r.body.toString())
      );
  }

  setAddonStatus(name: string, enabled: boolean): Observable<AddonStatus> {
    if (enabled) {
      return this.apiService.post('addon/enable', {callback: 'xyztoken', addon: name}, null, 'text')
        .pipe(
          map((r: HttpResponse<Object>) => Object({status: r.status, logs: r.body}))
        );
    } else {
      return this.apiService.post('addon/disable', {callback: 'xyztoken', addon: name}, null, 'text')
        .pipe(
          map((r: HttpResponse<Object>) => Object({status: r.status, logs: r.body}))
        );
    }
  }

  getMicroK8sStatus(): Observable<boolean> {
    return this.apiService.post('status', {callback: 'xyztoken'})
      .pipe(
        map((r: HttpResponse<Object>) => r.body['microk8s']['running']),
        catchError((e) => {
          console.log(e);
          return of(false);
        })
      );
  }

  setMicroK8sStatus(enabled: boolean): Observable<boolean> {
    if (enabled) {
      return this.apiService.post('start', {callback: 'xyztoken'}, null, 'text')
        .pipe(
          mergeMap(() => this.getMicroK8sStatus())
        );
    } else {
      return this.apiService.post('stop', {callback: 'xyztoken'}, null, 'text')
        .pipe(
          mergeMap(() => of(false))
        );
    }

  }

  restartService(service: ServiceInfo): Observable<ServiceInfo> {
    return this.apiService.post('service/restart', {callback: 'xyztoken', service: service.name})
      .pipe(
        map((r: HttpResponse<Object>) => Object({
          name: service.name,
          status: service.status = (r.status === 200) ? 'active' : 'inactive',
          mode: service.mode
        }) as ServiceInfo)
      );
  }

  setServiceMode(service: ServiceInfo, enabled: boolean): Observable<ServiceInfo> {
    if (enabled) {
      return this.apiService.post('service/enable', {callback: 'xyztoken', service: service.name})
        .pipe(
          map((r: HttpResponse<Object>) => Object({
            name: service.name,
            status: service.status,
            mode: service.mode = (r.status === 200) ? 'enabled' : 'disabled',
          }) as ServiceInfo)
        );
    } else {
      return this.apiService.post('service/disable', {callback: 'xyztoken', service: service.name})
        .pipe(
          map((r: HttpResponse<Object>) => Object({
            name: service.name,
            status: service.status,
            mode: service.mode = (r.status === 200) ? 'disabled' : 'enabled',
          }) as ServiceInfo)
        );
    }
  }

  setServiceStatus(service: ServiceInfo, enabled: boolean): Observable<ServiceInfo> {
    if (enabled) {
      return this.apiService.post('service/start', {callback: 'xyztoken', service: service.name})
        .pipe(
          map((r: HttpResponse<Object>) => Object({
            name: service.name,
            status: service.status = (r.status === 200) ? 'active' : 'inactive',
            mode: service.mode
          }) as ServiceInfo)
        );
    } else {
      return this.apiService.post('service/stop', {callback: 'xyztoken', service: service.name})
        .pipe(
          map((r: HttpResponse<Object>) => Object({
            name: service.name,
            status: service.status = (r.status === 200) ? 'inactive' : 'active',
            mode: service.mode
          }) as ServiceInfo)
        );
    }
  }
}


