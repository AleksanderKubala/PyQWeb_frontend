
export class RemoveGateResponse {
  step: number;
  qubits: number[];

  constructor (step: number, qubits: number[]) {
    this.step = step;
    this.qubits = qubits;
  }
}
