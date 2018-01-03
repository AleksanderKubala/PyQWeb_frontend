import { Component, OnInit } from '@angular/core';
import { GateService } from '../../services/gate_service/gate.service';
import {CONTROL, MODIFIERS, MULTIGATES} from '../../_config/img_config';
import {EventService} from '../../services/event_service/event.service';
import {Event} from '../../_config/event_config';


@Component({
  selector: 'app-gates',
  templateUrl: './gates.component.html',
  styleUrls: ['./gates.component.css']
})

export class GatesComponent implements OnInit {

  gates: string[];
  modifiers: string[];

  constructor(private gateService: GateService, private eventService: EventService) { }

  ngOnInit() {
    this.modifiers = [CONTROL];
    this.gates = [];
    this.gateService.getGates().then(response => {
      const gateinfo = response.gates;
      for (let i = 0; i < gateinfo.length; i++) {
        if (gateinfo[i].modifier === true) {
          MODIFIERS.push(gateinfo[i].signature);
          this.modifiers.push(gateinfo[i].signature);
        } else {
          this.gates.push(gateinfo[i].signature);
        }
        if (gateinfo[i].multi === true) {
          MULTIGATES.push(gateinfo[i].signature);
        }
      }
    });
  }

  selectGate(gate: string): void {
    this.eventService.emit(Event.GATE_SELECTED, gate);
  }
}
