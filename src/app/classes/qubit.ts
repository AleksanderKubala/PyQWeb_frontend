
import { CircuitElement } from './circuit_element';

export class Qubit extends CircuitElement {

  value: number;

  constructor(row: number, col: number, value: number) {
    super(row, col, value.toString());
    this.value = value;
  }

  public setValue(value: number): void {
    this.value = value;
  }

  public changeValue(): void {
    this.value = 1 - this.value;
  }

  public updateName(): void {
    this.name = this.value.toString();
    this.updateImage();
  }

}
