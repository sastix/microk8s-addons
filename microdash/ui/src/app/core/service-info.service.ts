import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {from, Observable} from 'rxjs';
import {ServiceInfo} from './models';
import {map, mergeMap, toArray} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceInfoService {

  constructor(private api: ApiService) {
  }

  getServices(): Observable<ServiceInfo[]> {
    return this.api.post('services', { })
      .pipe(
        mergeMap((r: HttpResponse<Object>) => from(Object.entries(r.body['services']))),
        map((s) => new Object({
          name: s[1],
          // mode: s[1].toString().split(',')[1].trim(),
          // status: s[1].toString().split(',')[2].trim()
        }) as ServiceInfo),
        toArray()
      );
  }

  restartService(service: ServiceInfo): Observable<ServiceInfo> {
    return this.api.post('configure', {'service': [{'name': service.name, 'restart': true}]})
      .pipe(
        map((r: HttpResponse<Object>) => {
          console.log(r);
          return Object({
            name: service.name//,
            // status: service.status = (r.status === 200) ? 'active' : 'inactive',
            // mode: service.mode
          }) as ServiceInfo;
        })

      );
  }
}
