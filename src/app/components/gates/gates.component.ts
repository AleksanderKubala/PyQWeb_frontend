import { Component, OnInit } from '@angular/core';
import { GateService } from '../../services/gate_service/gate.service';
import { CONTROL } from '../../img_config';

@Component({
  selector: 'app-gates',
  templateUrl: './gates.component.html',
  styleUrls: ['./gates.component.css']
})

export class GatesComponent implements OnInit {

  gates: string[];
  modifiers: string[];

  constructor(private gateService: GateService) { }

  ngOnInit() {
    this.modifiers = [CONTROL];
    this.gateService.getGates().then(response => {
      this.gates = response;
    });
  }

  selectGate(gate: string): void {
    this.gateService.setSelectedGate(gate);
  }
}
