import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { saveAs } from 'file-saver';
import { Node, Edge } from '@swimlane/ngx-graph';
import { AgendaService } from '../../services/agenda.service';
import { GraphService } from '../../services/graph.service';

import * as yaml from 'js-yaml';

import { Agenda } from '../../Agenda';
import { State } from '../../State';
import { Transition } from '../../Transition';

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

  agenda = {} as Agenda;
  agendaStr!: string;

  @Output() refreshBoardEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private agendaService: AgendaService, private graphService: GraphService) {
    this.agendaService.getAgenda().subscribe((agenda) => this.onUpdateAgenda(agenda));
    this.graphService.getStates().subscribe((states) => this.onUpdateNode(states));
    this.graphService.getTransitions().subscribe((transitions) => this.onUpdateEdge(transitions));
  }

  ngOnInit(): void {
    this.agendaStr = '';
  }

  onUpdateAgenda(agenda: Agenda): void {
    this.agenda = agenda;
    this.agendaStr = JSON.stringify(this.agenda, null, 4);
    /* console.log(this.agendaStr); */ 
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
    if (!this.agendaStr) {
      alert("Agenda is empty. Please fill out the form");
      return;
    }

    let yamlStr = yaml.dump(this.agenda);
    console.log(yamlStr); 
    
    var blob = new Blob([yamlStr], {type: "yaml/plain;charset=utf-8"});
    saveAs(blob, "agenda.yaml");
  }

}
