import { Component, OnInit } from '@angular/core';

import { State } from '../../State';
import { Transition } from '../../Transition';
import { STATES } from '../../mock-states';
import { TRANSITIONS } from '../../mock-transitions';

import { GraphService } from '../../services/graph.service';

function generateID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css']
})
export class LeftComponent implements OnInit {
  states: State[] = STATES;
  transitions: Transition[] = TRANSITIONS;

  constructor(private graphService: GraphService) { }

  ngOnInit(): void {
  }

  onAddState(): void {
    this.states.push({  id: generateID(),
                        text: ''  });
  }

  onUpdateState($event: State): void {
    const index = this.states.findIndex((st) => st.id == $event.id);

    this.states[index] = $event;
    this.graphService.setNodes(this.states);
  }

  onDeleteState($event: State): void {
    const index = this.states.findIndex((st) => st.id == $event.id);

    if (this.states.length > 1) 
      this.states.splice(index, 1);
    else 
      this.states.splice(index);
    
    this.graphService.setNodes(this.states);
    console.log(STATES);
  }

  onAddTransition(): void {
    this.transitions.push({   id: generateID(),
                              from: { id: "from", text: '---'  },
                              to:   { id: "to", text: '---'  }});
  }

  onUpdateTransition($event: Transition): void {
    const index = this.transitions.findIndex((ts) => ts.id == $event.id);

    this.transitions[index] = $event; 
    this.graphService.setEdges(this.transitions);
  }

  onDeleteTransition($event: Transition): void {
    const index = this.transitions.findIndex((ts) => ts.id == $event.id);

    if (this.transitions.length > 1) 
      this.transitions.splice(index, 1);
    else 
      this.transitions.splice(index);
    
    this.graphService.setEdges(this.transitions);
    console.log(TRANSITIONS);
  }

}
