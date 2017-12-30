

export class Layer<T> {

  slots: T[];
  size: number;
  step: number;

  constructor(size: number, step: number = null) {
    this.size = size;
    this.step = step;
    this.slots = new Array<T>(this.size);
  }
}
