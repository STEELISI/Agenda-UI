import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Agenda } from '../Agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private agendaSubject: BehaviorSubject<Agenda> = new BehaviorSubject(<Agenda>{});

  constructor() { }

  setAgenda(agenda: Agenda): void {
    this.agendaSubject.next(agenda);
  }

  getAgenda(): Observable<Agenda> {
    return this.agendaSubject.asObservable();
  }
}
