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
  private currentRoom: string;

  constructor() {
    this.currentRoom = '';
    this.namespace = '/todo';
    this.socket = io.connect(`${environment.apiUrl}${this.namespace}`);
  }

  public fireJoinedRoomEvent(room: string): void {
    this.socket.emit('joined_room', room);
    this.currentRoom = room;
  }

  public getJoinedRoomEvent(): Observable<string> {
    return this.getActionEvents<string>('joined_room');
  }

  public fireLeftRoomEvent() {
    this.socket.emit('left_room', this.currentRoom);
  }

  public getLeftRoom(): Observable<void> {
    return this.getActionEvents('left_room');
  }

  public fireAddedEvent(todo: TodoInterface) {
    this.socket.emit('added', {todo: todo, room: this.currentRoom});
  }

  public getAddedEvent(): Observable<TodoInterface> {
    return this.getActionEvents<TodoInterface>('added');
  }

  public fireUpdatedEvent(todo: TodoInterface) {
    this.socket.emit('updated', {todo: todo, room: this.currentRoom});
  }

  public getUpdatedEvent(): Observable<TodoInterface> {
    return this.getActionEvents<TodoInterface>('updated');
  }

  public fireDeletedEvent(todoId: number) {
    this.socket.emit('deleted', {todoId: todoId, room: this.currentRoom});
  }

  public getDeletedEvent(): Observable<number> {
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
