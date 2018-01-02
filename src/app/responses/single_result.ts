
export class SingleResultResponse {

  amplitude: string;
  bits: string;
  probability: string;

  constructor (amplitude: string, bits: string, probability: string) {
    this.amplitude = amplitude;
    this.bits = bits;
    this.probability = probability;
  }
}
