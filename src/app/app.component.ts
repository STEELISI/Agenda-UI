import { Component, ViewChild } from '@angular/core';
import { LeftComponent } from './components/left/left.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agenda-ui';

  @ViewChild(LeftComponent) left!: LeftComponent;

  constructor() { }

  onUpdateDraw(): void {
    this.left.onRefreshGraph();
  }
}
