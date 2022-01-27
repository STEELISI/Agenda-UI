import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { ResizedEvent } from 'angular-resize-event';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { Node, Edge } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-drawingboard',
  templateUrl: './drawingboard.component.html',
  styleUrls: ['./drawingboard.component.css']
})
export class DrawingboardComponent implements OnInit, OnChanges {

  @Input() nodes: Node[] = [];
  @Input() links: Edge[] = [];

  @Output() resizableBoardEvent: EventEmitter<boolean> = new EventEmitter();

  resizeCounter: number = 0;
  timeoutID: number = 0; 

  zoomToFit$: Subject<boolean> = new Subject();
  
  constructor() { 
  }

  ngOnInit(): void {
    
    /* 
     * swimlane expand parent div (drawing-board) the first time 
     * the graph shows up, causing drawing-board keep expanding and 
     * div keep resizing (larger) => hard-code to stop by 
     * fixing the height of div so that the board will not expand
     */

    const boardElement = document.getElementById("board");
    if (boardElement) {
      boardElement.style.height = "200px";
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.zoomToFit$.next(true)
  }

  onResizableBoard($event: ResizedEvent): void {
    if (this.nodes.length == 0 && this.links.length == 0) {
      return;
    }

    clearTimeout(this.timeoutID);
    this.timeoutID = window.setTimeout(() => {this.resizableBoardEvent.emit(true)}, 500);
  }

}
