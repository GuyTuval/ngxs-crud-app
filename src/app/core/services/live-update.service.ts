import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LiveUpdateService {
  private socket;

  constructor() {
    this.socket = io(environment.apiUrl);
  }

  public getDeleted = () => {
    return new Observable((observer) => {
      // this.socket.nsp = '/todo';
      this.socket.on('changed', (message) => {
        observer.next(message);
      });
    });
  }
}
