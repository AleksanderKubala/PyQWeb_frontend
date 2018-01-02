import { SingleResultResponse } from './single_result';

export class ComputeResponse {

  results: SingleResultResponse[];

  constructor (results: SingleResultResponse[]) {
    this.results = results;
  }
}
