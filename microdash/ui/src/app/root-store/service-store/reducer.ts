import {initialState, State} from './state';
import {Actions, ActionTypes} from './actions';

export function serviceReducer(state: State = initialState, action: Actions) {
  switch (action.type) {
    case ActionTypes.RESTART_SERVICE_FAILURE:
    case ActionTypes.GET_SERVICES_FAILURE:
      return {
        ...state,
        error: action.payload['error']
      };
    case ActionTypes.RESTART_SERVICE_REQUEST:
    case ActionTypes.GET_SERVICES_REQUEST:
      return {
        ...state,
        error: null
      };
    case ActionTypes.GET_SERVICES_SUCCESS:
      return {
        ...state,
        services: action.payload,
        error: null
      };
    case ActionTypes.RESTART_SERVICE_SUCCESS:
    default:
      return state;
  }
}
