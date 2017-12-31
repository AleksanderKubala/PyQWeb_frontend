/**
 * Created by Olek on 2017-12-20.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class Urls {

  baseUrl = 'http://localhost:8000/';
  gatesUrl = this.baseUrl + 'gates/';
  circuitUrl = this.baseUrl + 'circuit/';
  registerUrl = this.baseUrl + 'register/';
  computeUrl = this.baseUrl + 'compute/';
  addGateUrl = this.circuitUrl + 'addgate/';
  removeGateUrl = this.circuitUrl + 'remove/';

}
