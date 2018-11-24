import { Injectable } from '@angular/core';
import {ApiService} from "../../core/api.service";
import {Observable} from "rxjs";
import {Addon} from "@common/models/addon.interface";

@Injectable()
export class AddOnsService {

  GET_ADDONS: string = 'addons';

  constructor(private api: ApiService) { }

  getAddons(): Observable<Addon[]> {
    return this.api.get(this.GET_ADDONS);
  }
}
