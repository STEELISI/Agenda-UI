import { State } from './State';

export interface Transition {
  id: number;
  from: State;
  to: State;
}
