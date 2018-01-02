
export class AddGateRequest {

  gate: string;
  qubits: number[];
  step: number;
  controls: number[];

  constructor (gate: string, qubits: number[], step: number, controls: number[]) {
    this.gate = gate;
    this.qubits = qubits;
    this.step = step;
    this.controls = controls;
  }
}
