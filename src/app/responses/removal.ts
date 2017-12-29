/**
 * Created by Olek on 2017-12-27.
 */

export class Removal {
  layer: number;
  qubits: number[];

  constructor (layer: number, qubits: number[]) {
    this.layer = layer;
    this.qubits = qubits;
  }
}
