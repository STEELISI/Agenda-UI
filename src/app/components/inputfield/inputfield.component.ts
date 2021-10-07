import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { State } from '../../State';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.css']
})
export class InputfieldComponent implements OnInit {
  @Input() state: State = {id: -1, text: ''};
  @Output() updateStateEvent: EventEmitter<State> = new EventEmitter();
  @Output() deleteStateEvent: EventEmitter<State> = new EventEmitter();

  text: string = '';
  faTimesCircle = faTimesCircle;
  
  constructor() { }

  ngOnInit(): void {
  }

  updateState(state: State) {
    state.text = this.text; 
    this.updateStateEvent.emit(state);
  }

  deleteState(state: State) {
    this.deleteStateEvent.emit(state);
  }
}
