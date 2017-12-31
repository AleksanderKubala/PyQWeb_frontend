import { Component, OnInit } from '@angular/core';
import { CircuitService } from '../../services/circuit_service/circuit.service';
import { Layer } from '../../classes/layer';
import { Qubit } from '../../classes/qubit';
import { CircuitElement } from '../../classes/circuit_element';
import { EMPTY } from '../../img_config';
import { GateService } from '../../services/gate_service/gate.service';

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.css']
})
export class CircuitComponent implements OnInit {

  size: number;
  state: number;
  layerCount: number;
  register: Layer<Qubit>;
  layers: Layer<CircuitElement>[];

  constructor(private circuitService: CircuitService, private gateService: GateService) {}

  ngOnInit() {
    this.circuitService.getCircuit().then(response => {
      this.size = response.size;
      this.state = response.state;
      this.layerCount = response.layerCount;
      this.register = new Layer<Qubit>(this.size);
      for (let i = 0; i < this.size; i++) {
        this.register.slots[i] = new Qubit(0);
      }
      this.setRegister();
      this.layers = new Array<Layer<CircuitElement>>(this.layerCount);
      for (let i = 0; i < this.layerCount; i++) {
        this.layers[i] = new Layer<CircuitElement>(this.size, i);
        for (let j = 0; j < this.size; j++) {
          this.layers[i].slots[j] = new CircuitElement(EMPTY);
        }
      }
    });
  }

  postRegisterChanges(changedQubit: Qubit): void {
    changedQubit.changeValue();
    let newState = '';
    for (let i = 0; i < this.register.size; i++) {
      newState = newState + this.register.slots[i].value.toString();
    }
    this.circuitService.postRegisterChanges(this.size, Number.parseInt(newState, 2)).then(response => {
      this.state = response.state;
      this.setRegister();
    });
  }

  setRegister(): void {
    let binary = this.state.toString(2);
    for (let i = this.size - binary.length; i > 0; i--) {
      binary = '0' + binary;
    }
    for (let i = 0; i < binary.length; i++) {
      this.register.slots[i].setValue(Number.parseInt(binary.charAt(i)));
      this.register.slots[i].updateName();
    }
  }

  getCurrentGate(): string {
    return this.gateService.getSelectedGate();
  }

}
