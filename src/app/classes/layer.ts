import { Slot } from './slot';

export class Layer {

  slots: Slot[];
  size: number;
  step: number;

  constructor(size: number, step: number) {
    this.size = size;
    this.step = step;
    this.slots = [];
    for (let i = 0; i < this.size; i++) {
      this.slots[i] = new Slot(i, this.step);
    }
  }
}
