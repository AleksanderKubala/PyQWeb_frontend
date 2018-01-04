import { GateInfoResponse } from './gateinfo';

export class GateSetResponse {
  gates: GateInfoResponse[];

  constructor (gates: GateInfoResponse[]) {
    this.gates = gates;
  }
}
