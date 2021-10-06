import { Component, OnInit } from '@angular/core';

import { State } from '../../State';
import { Transition } from '../../Transition';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css']
})
export class LeftComponent implements OnInit {
  states: State[] = [];
  transitions: Transition[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onNewStateClick(): void {
    this.states.push({  id: this.states.length,
                        text: ''  });
  }

  onAddState($event: State): void {
    this.states[$event.id].text = $event.text;

    /* console.log(this.states); */
  }

  onDeleteState($event: State): void {
    this.states = this.states.filter((st) => st.id != $event.id)
    
    console.log(this.states);
  }

  onNewTransitionClick(): void {
    this.transitions.push({   from: { id: -1, text: ''  },
                              to:   { id: -2, text: ''  }});
  }
}
