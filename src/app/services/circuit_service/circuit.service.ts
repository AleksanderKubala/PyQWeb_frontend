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


@Injectable()
export class CircuitService {

  constructor(private urls: Urls, private http: HttpClient) { }

  public async getCircuit(): Promise<CircuitResponse> {
    return await this.http.get<CircuitResponse>(this.urls.circuitUrl)
      .toPromise()
      .then();
  }

  public async postRegisterChanges(size: number, state: number): Promise<RegisterResponse> {
    const request = new RegisterRequest(size, state);
    return await this.http.post<RegisterResponse>(this.urls.registerUrl, request)
      .toPromise()
      .then();
  }

  public async postAddGate(gate: string, qubits: number[], layer: number, controls: number[]): Promise<CircuitChangeResponse> {
    const request = new AddGateRequest(gate, qubits, layer, controls);
    return await this.http.post<CircuitChangeResponse>(this.urls.modifyCircuitUrl, request)
      .toPromise()
      .then();
  }

  public async postRemoveGate(qubits: number[], layer: number): Promise<CircuitChangeResponse> {
    const request = new RemoveGateRequest(layer, qubits);
    return await this.http.put<CircuitChangeResponse>(this.urls.modifyCircuitUrl, request)
      .toPromise()
      .then();
  }
}
