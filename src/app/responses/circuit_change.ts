import { Gate } from './gate';
import { Removal } from './removal';

export class CircuitChange {
  added: Gate[];
  removed: Removal[];

  constructor(added: Gate[], removed: Removal[]) {
    this.added = added;
    this.removed = removed;
  }
}
