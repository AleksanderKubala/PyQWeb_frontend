import { Injectable } from '@angular/core';
import { Urls } from '../../server-urls';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  RegisterChange } from '../../responses/register_change';
@Injectable()
export class CircuitService {

  constructor(private urls: Urls, private http: HttpClient) { }

  public async getRegisterInfo(): Promise<RegisterChange> {
    const promise = await this.http.get<RegisterChange>(this.urls.sizeUrl).toPromise().then();
    return promise;
  }
}
