import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { Node, Edge } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-drawingboard',
  templateUrl: './drawingboard.component.html',
  styleUrls: ['./drawingboard.component.css']
})
export class DrawingboardComponent implements OnInit {

  @Input() nodes: Node[] = [];
  @Input() links: Edge[] = [];

  constructor() { 
  }

  ngOnInit(): void {
  }

}
