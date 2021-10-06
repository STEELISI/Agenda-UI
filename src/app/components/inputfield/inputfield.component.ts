import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { State } from '../../State';
import { Transition } from '../../Transition';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.css']
})
export class InputfieldComponent implements OnInit {
  @Input() state: State = {id: -1, text: ''};
  @Output() addStateEvent: EventEmitter<State> = new EventEmitter();
  @Output() deleteStateEvent: EventEmitter<State> = new EventEmitter();

  @Input() transition: Transition = { from: { id: -1, text: '' },
                                      to:   { id: -2, text: '' }  }

  text: string = '';
  faTimesCircle = faTimesCircle;
  
  constructor() { }

  ngOnInit(): void {
  }

  addState(state: State) {
    state.text = this.text; 
    this.addStateEvent.emit(state);
  }

  deleteState(state: State) {
    this.deleteStateEvent.emit(state);
  }
}
