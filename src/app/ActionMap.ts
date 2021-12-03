import { State } from './State';
import { Action } from './Action';

export interface ActionMap {
  state: State;
  actions: Action[];
}
