import { State } from './State';

export interface Transition {
  from: State;
  to: State;
}
