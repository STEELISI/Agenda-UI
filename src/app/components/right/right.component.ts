import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { saveAs } from 'file-saver';
import { Node, Edge } from '@swimlane/ngx-graph';
import { AgendaService } from '../../services/agenda.service';
import { GraphService } from '../../services/graph.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as JSZip from 'jszip';
import * as yaml from 'js-yaml';

import { Agenda } from '../../Agenda';
import { State } from '../../State';
import { Transition } from '../../Transition';
import { generateEmptyTrainingDirSh } from '../../utils';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css']
})

export class RightComponent implements OnInit {
  trainingFormData : any[] = []; 
  TrainingDataForm: FormGroup;
  closeResult = '';
  triggerStr = '';
  agendaName = '';
  states: State[] = [];
  transitions: Transition[] = [];

  nodes: Node[] = [];
  links: Edge[] = [];

  agenda = {} as Agenda;
  agendaStr!: string;

  readme: string = `Instructions
1) Move <agenda_name>.yaml file to your agenda directory
2) Move <agenda_name> folder to your training data directory
3) Add training utterances to the empty trigger files`;

  @Output() refreshBoardEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private agendaService: AgendaService, 
    private graphService: GraphService,
    private modalService: NgbModal,
    private http: HttpClient) {
    this.agendaService.getAgenda().subscribe((agenda) => this.onUpdateAgenda(agenda));
    this.graphService.getStates().subscribe((states) => this.onUpdateNode(states));
    this.graphService.getTransitions().subscribe((transitions) => this.onUpdateEdge(transitions));
    this.TrainingDataForm = new FormGroup({});
  }

  setSettings(formData){
    let form = {};
    for (let i=0; i<formData.length; i++){
      form[formData[i].label] = new FormControl('');
    }
    this.TrainingDataForm = new FormGroup(form);    
  }

  open(content) {
    const triggerArray: string[] = [];
    this.agenda.kickoff_triggers.forEach((tg) => {
      triggerArray.push(tg.name);
    });
    this.agenda.transition_triggers.forEach((tg) => {
      triggerArray.push(tg.name);
    });

    triggerArray.forEach(trigger=>{
      console.log(trigger);
      this.trainingFormData.push({"label": trigger});
    });

    this.setSettings(this.trainingFormData);

    this.modalService.open(content,
    {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);

      if (!this.agendaStr) {
        alert("Agenda is empty. Please fill out the form");
        return;
      }

      console.log(this.agendaStr);
      let yamlStr = yaml.dump(this.agenda, {'lineWidth': -1});
      console.log(yamlStr);
      const agenda_name: string = this.agenda.name;
      console.log(agenda_name);
      const trigger_list: string[] = [];
      this.agenda.kickoff_triggers.forEach((tg) => {
        trigger_list.push(tg.name);
      });
      this.agenda.transition_triggers.forEach((tg) => {
        trigger_list.push(tg.name);
      });
      const triggers: string = trigger_list.join(',');
      console.log(triggers);
      const sh = generateEmptyTrainingDirSh(agenda_name, triggers);
      console.log(sh);

      let headers = new HttpHeaders({'TRIGGERS': triggers});
      let options = { headers: headers };
      this.http.post('https://piranha-agenda.isi.edu:4400', null, options)
          .subscribe(
            res => { console.log(res); },
            err => { console.log(err.message); }
          );

      console.log('todo: add fields...');

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.agendaStr = '';
  }

  onUpdateAgenda(agenda: Agenda): void {
    this.agenda = agenda;
    this.agendaStr = JSON.stringify(this.agenda, null, 4);
    this.triggerStr = 'Put triggers here';
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

    let yamlStr = yaml.dump(this.agenda, {'lineWidth': -1});
    console.log(yamlStr); 

    const agenda_name: string = this.agenda.name;
    //console.log(agenda_name);
    const trigger_list: string[] = [];
    this.agenda.kickoff_triggers.forEach((tg) => {
      trigger_list.push(tg.name);
    });
    this.agenda.transition_triggers.forEach((tg) => {
      trigger_list.push(tg.name);
    });
    const triggers: string = trigger_list.join(' ');
    //console.log(triggers);

    const sh = generateEmptyTrainingDirSh(agenda_name, triggers);
    console.log(sh);

    var zip = new JSZip();
    //zip.file("README.txt", this.readme);
    zip.file(this.agenda.name + ".yaml", yamlStr);
    zip.file("generate_empty_training_dir.sh", sh);

    zip.generateAsync({type: "blob"})
    .then(function(content){
      saveAs(content, "agenda.zip");
    });

  }

}
