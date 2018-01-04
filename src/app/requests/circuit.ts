import { LayerRequest } from './layer';
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class CircuitRequest {

  @JsonProperty('size', Number)
  size: number = undefined;
  @JsonProperty('state', Number)
  state: number = undefined;
  @JsonProperty('layerCount', Number)
  layerCount: number = undefined;
  @JsonProperty('layers', [LayerRequest])
  layers: LayerRequest[] = undefined;

  constructor () {  }

  /*
  constructor (size: number, state: number, layerCount: number, layers: LayerRequest[]) {
    this.size = size;
    this.state = state;
    this.layerCount = layerCount;
    this.layers = layers;

  }
  */

}
