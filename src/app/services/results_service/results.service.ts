import { Injectable } from '@angular/core';
import { Urls } from '../../server-urls';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ComputeRequest } from '../../requests/compute';
import { ComputeResponse } from '../../responses/compute';

@Injectable()
export class ResultsService {

  constructor(private urls: Urls, private http: HttpClient) { }

  public async compute(time: number): Promise<ComputeResponse> {
    return await this.http.post<ComputeResponse>(this.urls.computeUrl, {time} as ComputeRequest)
      .toPromise()
      .then();
  }

}
