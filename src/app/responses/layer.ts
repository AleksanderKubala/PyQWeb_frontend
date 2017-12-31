import { Gate } from './gate';

export class Layer {

  step: number;
  gates: Gate[];

  constructor(step: number, gates: Gate[]) {
    this.step = step;
    this.gates = gates;
  }
}
