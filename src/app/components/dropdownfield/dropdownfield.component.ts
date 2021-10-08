import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { State } from '../../State';
import { STATES } from '../../mock-states';
import { Transition } from '../../Transition';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dropdownfield',
  templateUrl: './dropdownfield.component.html',
  styleUrls: ['./dropdownfield.component.css']
})
export class DropdownfieldComponent implements OnInit {
  states: State[] = STATES;

  @Input() transition: Transition = { id: "id", 
                                      from: { id: "from", text: '---' },
                                      to:   { id: "to", text: '---' }  }
  @Output() updateTransitionEvent: EventEmitter<Transition> = new EventEmitter();
  @Output() deleteTransitionEvent: EventEmitter<Transition> = new EventEmitter();

  from: string = "---";
  to: string = "---";
  
  faTimesCircle = faTimesCircle;

  constructor() { }

  ngOnInit(): void {
  }

  updateFromState(transition: Transition) {
    const index = this.states.findIndex((st) => st.text == this.from);
    
    transition.from.id = this.states[index].id;
    transition.from.text = this.from;

    this.updateTransitionEvent.emit(transition);
  }

  updateToState(transition: Transition) {
    const index = this.states.findIndex((st) => st.text == this.to);

    transition.to.id = this.states[index].id;
    transition.to.text = this.to;
    
    this.updateTransitionEvent.emit(transition);
  }

  deleteTransition(transition: Transition) {
    this.deleteTransitionEvent.emit(transition);
  }
}
