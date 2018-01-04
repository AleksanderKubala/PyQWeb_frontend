import { Injectable } from '@angular/core';
import { GateSetResponse } from '../../responses/gateset';
import 'rxjs/add/operator/map';
import { HttpClient} from '@angular/common/http';
import { Urls } from '../../_config/server-urls';
import {EventService} from '../event_service/event.service';
import {AbstractService} from '../abstract/abstract_service';

@Injectable()
export class GateService extends AbstractService {


  constructor(protected http: HttpClient, protected urls: Urls, protected eventService: EventService) { super( urls, http, eventService); }

  public async getGates(): Promise<GateSetResponse> {
    return await this.http.get<GateSetResponse>(this.urls.gatesUrl)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }

}
