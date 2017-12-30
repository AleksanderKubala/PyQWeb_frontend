
import { CircuitElement } from './circuit_element';

export class Qubit extends CircuitElement {

  value: number;

  constructor(value: number) {
    super(value.toString());
    this.value = value;
  }

  public setValue(value: number): void {
    this.value = value;
    this.name = this.value.toString();
    this.updateImage();
  }

  public changeValue(): void {
    this.value = 1 - this.value;
    this.name = this.value.toString();
    this.updateImage();
  }
}
