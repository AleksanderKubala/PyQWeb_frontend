import {Component, OnInit} from '@angular/core';
import { CircuitService } from '../../services/circuit_service/circuit.service';
import { Qubit } from '../../classes/qubit';
import { Slot } from '../../classes/slot';
import { EMPTY, CONTROL, MODIFIERS, MULTIGATES } from '../../_config/img_config';
import {isNullOrUndefined} from 'util';
import { GateResponse } from '../../responses/gate';
import {Register} from '../../classes/register';
import {CircuitLayer} from '../../classes/circuit_layer';
import {LayerResponse} from '../../responses/layer';
import {RemoveGateResponse} from '../../responses/remove_gate';
import {CircuitResponse} from '../../responses/circuit';
import {EventService} from '../../services/event_service/event.service';
import {Event} from '../../_config/event_config';
import {CircuitRequest} from '../../requests/circuit';

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.css']
})
export class CircuitComponent implements OnInit {

  selectedGate: string;
  sizeRequest: number;
  size: number;
  state: number;
  layerCount: number;
  register: Register;
  layers: CircuitLayer[];

  gateBegin: Slot;

  constructor(private circuitService: CircuitService, private eventService: EventService) { }

  ngOnInit() {
    this.eventService.on(Event.GATE_SELECTED, this.onGateSelected, this);
    this.eventService.on(Event.IMPORT_REQUEST, this.onImportRequest , this);
    this.circuitService.getCircuit().then(response => {
      this.loadCircuit(response);
    });
  }

  onGateSelected(signature: string) {
    this.selectedGate = signature[0];
    this.freeGateBegin();
  }

  onImportRequest(request: CircuitRequest) {
    const circuit = request[0];
    this.circuitService.postCircuit(circuit).then(response => {
      this.loadCircuit(response);
    });
  }

  resetCircuit() {
    this.circuitService.putReset().then(response => {
      this.loadCircuit(response);
    });
  }

  loadCircuit(circuit: CircuitResponse): void {
    this.size = circuit.size;
    this.state = circuit.state;
    this.layerCount = circuit.layerCount;
    this.register = new Register(this.size);
    for (let i = 0; i < this.size; i++) {
      this.register.slots[i] = new Qubit(i, 0, 0);
    }
    this.setRegister();
    this.layers = new Array<CircuitLayer>(this.layerCount);
    for (let i = 0; i < this.layerCount; i++) {
      this.layers[i] = new CircuitLayer(this.size, i);
    }
    this.processCircuitChange(circuit.layers, []);
  }

  addGate(slot: Slot): void {
    if (isNullOrUndefined(this.selectedGate) === false) {
      if (MULTIGATES.indexOf(this.selectedGate) > -1) {
        this.prepareMultiGate(slot);
      } else {
        this.postAddGateRequest(this.selectedGate, [slot.row], slot.col, []);
      }
    }
  }

  prepareMultiGate(slot: Slot): void {
    if (isNullOrUndefined(this.gateBegin)) {
      slot.freeze();
      if (MODIFIERS.indexOf(this.selectedGate) > -1) {
        if (slot.name === EMPTY) {
          slot.unfreeze();
          return;
        }
      }
      this.gateBegin = slot;
    } else {
      if (slot.col === this.gateBegin.col) {
        if ( slot.row !== this.gateBegin.row ) {
          this.addMultiGate(slot);
        }
      }
    }
  }
  addMultiGate(slot: Slot): void {
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
    if (MODIFIERS.indexOf(this.selectedGate) > -1) {
      controls.push(slot.row);
    } else {
      qubits.push(slot.row);
      gate = this.selectedGate;
    }
    this.freeGateBegin();
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
    if (isNullOrUndefined(this.gateBegin)) {
      this.postRemoveGateRequest([slot.row], slot.col);
      return slot.onContextMenu();
    } else {
      this.freeGateBegin();
    }
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

  resizeRegister(): void {
    if (isNullOrUndefined(this.sizeRequest)) {
      this.sizeRequest = this.size;
    }
    this.postRegisterChanges(this.sizeRequest, this.state);
  }

  postRegisterChanges(size: number, state: number): void {
    this.circuitService.postRegisterChanges(size, state).then(response => {
      this.state = response.state;
      this.size = response.size;
      this.processCircuitChange([], response.changes.removed);
      this.register.resize(this.size);
      for (let i = 0; i < this.layers.length; i++) {
        this.layers[i].resize(this.size);
      }
      this.setRegister();
    });
  }

  postAddGateRequest(gate: string, qubits: number[], layer: number, controls: number[]): void {
    this.circuitService.postAddGate(gate, qubits, layer, controls).then(response => {
      this.processCircuitChange(response.added, response.removed);
    });
  }

  postRemoveGateRequest(qubits: number[], layer: number): void {
    this.circuitService.putRemoveGate(qubits, layer).then(response => {
      this.processCircuitChange(response.added, response.removed);
    });
  }

  processCircuitChange(added: LayerResponse[], removed: RemoveGateResponse[]): void {
    for (let i = 0; i < removed.length; i++) {
      const layer = removed[i].step;
      for (let j = 0; j < removed[i].qubits.length; j++) {
        const slot = this.layers[layer].slots[removed[i].qubits[j]];
        slot.clear();
        slot.updateImage();
      }
    }
    for (let i = 0; i < added.length; i++) {
      const layer = added[i].step;
      for (let j = 0; j < added[i].gates.length; j++) {
        this.setSlotsImage(added[i].gates[j], layer);
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

  freeGateBegin(): void {
    if (isNullOrUndefined(this.gateBegin) === false) {
      this.gateBegin.unfreeze();
      this.gateBegin = undefined;
    }
  }

}
