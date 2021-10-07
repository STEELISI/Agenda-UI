import { Component, OnInit } from '@angular/core';

import { State } from '../../State';
import { Transition } from '../../Transition';
import { STATES } from '../../mock-states';
import { TRANSITIONS } from '../../mock-transitions';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css']
})
export class LeftComponent implements OnInit {
  states: State[] = STATES;
  transitions: Transition[] = TRANSITIONS;

  stateID = 0;
  transitionID = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onAddState(): void {
    this.states.push({  id: this.stateID,
                        text: ''  });
    this.stateID += 1;
  }

  onUpdateState($event: State): void {
    const index = this.states.findIndex((st) => st.id == $event.id);

    this.states[index] = $event;
  }

  onDeleteState($event: State): void {
    const index = this.states.findIndex((st) => st.id == $event.id);

    if (this.states.length > 1) 
      this.states.splice(index, 1);
    else 
      this.states.splice(index);
    
    console.log(STATES);
  }

  onAddTransition(): void {
    this.transitions.push({   id: this.transitionID,
                              from: { id: 1, text: '---'  },
                              to:   { id: 2, text: '---'  }});
    this.transitionID += 1;
  }

  onUpdateTransition($event: Transition): void {
    const index = this.transitions.findIndex((ts) => ts.id == $event.id);

    this.transitions[index] = $event; 
  }

  onDeleteTransition($event: Transition): void {
    const index = this.transitions.findIndex((ts) => ts.id == $event.id);

    if (this.transitions.length > 1) 
      this.transitions.splice(index, 1);
    else 
      this.transitions.splice(index);
    
    console.log(TRANSITIONS);
  }

}
