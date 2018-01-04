import { Injectable } from '@angular/core';
import { Urls } from '../../_config/server-urls';
import { HttpClient} from '@angular/common/http';

import { ComputeRequest } from '../../requests/compute';
import { ComputeResponse } from '../../responses/compute';
import {EventService} from '../event_service/event.service';
import {AbstractService} from '../abstract/abstract_service';

@Injectable()
export class ResultsService extends AbstractService {

  constructor(protected urls: Urls, protected http: HttpClient, protected eventService: EventService) { super(urls, http, eventService); }

  public async compute(time: number): Promise<ComputeResponse> {
    return await this.http.post<ComputeResponse>(this.urls.computeUrl, {time} as ComputeRequest)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }

}
