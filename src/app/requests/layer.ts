import { GateRequest } from './gate';
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class LayerRequest {

  @JsonProperty('step', Number)
  step: number = undefined;
  @JsonProperty('gates', [GateRequest])
  gates: GateRequest[] = undefined;

  /*
  constructor(step: number, gates: GateRequest[]) {
    this.step = step;
    this.gates = gates;
  }
  */
}
