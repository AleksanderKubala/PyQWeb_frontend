import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GatesComponent } from './components/gates/gates.component';
import { GateService } from './services/gate_service/gate.service';
import { Urls } from './_config/server-urls';
import { CircuitComponent } from './components/circuit/circuit.component';
import { ResultsComponent } from './components/results/results.component';
import { CircuitService } from './services/circuit_service/circuit.service';
import { ElementComponent } from './components/element/element.component';
import { ResultsService } from './services/results_service/results.service';
import {EventService} from './services/event_service/event.service';


@NgModule({
  declarations: [
    AppComponent,
    GatesComponent,
    CircuitComponent,
    ResultsComponent,
    ElementComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [GateService, Urls, CircuitService, ResultsService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
