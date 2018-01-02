import { CircuitElement } from './circuit_element';
import { EMPTY } from '../img_config';


export class Slot extends CircuitElement {

  frozen: boolean;
  links: Slot[];

  constructor (row: number, col: number, name: string = EMPTY) {
    super(row, col, name);
    this.frozen = false;
    this.links = [];
  }

  public freeze() {
    this.frozen = true;
  }

  public unfreeze() {
    this.frozen = false;
    this.deselect();
  }

  public deselect() {
    if (this.frozen === false) {
      super.deselect();
    }
  }

  public clear() {
    this.directNone();
    this.setName(EMPTY);
  }

}
