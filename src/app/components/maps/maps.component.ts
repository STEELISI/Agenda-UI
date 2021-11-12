import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { State } from '../../State';
import { Action } from '../../Action';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @Input() states: State[] = [];
  @Input() actions: Action[] = [];

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
}
