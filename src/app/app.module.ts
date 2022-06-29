import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularResizeEventModule } from 'angular-resize-event';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { AngularSplitModule } from 'angular-split';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftComponent } from './components/left/left.component';
import { RightComponent } from './components/right/right.component';
import { StatesComponent } from './components/states/states.component';
import { TransitionsComponent } from './components/transitions/transitions.component';
import { DrawingboardComponent } from './components/drawingboard/drawingboard.component';
import { ActionsComponent } from './components/actions/actions.component';
import { MapsComponent } from './components/maps/maps.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LeftComponent,
    RightComponent,
    StatesComponent,
    TransitionsComponent,
    DrawingboardComponent,
    ActionsComponent,
    MapsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    AngularResizeEventModule,
    NgxGraphModule,
    AngularSplitModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
