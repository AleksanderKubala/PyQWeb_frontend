import { Component, OnInit } from '@angular/core';
import { GateService } from '../../services/gate_service/gate.service';

@Component({
  selector: 'app-gates',
  templateUrl: './gates.component.html',
  styleUrls: ['./gates.component.css']
})

export class GatesComponent implements OnInit {

  gates: string[];

  constructor(private gateService: GateService) { }

  ngOnInit() {
    this.getGates();
  }

  getGates(): void {
    this.gateService.getGates().subscribe(gates => this.gates = gates);
  }

  selectGate(gate: string): void {
    this.gateService.setSelectedGate(gate);
  }
}
