import { CircuitChangeResponse } from './circuit_change';

export class RegisterResponse {

  changes: CircuitChangeResponse;
  size: number;
  state: number;

  constructor (changes: CircuitChangeResponse, size: number, state: number) {
    this.changes = changes;
    this.state = state;
    this.size = size;
  }
}
