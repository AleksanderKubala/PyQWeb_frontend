/**
 * Created by Olek on 2017-12-27.
 */

export class Gate {
  gate: string;
  layer: number;
  qubits: number[];
  controls: number[];

  constructor(gate: string, layer: number, qubits: number[], controls: number[]) {
    this.gate = gate;
    this.layer = layer;
    this.qubits = qubits;
    this.controls = controls;
  }
}
