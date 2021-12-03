import { Component, OnInit } from '@angular/core';
import { faCaretSquareUp, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';

import * as yaml from 'js-yaml';

import { Agenda, extractAgenda, generateAgenda } from '../../Agenda';
import { State } from '../../State';
import { Transition } from '../../Transition';
import { Action } from '../../Action';
import { ActionMap } from '../../ActionMap';
import { Policy } from '../../Policy';
import { generateID } from '../../utils';

import { AgendaService } from '../../services/agenda.service';
import { GraphService } from '../../services/graph.service';


@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css']
})
export class LeftComponent implements OnInit {
  name: string = '';
  states: State[] = [];
  kickoff: State = {
    id: 'kickoff', 
    name: 'KICKOFF', 
    description: '',
    start: false,
    terminus: false
  };
  transitions: Transition[] = [];
  actions: Action[] = [];
  actionMaps: ActionMap[] = [];
  stallMaps: ActionMap[] = [];
  policy: Policy = {
    reuse: false,
    max_transitions: 5,
    absolute_accept_thresh: 0.6,
    min_accept_thresh_w_differential: 0.2,
    accept_thresh_differential: 0.1,
    kickoff_thresh: 1.0
  };

  faUp = faCaretSquareUp;
  faDown = faCaretSquareDown;

  arrowState = this.faUp;
  arrowTransition = this.faUp;
  arrowAction = this.faUp;

  showState = false;
  showTransition = false;
  showAction = false;

  repeats: number[] = [1, 2, 3]

  constructor(private agendaService: AgendaService, private graphService: GraphService) { }

  ngOnInit(): void {
    this.states.push(this.kickoff);
  }

  onShowState(): void {
    this.arrowState = (this.arrowState == this.faUp) ? this.faDown : this.faUp;
    this.showState = (this.arrowState == this.faUp) ? false : true;
  }

  onShowTransition(): void {
    this.arrowTransition = (this.arrowTransition == this.faUp) ? this.faDown : this.faUp;
    this.showTransition = (this.arrowTransition == this.faUp) ? false : true;
  }

  onShowAction(): void {
    this.arrowAction = (this.arrowAction == this.faUp) ? this.faDown : this.faUp;
    this.showAction = (this.arrowAction == this.faUp) ? false : true;
  }

  onUploadYAML($event: Event): void {
    let upload = $event.target as HTMLInputElement;

    if (upload.value) {
      let file: File = (upload.files as FileList)[0]; 
      
      let text = file.text(); 
      text
        .then(value => { 
          let agenda = extractAgenda(yaml.load(value));
          this.name = agenda.name;
          this.states = [this.kickoff];
          agenda.states.forEach((st) => this.states.push(st));
          this.transitions = agenda.transitions;
          this.transitions.forEach((ts) => {
            if (ts.id.includes("kickoff"))
              ts.from = this.kickoff
          });
          if (this.showState == false) this.onShowState();
          if (this.showTransition == false) this.onShowTransition();
          if (this.showAction == false) this.onShowAction();
          this.actions = agenda.actions;
          this.actionMaps = agenda.actionMaps;
          this.stallMaps = agenda.stallMaps;
          this.policy = agenda.policy;
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

    if (this.showState == false)
      this.onShowState();
  }

  onUpdateState($event: State): void {
    const index = this.states.findIndex((st) => st.id == $event.id);

    this.states[index] = $event;

    /* update actionMaps and stallMaps */
    let act_index = this.actionMaps.findIndex((act_map) => act_map.state.id == $event.id);
    if (act_index == -1) { /* add new state to actionMaps */
      this.actionMaps.push({
        state: $event,
        actions: []
      });
    }
    
    let stl_index = this.stallMaps.findIndex((stl_map) => stl_map.state.id == $event.id);
    if (stl_index == -1) { /* add new state to stallMaps */
      this.stallMaps.push({
        state: $event,
        actions: []
      });
    }

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

    /* remove maps in actionMaps and stallMaps */
    let act_index = this.actionMaps.findIndex((act_map) => act_map.state.id == $event.id);
    if (this.actionMaps.length > 1) 
      this.actionMaps.splice(act_index, 1);
    else 
      this.actionMaps.splice(act_index);

    let stl_index = this.stallMaps.findIndex((stl_map) => stl_map.state.id == $event.id);
    if (this.stallMaps.length > 1) 
      this.stallMaps.splice(stl_index, 1);
    else 
      this.stallMaps.splice(stl_index);

    console.log(this.states);
    console.log(this.transitions);
    /* console.log(this.actionMaps);
    console.log(this.stallMaps); */
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

    if (this.showTransition == false)
      this.onShowTransition();
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

  onAddAction(id: string = generateID()): void {
    this.actions.push({  
      id: id,
      name: '',
      utterance: '',
      flag: false,
      repeat: 1
    });

    if (this.showAction == false)
      this.onShowAction();
  }

  onUpdateAction($event: Action): void {
    const index = this.actions.findIndex((act) => act.id == $event.id);

    this.actions[index] = $event;
  }

  onDeleteAction($event: Action): void {
    const index = this.actions.findIndex((act) => act.id == $event.id);

    if (this.actions.length > 1) 
      this.actions.splice(index, 1);
    else 
      this.actions.splice(index);
    
    console.log(this.actions);
  }

  onUpdateActionMap($event: ActionMap): void {
    const index = this.actionMaps.findIndex((action_map) => action_map.state.id == $event.state.id);

    this.actionMaps[index] = $event;
    /* console.log(this.actionMaps); */
  }

  onUpdateStallMap($event: ActionMap): void {
    const index = this.stallMaps.findIndex((stall_map) => stall_map.state.id == $event.state.id);

    this.stallMaps[index] = $event;
    /* console.log(this.stallMaps); */
  }

  onUpdatePolicy($event: Policy): void {
    this.policy = $event;
  }

  onGenerateYAML(): void {
    /* === check whether inputs are wrong-format === */

    /* check if both states and transitions are empty */
    if (this.states.length == 1 && this.transitions.length == 0) {
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

    let agenda = generateAgenda(
      this.name,
      this.states, 
      this.transitions,
      this.actions,
      this.actionMaps,
      this.stallMaps,
      this.policy
    );
    this.agendaService.setAgenda(agenda);
    
    this.onRefreshGraph();
  }

  onRefreshGraph(): void {
    /* === check (again) to determine whether or not we will refresh the graph (WARNING!: seems like the duplicate of onGenerateYAML() but in fact is used for the other purpose) === */

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
