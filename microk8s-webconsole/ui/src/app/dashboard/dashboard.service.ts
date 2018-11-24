import { Injectable } from '@angular/core';
import {ApiService} from '../core/api.service';
import {Observable} from 'rxjs';
import {Addon} from '@common/models/addon.interface';
import {ServiceInfo} from '@common/models/service-info.interface.';

@Injectable()
export class DashboardService {

  GET_ADDONS: string = 'addons';
  GET_SNAP_INFO: string = 'snap/info';

  constructor(private api: ApiService) { }

  getAddons(): Observable<Addon[]> {
    return this.api.get(this.GET_ADDONS);
  }

  getSnapInfo(): Observable<ServiceInfo[]> {
    return this.api.get(this.GET_SNAP_INFO);
  }
}
