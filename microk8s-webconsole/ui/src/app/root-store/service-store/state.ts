import {ServiceInfo} from '../../core/models';

export interface State {
  services: ServiceInfo[] | null;
  error: string;
}

export const initialState: State = {
  services: null,
  error: null
};
