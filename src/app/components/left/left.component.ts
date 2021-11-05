import { Component, OnInit } from '@angular/core';

import * as yaml from 'js-yaml';

import { Agenda } from '../../Agenda';
import { State } from '../../State';
import { Transition } from '../../Transition';

import { GraphService } from '../../services/graph.service';

function generateID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function extractAgenda(agenda: Agenda) {
  let states: State[] = [];
  let transitions: Transition[] = [];

  /* STATE Filling */
  agenda.states.forEach((st) => {
    states.push({
      id: generateID(), 
      name: st.name, 
      description: st.description,
      start: false,
      terminus: false
    });
  });

  agenda.terminus_names.forEach((name) => {
    let index = states.findIndex((st) => st.name == name);
    states[index].terminus = true;
  });

  let index = states.findIndex((st) => st.name == agenda.start_state_name);
  states[index].start = true;

  /* TRANSITION Filling */
  for (var from_name of Object.keys(agenda.transitions)) {
    for (var trigger of Object.keys(agenda.transitions[from_name])){
      /*console.log(from + ", " + trigger + ", " + agenda.transitions[from_name][trigger]);*/

      let to_name = agenda.transitions[from_name][trigger]; 
      
      let from_index = states.findIndex((st) => st.name == from_name); 
      let to_index = states.findIndex((st) => st.name == to_name);
      let trigger_index = agenda.transition_triggers.findIndex((tt) => tt.name = trigger);

      transitions.push({
        id: generateID(),
        from: states[from_index],
        to: states[to_index],
        trigger: agenda.transition_triggers[trigger_index].name,
        description: agenda.transition_triggers[trigger_index].description 
      });
    }
  }

  return {
    states,
    transitions
  };

}

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css']
})
export class LeftComponent implements OnInit {
  states: State[] = [];
  transitions: Transition[] = [];

  constructor(private graphService: GraphService) { }

  ngOnInit(): void {
  }

  onUploadYaml($event: Event): void {
    let upload = $event.target as HTMLInputElement;

    if (upload.value) {
      let file: File = (upload.files as FileList)[0]; 
      
      let text = file.text(); 
      text
        .then(value => { 
          let agenda = extractAgenda(yaml.load(value));
          this.states = agenda.states; 
          this.transitions = agenda.transitions;
        }); 
    }
  }

  onAddState(id: string = generateID()): void {
    this.states.push({  id: id,
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

    console.log(this.states);
    console.log(this.transitions);
  }

  onAddTransition(id: string = generateID()): void {
    this.transitions.push({   id: id,
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
    
    console.log(this.transitions);
  }

  onDrawGraph(): void {
    /* === check whether inputs are wrong-format === */

    /* check if both states and transitions are empty */
    if (this.states.length == 0 && this.transitions.length == 0) {
      alert('No inputs. Please upload a yaml file or fill the input form');
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
