/**
 * Created by Olek on 2017-12-20.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class Urls {

  baseUrl = 'http://localhost:8000/';
  gatesUrl = this.baseUrl + 'gates/';
  circuitUrl = this.baseUrl + 'circuit/';
  addGateUrl = this.circuitUrl + 'addgate/';
  computeUrl = this.circuitUrl + 'compute/';
  removeGateUrl = this.circuitUrl + 'remove/';
  sizeUrl = this.circuitUrl + 'size/';
  regStateUrl = this.circuitUrl + 'state/';

}
