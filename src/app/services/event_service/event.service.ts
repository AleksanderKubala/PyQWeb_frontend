import {Injectable} from '@angular/core';
import {EventEmitter} from 'events';
import { Event } from '../../_config/event_config';

@Injectable()
export class EventService {

  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  public on(event: Event, listener: Function) {
    this.emitter.on(event.toString(), listener);
  }

  public emit(event: Event, ...args: any[]) {
    this.emitter.emit(event.toString(), args);
  }

}
