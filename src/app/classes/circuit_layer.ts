import {Slot} from './slot';
import {Layer} from './layer';

export class CircuitLayer extends Layer<Slot> {

  addToSlots(row: number, col: number) {
    const slot = new Slot(row, col);
    this.slots.push(slot);
  }

}
