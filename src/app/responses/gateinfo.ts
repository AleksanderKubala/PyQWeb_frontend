
export class GateInfoResponse {

  signature: string;
  multi: boolean;
  modifier: boolean;

  constructor (signature: string, multi: boolean, modifier: boolean = false) {
    this.signature = signature;
    this.multi = multi;
    this.modifier = modifier;
  }

}
