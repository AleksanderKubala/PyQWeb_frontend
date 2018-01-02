import {Qubit} from './qubit';
import {Layer} from './layer';

export class Register extends Layer<Qubit> {

  addToSlots(row: number, col: number) {
    const slot = new Qubit(row, col);
    this.slots.push(slot);
  }
}
