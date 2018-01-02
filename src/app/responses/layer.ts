import { GateResponse } from './gate';

export class LayerResponse {

  step: number;
  gates: GateResponse[];

  constructor(step: number, gates: GateResponse[]) {
    this.step = step;
    this.gates = gates;
  }
}
