import {Injectable} from '@angular/core';
import {EventEmitter} from 'events';
import { Event } from '../../_config/event_config';
import {isNullOrUndefined} from 'util';

@Injectable()
export class EventService {

  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  public on(event: Event, listener: Function, context = null) {
    if (isNullOrUndefined(context)) {
      this.emitter.on(event.toString(), listener);
    } else {
      this.emitter.on(event.toString(), listener.bind(context));
    }
  }


  public emit(event: Event, ...args: any[]) {
    this.emitter.emit(event.toString(), args);
  }

}
