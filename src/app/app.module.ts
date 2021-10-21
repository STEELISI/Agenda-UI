import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { AngularSplitModule } from 'angular-split';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftComponent } from './components/left/left.component';
import { RightComponent } from './components/right/right.component';
import { StatesComponent } from './components/states/states.component';
import { TransitionsComponent } from './components/transitions/transitions.component';
import { DrawingboardComponent } from './components/drawingboard/drawingboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftComponent,
    RightComponent,
    StatesComponent,
    TransitionsComponent,
    DrawingboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    NgxGraphModule,
    AngularSplitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
