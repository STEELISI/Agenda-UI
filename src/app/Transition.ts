import { State } from './State';

export interface Transition {
  id: string;
  from: State;
  to: State;
  trigger: string;
  description: string;
}
