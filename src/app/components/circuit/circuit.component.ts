import { Component, OnInit } from '@angular/core';
import { CircuitService } from '../../services/circuit_service/circuit.service';
import { Layer } from '../../classes/layer';
import { Qubit } from '../../classes/qubit';
import { Slot } from '../../classes/slot';
import { GateInfoResponse } from '../../responses/gateinfo';
import { EMPTY, CONTROL, MODIFIERS, MULTIGATES } from '../../img_config';
import { CircuitChangeResponse } from '../../responses/circuit_change';
import {isNullOrUndefined} from 'util';
import { GateResponse } from '../../responses/gate';
import {GatesComponent} from '../gates/gates.component';
import {GateService} from '../../services/gate_service/gate.service';

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
  layers: Layer<Slot>[];

  gateBegin: Slot;

  constructor(private circuitService: CircuitService, private gateService: GateService) {}

  ngOnInit() {
    this.circuitService.getCircuit().then(response => {
      this.size = response.size;
      this.state = response.state;
      this.layerCount = response.layerCount;
      this.register = new Layer<Qubit>(this.size);
      for (let i = 0; i < this.size; i++) {
        this.register.slots[i] = new Qubit(i, 0, 0);
      }
      this.setRegister();
      this.layers = new Array<Layer<Slot>>(this.layerCount);
      for (let i = 0; i < this.layerCount; i++) {
        this.layers[i] = new Layer<Slot>(this.size, i);
        for (let j = 0; j < this.size; j++) {
          this.layers[i].slots[j] = new Slot(j, i);
        }
      }
    });
  }

  addGate(slot: Slot): void {
    const currentGate = this.gateService.getSelectedGate();
    if (MULTIGATES.indexOf(currentGate) > -1) {
      this.prepareMultiGate(slot, currentGate);
    } else {
      this.postAddGateRequest(currentGate, [slot.row], slot.col, []);
    }
  }

  prepareMultiGate(slot: Slot, currentGate: string): void {
    if (isNullOrUndefined(this.gateBegin)) {
      slot.freeze();
      if (MODIFIERS.indexOf(currentGate) > -1) {
        if (slot.name === EMPTY) {
          slot.unfreeze();
          return;
        }
      }
      this.gateBegin = slot;
    } else {
      if (slot.col === this.gateBegin.col) {
        this.addMultiGate(slot, currentGate);
      }
    }
  }
  addMultiGate(slot: Slot, currentGate: string): void {
    this.linkSlots(slot);
    const controls = [];
    const qubits = [];
    let gate: string;
    for (let i = 0; i < slot.links.length; i++) {
      if (MODIFIERS.indexOf(slot.links[i].name) > -1) {
        controls.push(slot.links[i].row);
      } else {
        qubits.push(slot.links[i].row);
        gate = slot.links[i].name;
      }
    }
    if (MODIFIERS.indexOf(currentGate) > -1) {
      controls.push(slot.row);
    } else {
      qubits.push(slot.row);
      gate = currentGate;
    }
    this.gateBegin.unfreeze();
    this.gateBegin = undefined;
    this.postAddGateRequest(gate, qubits, slot.col, controls);
  }

  linkSlots(slot: Slot) {
    for (let i = 0; i < this.gateBegin.links.length; i++) {
      const link = this.gateBegin.links[i];
      link.links.push(slot);
      slot.links.push(link);
    }
    this.gateBegin.links.push(slot);
    slot.links.push(this.gateBegin);
  }

  removeGate(slot: Slot): boolean {
    this.postRemoveGateRequest([slot.row], slot.col);
    return slot.onContextMenu();
  }

  setQubit(changedQubit: Qubit): void {
    changedQubit.changeValue();
    let stateString = '';
    for (let i = 0; i < this.register.size; i++) {
      stateString = stateString + this.register.slots[i].value.toString();
    }
    const newState = Number.parseInt(stateString, 2);
    this.postRegisterChanges(this.size, newState);
  }

  resizeRegister(newSize: number): void {
    this.postRegisterChanges(newSize, this.state);
  }

  postRegisterChanges(size: number, state: number): void {
    this.circuitService.postRegisterChanges(size, state).then(response => {
      this.state = response.state;
      this.setRegister();
    });
  }

  postAddGateRequest(gate: string, qubits: number[], layer: number, controls: number[]): void {
    this.circuitService.postAddGate(gate, qubits, layer, controls).then(response => {
      this.processCircuitChange(response);
    });
  }

  postRemoveGateRequest(qubits: number[], layer: number): void {
    this.circuitService.postRemoveGate(qubits, layer).then(response => {
      this.processCircuitChange(response);
    })
  }

  processCircuitChange(changes: CircuitChangeResponse): void {
    for (let i = 0; i < changes.removed.length; i++) {
      const layer = changes.removed[i].step;
      for (let j = 0; j < changes.removed[i].qubits.length; j++) {
        const slot = this.layers[layer].slots[changes.removed[i].qubits[j]];
        slot.clear();
        slot.updateImage();
      }
    }
    for (let i = 0; i < changes.added.length; i++) {
      const layer = changes.added[i].step;
      for (let j = 0; j < changes.added[i].gates.length; j++) {
        this.setSlotsImage(changes.added[i].gates[j], layer);
      }
    }
  }

  setSlotsImage(gate: GateResponse, layer: number): void {
    const slot_list = gate.qubits.concat(gate.controls);
    const min = slot_list.reduce((a, b) => Math.min(a, b));
    const max = slot_list.reduce((a, b) => Math.max(a, b));
    for (let k = min; k < max + 1; k++) {
      const slot = this.layers[layer].slots[k];
      if (gate.controls.indexOf(k) > -1) {
        slot.setName(CONTROL);
      } else if (gate.qubits.indexOf(k) > -1) {
        slot.setName(gate.gate);
      } else {
        slot.setName(EMPTY);
      }
      if (slot_list.length > 1) {
        if (k === min) {
          slot.directDown();
        } else if (k === max) {
          slot.directUp();
        } else {
          slot.directMid();
        }
      }
      slot.updateImage();
    }
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

}
