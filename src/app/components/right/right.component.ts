import { Component, OnInit } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { Node, Edge } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css']
})
export class RightComponent implements OnInit {
  nodes: Node[] = [];
  links: Edge[] = [];

  constructor(private graphService: GraphService) { 
    this.graphService.getNodes().subscribe((nodes) => this.onUpdateNode(nodes));
    this.graphService.getEdges().subscribe((edges) => this.onUpdateEdge(edges));
  }

  ngOnInit(): void {
  }
 
  onUpdateNode(nodes: Node[]): void {
    this.nodes = nodes;
  }

  onUpdateEdge(edges: Edge[]): void {
    if (!edges.length) {
      return;
    }

    if (edges.findIndex((e) => (e.source == 'from' || e.target == 'to')) != -1) {
      return;
    }
      
    this.links = edges;
    console.log(this.links);
  }

}
