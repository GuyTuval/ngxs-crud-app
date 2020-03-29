import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TodoInterface} from '../interfaces/todo.interface';

/**
 * NOTE!
 * In any moment, the client is at a single room!
 * Meaning, the client won't be in 2+ rooms.
 */

@Injectable({
  providedIn: 'root'
})
/**
 * A class for sending live updates to the server and for fetching live updates from the server
 */
export class LiveUpdateService {
  private socket: io.Socket;
  private readonly namespace: string;
  private currentRoom: string;

  constructor() {
    this.currentRoom = '';
    this.namespace = '/todo';
    this.socket = io.connect(`${environment.apiUrl}${this.namespace}`);
  }

  /**
   * Sends the server the room to which the client wants to join
   * @param room The room to which the client wants to join
   */
  public fireJoinedRoomEvent(room: string): void {
    this.socket.emit('joined_room', room);
    this.currentRoom = room;
  }

  /**
   * Listens for live updates from the server of joining a room
   * return An observable of the room to which the client joined
   */
  public getJoinedRoomEvent(): Observable<string> {
    return this.getActionEvents<string>('joined_room');
  }

  /**
   * Sends the server a request to leave the current room
   */
  public fireLeftRoomEvent() {
    this.socket.emit('left_room', this.currentRoom);
  }

  /**
   * Listens for live updates from the server of leaving a room
   * return An observable of the room that the client left
   */
  public getLeftRoom(): Observable<string> {
    return this.getActionEvents<string>('left_room');
  }

  /**
   * Sends the server a request to update others that a todo was added
   * @param todo The added todo
   */
  public fireAddedEvent(todo: TodoInterface) {
    this.socket.emit('added', todo);
  }

  /**
   * Listens for live updates from the server of added todos
   * return An observable of the todo that was added
   */
  public getAddedEvent(): Observable<TodoInterface> {
    return this.getActionEvents<TodoInterface>('added');
  }

  /**
   * Sends the server a request to update others that a todo was updated
   * @param todo The updated todo
   */
  public fireUpdatedEvent(todo: TodoInterface) {
    this.socket.emit('updated', todo);
  }

  /**
   * Listens for live updates from the server of an updated todo
   * return An observable of the todo that was updated
   */
  public getUpdatedEvent(): Observable<TodoInterface> {
    return this.getActionEvents<TodoInterface>('updated');
  }

  /**
   * Sends the server a request to update others that a todo was deleted
   * @param todoId The id of the deleted todo
   */
  public fireDeletedEvent(todoId: number) {
    this.socket.emit('deleted', todoId);
  }

  /**
   * Listens for live updates from the server of a deleted todo
   * return An observable of the todo that was deleted
   */
  public getDeletedEvent(): Observable<number> {
    return this.getActionEvents<number>('deleted');
  }

  /**
   * Listens for live updates on the specified events
   * @param event The specified event
   */
  private getActionEvents<T>(event: string): Observable<T> {
    return new Observable<T>((observer) => {
      this.socket.on(event, (message) => {
        observer.next(message);
      });
    });
  }
}
