import { Injectable } from '@angular/core';
import { Urls } from '../../server-urls';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Circuit } from '../../responses/circuit';
@Injectable()
export class CircuitService {

  constructor(private urls: Urls, private http: HttpClient) { }

  public async getCircuit(): Promise<Circuit> {
    return await this.http.get<Circuit>(this.urls.circuitUrl).toPromise().then();
  }
}
