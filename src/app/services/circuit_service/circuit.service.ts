import { Injectable } from '@angular/core';
import { Urls } from '../../server-urls';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// responses
import { Circuit } from '../../responses/circuit';
import { RegisterResponse } from '../../responses/register';

// requests
import { RegisterRequest } from '../../requests/register';


@Injectable()
export class CircuitService {

  constructor(private urls: Urls, private http: HttpClient) { }

  public async getCircuit(): Promise<Circuit> {
    return await this.http.get<Circuit>(this.urls.circuitUrl)
      .toPromise()
      .then();
  }

  public async postRegisterChanges(size: number, state: number): Promise<RegisterResponse> {
    const request = new RegisterRequest(size, state);
    return await this.http.post<RegisterResponse>(this.urls.registerUrl, request)
      .toPromise()
      .then();
  }
}
