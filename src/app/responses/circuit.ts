import { LayerResponse } from './layer';

export class CircuitResponse {

  size: number;
  state: number;
  layerCount: number;
  layers: LayerResponse[];

  constructor (size: number, state: number, layerCount: number, layers: LayerResponse[]) {
    this.size = size;
    this.state = state;
    this.layerCount = layerCount;
    this.layers = layers;
  }

}
