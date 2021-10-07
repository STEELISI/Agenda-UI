import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftComponent } from './components/left/left.component';
import { RightComponent } from './components/right/right.component';
import { InputfieldComponent } from './components/inputfield/inputfield.component';
import { DropdownfieldComponent } from './components/dropdownfield/dropdownfield.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftComponent,
    RightComponent,
    InputfieldComponent,
    DropdownfieldComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
