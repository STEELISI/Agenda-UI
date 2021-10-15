import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { State } from '../../State';
import { STATES } from '../../mock-states';
import { Transition } from '../../Transition';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transitions',
  templateUrl: './transitions.component.html',
  styleUrls: ['./transitions.component.css']
})
export class TransitionsComponent implements OnInit {
  states: State[] = STATES;

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

  from: string = "---";
  to: string = "---";
  trigger: string = '';
  description: string = '';
  
  faTimesCircle = faTimesCircle;

  constructor() { }

  ngOnInit(): void {
  }

  updateFromState(transition: Transition) {
    const index = this.states.findIndex((st) => st.name == this.from);
   
    transition.from = this.states[index]
    this.updateTransitionEvent.emit(transition);
  }

  updateToState(transition: Transition) {
    const index = this.states.findIndex((st) => st.name == this.to);
    
    transition.to = this.states[index]
    this.updateTransitionEvent.emit(transition);
  }

  updateTrigger(transition: Transition) {
    transition.trigger = this.trigger;
    this.updateTransitionEvent.emit(transition);
  }

  updateDescription(transition: Transition) {
    transition.description = this.description;
    this.updateTransitionEvent.emit(transition);
  }

  deleteTransition(transition: Transition) {
    this.deleteTransitionEvent.emit(transition);
  }
}
