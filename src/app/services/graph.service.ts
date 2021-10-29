import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { State } from '../State';
import { Transition } from '../Transition';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private stateSubject: BehaviorSubject<State[]> = new BehaviorSubject(<State[]>[]);
  private transitionSubject: BehaviorSubject<Transition[]> = new BehaviorSubject(<Transition[]>[]);

  constructor() { }

  setStates(states: State[]): void {
    this.stateSubject.next(states);
  }

  getStates(): Observable<State[]> {
    return this.stateSubject.asObservable();
  }

  setTransitions(transitions: Transition[]): void {
    this.transitionSubject.next(transitions);
  }

  getTransitions(): Observable<Transition[]> {
    return this.transitionSubject.asObservable();
  }
}
