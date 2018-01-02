import { RemoveGateResponse } from './remove_gate';
import { LayerResponse } from './layer';

export class CircuitChangeResponse {
  added: LayerResponse[];
  removed: RemoveGateResponse[];

  constructor(added: LayerResponse[], removed: RemoveGateResponse[]) {
    this.added = added;
    this.removed = removed;
  }
}
