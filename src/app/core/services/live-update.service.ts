import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TodoInterface} from '../interfaces/TodoInterface';

@Injectable({
  providedIn: 'root'
})
export class LiveUpdateService {
  private socket: io.Socket;
  private readonly namespace: string;

  constructor() {
    this.namespace = '/todo';
    this.socket = io.connect(`${environment.apiUrl}${this.namespace}`);
  }

  public sendAdded(todo: TodoInterface) {
    this.socket.emit('added', todo);
  }

  public getAdded(): Observable<TodoInterface> {
    return this.getActionEvents<TodoInterface>('added');
  }

  public sendUpdated(todo: TodoInterface) {
    this.socket.emit('updated', todo);
  }

  public getUpdated(): Observable<TodoInterface> {
    return this.getActionEvents<TodoInterface>('updated');
  }

  public sendDeleted(todoId: number) {
    this.socket.emit('deleted', todoId);
  }

  public getDeleted(): Observable<number> {
    return this.getActionEvents<number>('deleted');
  }

  private getActionEvents<T>(action: string): Observable<T> {
    return new Observable<T>((observer) => {
      this.socket.on(action, (message) => {
        observer.next(message);
      });
    });
  }
}
