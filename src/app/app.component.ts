import {Component, OnInit} from '@angular/core';
import {EventService} from './services/event_service/event.service';
import { Event } from './_config/event_config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  message: string;

  constructor (private eventService: EventService) {  }

  ngOnInit(): void {
    this.eventService.on(Event.REQUEST_FAILED, this.onRequestFailed, this);
    this.eventService.on(Event.ACTION_MADE, this.onActionMade, this);
  }

  onActionMade(): void {
    this.message = undefined;
  }

  onRequestFailed(message: string) {
    this.message = message;
  }
}
