
import {EventService} from '../event_service/event.service';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../../_config/server-urls';
import { Event } from '../../_config/event_config';

export abstract class AbstractService {

  constructor (protected urls: Urls, protected http: HttpClient, protected eventService: EventService) {  }

  handleError<T>(error: Response) {
    this.eventService.emit(Event.REQUEST_FAILED, this.getErrorMessage(error));
    return Promise.reject(new Error(error.statusText));
  }

  getErrorMessage<T>(error: Response) {
    let message: string;
    const opening = 'An error occurred!';

    if (error.status === 400) {
      message = 'Invalid/malformed request was made.';
    }
    if (error.status === 404) {
      message = 'Requested resource/page was not found.';
    }
    if (error.status === 418) {
      message = '... Stop being a teapot...';
    }

    if (error.status === 500) {
      message = 'Unexpected error from a server. My bad...';

      return opening + ' Status: ' + error.status + ' ' + error.statusText + '. ' + message;
    }
  }

}
