import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Action } from '../../Action';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  @Input() action_: Action = {
    id: "id",
    name: '',
    utterance: '',
    flag: false,
    repeat: 1 
  }
  @Output() updateActionEvent: EventEmitter<Action> = new EventEmitter();
  @Output() deleteActionEvent: EventEmitter<Action> = new EventEmitter();

  @Input() repeats: number[] = [];
  faTimesCircle = faTimesCircle;


  constructor() { }

  ngOnInit(): void {
  }

  updateName(action_: Action) {
    this.updateActionEvent.emit(action_);
  }

  updateUtterance(action_: Action) {
    this.updateActionEvent.emit(action_);
  }

  updateFlag(action_: Action) {
    this.updateActionEvent.emit(action_);
  }

  updateRepeat(action_: Action) {
    this.updateActionEvent.emit(action_);
  }

  deleteAction(action_: Action) {
    this.deleteActionEvent.emit(action_);
  } 

}
