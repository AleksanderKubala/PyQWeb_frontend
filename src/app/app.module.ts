import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GatesComponent } from './components/gates/gates.component';
import { GateService } from './services/gate_service/gate.service';
import { Urls } from './server-urls';
import { CircuitComponent } from './components/circuit/circuit.component';
import { ResultsComponent } from './components/results/results.component';
import { CircuitService } from './services/circuit_service/circuit.service';
import { RegisterComponent } from './components/register/register.component';
import { QubitComponent } from './components/qubit/qubit.component';
import { LayerComponent } from './components/layer/layer.component';
import { SlotComponent } from './components/slot/slot.component';


@NgModule({
  declarations: [
    AppComponent,
    GatesComponent,
    CircuitComponent,
    ResultsComponent,
    RegisterComponent,
    QubitComponent,
    LayerComponent,
    SlotComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GateService, Urls, CircuitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
