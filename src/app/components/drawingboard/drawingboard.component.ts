import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { Node, Edge } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-drawingboard',
  templateUrl: './drawingboard.component.html',
  styleUrls: ['./drawingboard.component.css']
})
export class DrawingboardComponent implements OnChanges {

  @Input() nodes: Node[] = [];
  @Input() links: Edge[] = [];

  zoomToFit$: Subject<boolean> = new Subject();
  
  constructor() { 
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.zoomToFit$.next(true)
  }

}
