import { Injectable } from '@angular/core';
import { GateSetResponse } from '../../responses/gateset';
import 'rxjs/add/operator/map';
import { HttpClient} from '@angular/common/http';
import { Urls } from '../../_config/server-urls';

@Injectable()
export class GateService {


  constructor(private http: HttpClient, private urls: Urls) { }

  public async getGates(): Promise<GateSetResponse> {
    return await this.http.get<GateSetResponse>(this.urls.gatesUrl)
      .toPromise()
      .then();
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
