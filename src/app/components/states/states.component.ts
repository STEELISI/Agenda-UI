import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { State } from '../../State';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {
  @Input() state: State = { id: "id", 
                            name: '',
                            description: '',
                            start: false,
                            terminus: false
  };
  @Output() updateStateEvent: EventEmitter<State> = new EventEmitter();
  @Output() deleteStateEvent: EventEmitter<State> = new EventEmitter();

  name: string = '';
  description: string = '';
  start: boolean = false;
  terminus: boolean = false;
  faTimesCircle = faTimesCircle;
  constructor() { }
  
  ngOnInit(): void {
  }

  updateName(state: State) {
    state.name = this.name; 
    this.updateStateEvent.emit(state);
  }

  updateDescription(state: State) {
    state.description = this.description;
    this.updateStateEvent.emit(state);
  }

  updateStart(state: State) {
    state.start = this.start;
    this.updateStateEvent.emit(state);
  }

  updateTerminus(state: State) {
    state.terminus = this.terminus;
    this.updateStateEvent.emit(state);
  }

  deleteState(state: State) {
    this.deleteStateEvent.emit(state);
  }
}
