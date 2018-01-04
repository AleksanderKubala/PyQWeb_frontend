import { Injectable } from '@angular/core';
import { Urls } from '../../_config/server-urls';
import { HttpClient} from '@angular/common/http';

// responses
import { CircuitResponse } from '../../responses/circuit';
import { RegisterResponse } from '../../responses/register';
import { CircuitChangeResponse } from '../../responses/circuit_change';

// requests
import { RegisterRequest } from '../../requests/register';
import { AddGateRequest } from '../../requests/add_gate';
import { RemoveGateRequest } from '../../requests/remove_gate';
import {EventService} from '../event_service/event.service';
import {AbstractService} from '../abstract/abstract_service';
import {CircuitRequest} from '../../requests/circuit';


@Injectable()
export class CircuitService extends AbstractService {

  constructor (protected urls: Urls, protected http: HttpClient, protected eventService: EventService) { super(urls, http, eventService); }

  public async putReset() {
    return await this.http.put<CircuitResponse>(this.urls.circuitUrl, null)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }

  public async postCircuit(request: CircuitRequest) {
    return await this.http.post<CircuitResponse>(this.urls.circuitUrl, request)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }

  public async getCircuit(): Promise<CircuitResponse> {
    return await this.http.get<CircuitResponse>(this.urls.circuitUrl)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }

  public async postRegisterChanges(size: number, state: number): Promise<RegisterResponse> {
    const request = new RegisterRequest(size, state);
    return await this.http.post<RegisterResponse>(this.urls.registerUrl, request)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }

  public async postAddGate(gate: string, qubits: number[], layer: number, controls: number[]): Promise<CircuitChangeResponse> {
    const request = new AddGateRequest(gate, qubits, layer, controls);
    return await this.http.post<CircuitChangeResponse>(this.urls.modifyCircuitUrl, request)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }

  public async putRemoveGate(qubits: number[], layer: number): Promise<CircuitChangeResponse> {
    const request = new RemoveGateRequest(layer, qubits);
    return await this.http.put<CircuitChangeResponse>(this.urls.modifyCircuitUrl, request)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }


}
