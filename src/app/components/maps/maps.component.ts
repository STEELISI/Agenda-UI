import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { State } from '../../State';
import { Action } from '../../Action';
import { ActionMap } from '../../ActionMap';
import { Policy } from '../../Policy';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @Input() actions: Action[] = [];
  @Input() actionMaps: ActionMap[] = [];
  @Input() stallMaps: ActionMap[] = [];
  @Input() policy: Policy = {} as Policy;

  @Output() updateActionMapEvent: EventEmitter<ActionMap> = new EventEmitter();
  @Output() updateStallMapEvent: EventEmitter<ActionMap> = new EventEmitter();
  @Output() updatePolicyEvent: EventEmitter<Policy> = new EventEmitter();

  constructor() { 
  }

  ngOnInit(): void { }

  showActionList(id: string): void {
    var checkList = document.getElementById(id)!;
    if (checkList.classList.contains('visible'))
      checkList.classList.remove('visible');
    else
      checkList.classList.add('visible');
  }

  checked(actionMap: ActionMap, action: Action): boolean {
    return actionMap.actions.findIndex((act) => act.id == action.id) != -1
  }

  updateActionMap($event: Event, actionMap: ActionMap, action: Action): void {
    let checked = (<HTMLInputElement>$event.target).checked
    let act_map_index = this.actionMaps.findIndex((action_map) => action_map.state.id == actionMap.state.id);
      
    if (checked) {
      let act_index = this.actions.findIndex((act) => act.id == action.id);
      this.actionMaps[act_map_index].actions.push(this.actions[act_index]);
    }
    else {
      let act_index = this.actionMaps[act_map_index].actions.findIndex((act) => act.id == action.id);
      let len = this.actionMaps[act_map_index].actions.length;
      if (len > 1)
        this.actionMaps[act_map_index].actions.splice(act_index, 1);
      else
        this.actionMaps[act_map_index].actions.splice(act_index);
    }

    this.updateActionMapEvent.emit(this.actionMaps[act_map_index]);
  }

  updateStallMap($event: Event, stallMap: ActionMap, action: Action): void {
    let checked = (<HTMLInputElement>$event.target).checked
    let stl_map_index = this.stallMaps.findIndex((stall_map) => stall_map.state.id == stallMap.state.id);
      
    if (checked) {
      let act_index = this.actions.findIndex((act) => act.id == action.id);
      this.stallMaps[stl_map_index].actions.push(this.actions[act_index]);
    }
    else {
      let act_index = this.stallMaps[stl_map_index].actions.findIndex((act) => act.id == action.id);
      let len = this.stallMaps[stl_map_index].actions.length;
      if (len > 1)
        this.stallMaps[stl_map_index].actions.splice(act_index, 1);
      else
        this.stallMaps[stl_map_index].actions.splice(act_index);
    }

    this.updateStallMapEvent.emit(this.stallMaps[stl_map_index]);
  }

  updatePolicy(policy: Policy): void {
    this.updatePolicyEvent.emit(this.policy);
  }

}
