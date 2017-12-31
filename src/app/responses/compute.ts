import { SingleResult } from './single_result';

export class ComputeResponse {

  results: SingleResult[];

  constructor (results: SingleResult[]) {
    this.results = results;
  }
}
