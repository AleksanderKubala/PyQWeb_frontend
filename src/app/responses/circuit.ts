import { Layer } from './layer';

export class Circuit {

  size: number;
  state: number;
  layerCount: number;
  layers: Layer[];

  constructor (size: number, state: number, layerCount: number, layers: Layer[]) {
    this.size = size;
    this.state = state;
    this.layerCount = layerCount;
    this.layers = layers;
  }

}
