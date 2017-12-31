import { Injectable } from '@angular/core';
import { GateSet } from '../../responses/gateset';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urls } from '../../server-urls';

@Injectable()
export class GateService {

  constructor(private http: HttpClient, private urls: Urls) { }

  private selectedGate: string;

  public async getGates(): Promise<string[]> {
    return await this.http.get<GateSet>(this.urls.gatesUrl)
      .toPromise()
      .then(response => response.signatures);
  }

  public getSelectedGate(): string {
    return this.selectedGate;
  }

  public setSelectedGate(gate: string): void {
    this.selectedGate = gate;
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
