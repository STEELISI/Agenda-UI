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

  @Input() transition: Transition = { id: -1, 
                                      from: { id: 1, text: '---' },
                                      to:   { id: 2, text: '---' }  }
  @Output() updateTransitionEvent: EventEmitter<Transition> = new EventEmitter();
  @Output() deleteTransitionEvent: EventEmitter<Transition> = new EventEmitter();

  from: string = "---";
  to: string = "---";
  
  faTimesCircle = faTimesCircle;

  constructor() { }

  ngOnInit(): void {
  }

  updateFromState(transition: Transition) {
    transition.from.text = this.from;
    this.updateTransitionEvent.emit(transition);
  }

  updateToState(transition: Transition) {
    transition.to.text = this.to;
    this.updateTransitionEvent.emit(transition);
  }

  deleteTransition(transition: Transition) {
    this.deleteTransitionEvent.emit(transition);
  }
}
