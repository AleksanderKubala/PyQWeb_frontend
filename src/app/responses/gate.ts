

export class GateResponse {

  gate: string;
  qubits: number[];
  controls: number[];

  constructor(gate: string, qubits: number[], controls: number[]) {
    this.gate = gate;
    this.qubits = qubits;
    this.controls = controls;
  }
}
