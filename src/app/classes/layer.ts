import {CircuitElement} from './circuit_element';

export abstract class Layer<T extends CircuitElement> {

  slots: T[];
  size: number;
  step: number;

  constructor(size: number, step: number = null) {
    this.size = size;
    this.step = step;
    this.slots = [];
    for (let i = 0; i < this.size; i++) {
      this.addToSlots(i, this.step);
    }
  }

  public resize(newSize: number) {
    const difference = newSize - this.size;
    if (difference < 0) {
      for (let i = 0; i < Math.abs(difference); i++) {
        this.slots.pop();
      }
    } else if (difference > 0) {
      for (let i = 0; i < Math.abs(difference); i++) {
        this.addToSlots(this.size + i, this.step);
      }
    }
    this.size = newSize;
  }

  abstract addToSlots(row: number, col: number);
}
