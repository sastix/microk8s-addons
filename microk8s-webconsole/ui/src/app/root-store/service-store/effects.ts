import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import * as servicesActions from './actions';
import {ServiceInfoService} from '../../core/service-info.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ServiceInfo} from '../../core/models';

@Injectable()
export class ServiceStoreEffects {
  constructor(private servicesInfo: ServiceInfoService, private actions$: Actions) {
  }

  @Effect()
  getServicesEffect$: Observable<Action> = this.actions$.pipe(
    ofType(
      servicesActions.ActionTypes.GET_SERVICES_REQUEST,
      servicesActions.ActionTypes.RESTART_SERVICE_SUCCESS,
      servicesActions.ActionTypes.RESTART_SERVICE_FAILURE
    ),
    switchMap(action => this.servicesInfo.getServices()),
    map((services: ServiceInfo[]) => new servicesActions.GetServicesSuccessAction(services)),
    catchError(error => of(new servicesActions.GetServicesFailureAction({error})))
  );

  @Effect()
  restartServiceEffect$: Observable<Action> = this.actions$.pipe(
    ofType<servicesActions.RestartServiceRequestAction>(servicesActions.ActionTypes.RESTART_SERVICE_REQUEST),
    switchMap(action => this.servicesInfo.restartService(action.payload)),
    map((service: ServiceInfo) => new servicesActions.RestartServiceSuccessAction()),
    catchError(error => of(new servicesActions.RestartServiceFailureAction({error})))
  );
}
