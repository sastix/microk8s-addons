import {Action} from '@ngrx/store';
import {ServiceInfo} from '../../core/models';

export enum ActionTypes {
  GET_SERVICES_REQUEST = '[Service] Get services request',
  GET_SERVICES_FAILURE = '[Service] Get services failure',
  GET_SERVICES_SUCCESS = '[Service] Get services success',
  RESTART_SERVICE_REQUEST = '[Service] Restart service request',
  RESTART_SERVICE_FAILURE = '[Service] Restart service failure',
  RESTART_SERVICE_SUCCESS = '[Service] Restart service success'
}

export class GetServicesRequestAction implements Action {
  readonly type = ActionTypes.GET_SERVICES_REQUEST;
}

export class GetServicesFailureAction implements Action {
  readonly type = ActionTypes.GET_SERVICES_FAILURE;
  constructor(public payload: {error: string}) {}
}

export class GetServicesSuccessAction implements Action {
  readonly type = ActionTypes.GET_SERVICES_SUCCESS;
  constructor(public payload: ServiceInfo[]) {
  }
}

export class RestartServiceRequestAction implements Action {
  readonly type = ActionTypes.RESTART_SERVICE_REQUEST;
  constructor(public payload: ServiceInfo) {
  }
}

export class RestartServiceFailureAction implements Action {
  readonly type = ActionTypes.RESTART_SERVICE_FAILURE;
  constructor(public payload: {error: string}) {
  }
}

export class RestartServiceSuccessAction implements Action {
  readonly type = ActionTypes.RESTART_SERVICE_SUCCESS;
}

export type Actions = GetServicesRequestAction | GetServicesFailureAction | GetServicesSuccessAction
  | RestartServiceRequestAction | RestartServiceFailureAction | RestartServiceSuccessAction;
