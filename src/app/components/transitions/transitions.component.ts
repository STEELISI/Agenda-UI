import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { State } from '../../State';
import { Transition } from '../../Transition';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transitions',
  templateUrl: './transitions.component.html',
  styleUrls: ['./transitions.component.css']
})
export class TransitionsComponent implements OnInit {
  @Input() states: State[] = [];

  @Input() transition: Transition = { id: "id", 
                                      from: { id: "from", 
                                              name: '---',
                                              description: '',
                                              start: false,
                                              terminus: false
                                      },
                                      to:   { id: "to", 
                                              name: '---',
                                              description: '',
                                              start: false,
                                              terminus: false
                                      },
                                      trigger: '',
                                      description: ''
  }
  @Output() updateTransitionEvent: EventEmitter<Transition> = new EventEmitter();
  @Output() deleteTransitionEvent: EventEmitter<Transition> = new EventEmitter();

  @Input() showTransition: boolean = false;
  faTimesCircle = faTimesCircle;

  constructor() { }

  ngOnInit(): void {
  }

  isKickOff(from: State): boolean {
    if (from.id == "kickoff")
      return true;
    else
      return false;
  }

  getStart(): State[] {
    return this.states.filter((st) => st.start == true);
  }

  getNonTerminus(): State[] {
    return this.states.filter((st) => st.terminus != true);
  }

  updateFromState(transition: Transition) {
    this.updateTransitionEvent.emit(transition);
  }

  updateToState(transition: Transition) {
    this.updateTransitionEvent.emit(transition);
  }

  updateTrigger(transition: Transition) {
    this.updateTransitionEvent.emit(transition);
  }

  updateDescription(transition: Transition) {
    this.updateTransitionEvent.emit(transition);
  }

  deleteTransition(transition: Transition) {
    this.deleteTransitionEvent.emit(transition);
  }
}
