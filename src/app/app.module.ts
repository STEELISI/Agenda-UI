import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxGraphModule } from '@swimlane/ngx-graph';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftComponent } from './components/left/left.component';
import { RightComponent } from './components/right/right.component';
import { InputfieldComponent } from './components/inputfield/inputfield.component';
import { DropdownfieldComponent } from './components/dropdownfield/dropdownfield.component';
import { DrawingboardComponent } from './components/drawingboard/drawingboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftComponent,
    RightComponent,
    InputfieldComponent,
    DropdownfieldComponent,
    DrawingboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    NgxGraphModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
