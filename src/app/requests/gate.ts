import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class GateRequest {

  @JsonProperty('gate', String)
  gate: string = undefined;
  @JsonProperty('qubits', [Number])
  qubits: number[] = undefined;
  @JsonProperty('controls', [Number])
  controls: number[] = undefined;

  /*
  constructor(gate: string, qubits: number[], controls: number[]) {
    this.gate = gate;
    this.qubits = qubits;
    this.controls = controls;
  }

  */
}
