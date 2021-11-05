import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { saveAs } from 'file-saver';
import { Node, Edge } from '@swimlane/ngx-graph';
import { GraphService } from '../../services/graph.service';

import * as yaml from 'js-yaml';

import { Agenda } from '../../Agenda';
import { State } from '../../State';
import { Transition } from '../../Transition';

function generateAgenda(states: State[], transitions: Transition[]) {
  let agenda: Agenda = {
    "states": [],
    "start_state_name": '',
    "terminus_names": [],
    "transition_triggers": [],
    "transitions": {}
  };

  states.forEach((st) => {
                 agenda.states.push({"name": st.name, "description": st.description});
                 if (st.start) agenda.start_state_name = st.name;
                 if (st.terminus) agenda.terminus_names.push(st.name);
  });

  transitions.forEach((ts) => {
                agenda.transition_triggers.push({name: ts.trigger, description: ts.description});
                if (!(ts.from.name in agenda.transitions)) agenda.transitions[ts.from.name] = {};
                agenda.transitions[ts.from.name][ts.trigger] = ts.to.name;
                /*if (!(ts.trigger in agenda.transitions[ts.from.name])) agenda.transitions[ts.from.name][ts.trigger] = {};*/
  });

  return agenda
}

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css']
})
export class RightComponent implements OnInit {
  states: State[] = [];
  transitions: Transition[] = [];

  nodes: Node[] = [];
  links: Edge[] = [];

  @Output() refreshBoardEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private graphService: GraphService) { 
    this.graphService.getStates().subscribe((states) => this.onUpdateNode(states));
    this.graphService.getTransitions().subscribe((transitions) => this.onUpdateEdge(transitions));
  }

  ngOnInit(): void {
  }
 
  onUpdateNode(states: State[]): void {
    let nodes: Node[] = [];
    states.forEach((st) => {
      nodes.push({
        id: st.id.toString(),
        label: st.name
      });
    });

    this.states = states;
    this.nodes = nodes;
  }

  onUpdateEdge(transitions: Transition[]): void {
    let edges: Edge[] = [];

    transitions.forEach((ts) => {
      edges.push({
        id: ts.id.toString(),
        source: ts.from.id.toString(),
        target: ts.to.id.toString(),
        label: ts.trigger
      });
    });

    this.transitions = transitions;
    this.links = edges;
  }

  onRefreshBoard(): void {
    this.refreshBoardEvent.emit(true);
  }

  onSubmit(): void {
    let agenda = generateAgenda(this.states, this.transitions); 
    let yamlStr = yaml.dump(agenda);
    console.log(yamlStr);
    
    var blob = new Blob([yamlStr], {type: "yaml/plain;charset=utf-8"});
    saveAs(blob, "agenda.yaml");
  }

}
