import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Node, Edge } from '@swimlane/ngx-graph';

import { State } from '../State';
import { Transition } from '../Transition';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private nodeSubject: BehaviorSubject<Node[]> = new BehaviorSubject(<Node[]>[]);
  private edgeSubject: BehaviorSubject<Edge[]> = new BehaviorSubject(<Edge[]>[]);

  constructor() { }

  setNodes(states: State[]): void {
    let nodes: Node[] = [];
    states.forEach((st) => nodes.push({ id: st.id.toString(), label: st.text }));

    this.nodeSubject.next(nodes);
  }

  getNodes(): Observable<Node[]> {
    return this.nodeSubject.asObservable();
  }

  setEdges(transitions: Transition[]): void {
    let edges: Edge[] = [];
    transitions.forEach((ts) => edges.push({ id: ts.id.toString(),
                                             source: ts.from.id.toString(),
                                             target: ts.to.id.toString() }));

    this.edgeSubject.next(edges);
  }

  getEdges(): Observable<Edge[]> {
    return this.edgeSubject.asObservable();
  }
}
