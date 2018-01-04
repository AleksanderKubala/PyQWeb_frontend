import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event_service/event.service';
import {CircuitService} from '../../services/circuit_service/circuit.service';
import {saveAs} from 'file-saver';
import {CircuitRequest} from '../../requests/circuit';
import {JsonConvert} from 'json2typescript';
import {Event} from '../../_config/event_config';
import { ACCEPTED_EXT, EX_FILENAME, FILE_EX_TYPE, FILE_IM_TYPE } from '../../_config/im-ex_config';

@Component({
  selector: 'app-im-ex',
  templateUrl: './im-ex.component.html',
  styleUrls: ['./im-ex.component.css']
})
export class ImExComponent implements OnInit {

  acceptedExtension: string;

  constructor(private eventService: EventService, private circuitService: CircuitService) { }

  ngOnInit() {
    this.acceptedExtension = ACCEPTED_EXT;
  }

  readCircuit(event) {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0], FILE_IM_TYPE);
    reader.onloadend = this.loaded.bind(this);
  }

  saveCircuit() {
    this.circuitService.getCircuit().then(response => {
      const json = JSON.stringify(response);
      const file = new File([json], EX_FILENAME + ACCEPTED_EXT, {type: FILE_EX_TYPE});
      saveAs(file);
    });
  }

  loaded(event) {
    const content: string = event.target.result;
    const jsonObject = JSON.parse(content);
    const converter = new JsonConvert();
    let request: CircuitRequest;
    try {
      request = converter.deserialize(jsonObject, CircuitRequest);
    } catch (e) {
      console.log((<Error>e));
      return;
    }
    this.eventService.emit(Event.IMPORT_REQUEST, request);
  }



}
