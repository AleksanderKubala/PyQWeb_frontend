
export class Removal {
  layer: number;
  qubits: number[];

  constructor (layer: number, qubits: number[]) {
    this.layer = layer;
    this.qubits = qubits;
  }
}
