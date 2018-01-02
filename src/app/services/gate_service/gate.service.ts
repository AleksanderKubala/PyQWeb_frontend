import { Injectable } from '@angular/core';
import { GateSetResponse } from '../../responses/gateset';
import { GateInfoResponse } from '../../responses/gateinfo';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urls } from '../../server-urls';

@Injectable()
export class GateService {

  private selectedGate: string;

  constructor(private http: HttpClient, private urls: Urls) { }

  public async getGates(): Promise<GateSetResponse> {
    return await this.http.get<GateSetResponse>(this.urls.gatesUrl)
      .toPromise()
      .then();
  }

  setSelectedGate(gate: string): void {
    this.selectedGate = gate;
  }

  getSelectedGate(): string {
    return this.selectedGate;
  }

  /*
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Promise<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  */
}
