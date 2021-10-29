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
                        name: '',
                        description: '',
                        start: false,
                        terminus: false
    });
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

    /* remove all transitions from/to the deleted state */
    for (var i = this.transitions.length - 1; i >= 0; i--) {
      if (this.transitions[i].from.id == $event.id || this.transitions[i].to.id == $event.id) {
        if (this.transitions.length > 1 )
          this.transitions.splice(i, 1);
        else
          this.transitions.splice(i);
      }
    }

    console.log(STATES);
    console.log(TRANSITIONS);
  }

  onAddTransition(): void {
    this.transitions.push({   id: generateID(),
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
    });
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

  onDrawGraph(): void {
    /* === check whether inputs are wrong-format === */

    /* check if both states and transitions are empty */
    if (this.states.length == 0 && this.transitions.length == 0) {
      alert('No inputs. Please fill them out');
      return;
    }   
    
    /* check if there are duplicate names */
    const stateNameArray = this.states.map((st) => st.name);
    const stateNameSet = new Set(stateNameArray);
    if (stateNameArray.length != stateNameSet.size) {
      alert('Please remove duplicate names');
      return;
    }

    /* check if (state) names are empty */
    if (this.states.findIndex((st) => st.name.trim().length == 0) != -1) {
      alert('States have no name. Please fill them out');
      return;
    }

    /* check if (transition) names are empty */
    if (this.transitions.findIndex((ts) => ts.from.name == '---' || ts.to.name == '---') != -1) {
      alert('Transitions are not completed. Please fill them out');
      return;
    }

    this.onRefreshGraph();
  }

  onRefreshGraph(): void {
    /* check if both states and transitions are empty */
    if (this.states.length == 0 && this.transitions.length == 0) {
      return;
    }   
    /* check if (state) names are empty */
    if (this.states.findIndex((st) => st.name.trim().length == 0) != -1) {
      return;
    }
    /* check if (transition) names are empty */
    if (this.transitions.findIndex((ts) => ts.from.name == '---' || ts.to.name == '---') != -1) {
      return;
    }
    this.graphService.setStates(this.states);
    this.graphService.setTransitions(this.transitions);
  }

}
