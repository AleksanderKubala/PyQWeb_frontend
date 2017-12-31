import { CircuitChange } from './circuit_change';

export class RegisterResponse {

  changes: CircuitChange;
  size: number;
  state: number;

  constructor (changes: CircuitChange, size: number, state: number) {
    this.changes = changes;
    this.state = state;
    this.size = size;
  }
}
