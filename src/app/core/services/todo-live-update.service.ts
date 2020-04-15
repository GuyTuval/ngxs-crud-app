import {Injectable} from '@angular/core';
import io from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {TodoInterface} from '../interfaces/todo.interface';
import {TodoEvents} from './todo-events.enum';
import {Todo} from '../actions/todo.actions';
import {Store} from '@ngxs/store';

/**
 * NOTE!
 * 1) In any moment, the client is at a single room!
 *    Meaning, the client won't be in 2+ rooms.
 * 2) The event sent from the server has the same name as the event sent to the server.
 *    For example, upon update a TodoEvents.UPDATED event is sent to the server.
 *    The server sends a TodoEvents.UPDATED to all the relevant connections.
 */

@Injectable({
  providedIn: 'root'
})
/**
 * A class for sending live updates to the server and for fetching live updates from the server
 */
export class TodoLiveUpdateService {
  private socket: io.Socket;
  private readonly namespace: string;
  private currentRoom: string;

  constructor(private store: Store) {
    this.currentRoom = '';
    this.namespace = 'todo';
    this.socket = io.connect(`${environment.apiUrl}/${this.namespace}`);

    // Room events
    this.socket.on(TodoEvents.JOINED_ROOM, (responseMessage: string) => console.log(responseMessage));
    this.socket.on(TodoEvents.LEFT_ROOM, (responseMessage: string) => console.log(responseMessage));

    // Todos modifications events
    this.socket.on(TodoEvents.ADDED, (todo: TodoInterface) => this.store.dispatch(new Todo.AddLiveUpdate(todo)));
    this.socket.on(TodoEvents.UPDATED, (todo: TodoInterface) => this.store.dispatch(new Todo.EditLiveUpdate(todo)));
    this.socket.on(TodoEvents.DELETED, (todoId: number) => this.store.dispatch(new Todo.DeleteLiveUpdate(todoId)));
  }

  /**
   * Sends the server the room to which the client wants to join
   * @param room The room to which the client wants to join
   */
  public fireJoinedRoomEvent(room: string): void {
    this.socket.emit(TodoEvents.JOINED_ROOM, room);
    this.currentRoom = room;
  }

  /**
   * Sends the server a request to leave the current room
   */
  public fireLeftRoomEvent() {
    this.socket.emit(TodoEvents.LEFT_ROOM, this.currentRoom);
  }

  /**
   * Sends the server a request to update others that a todo was added
   * @param todo The added todo
   */
  public fireAddedEvent(todo: TodoInterface) {
    this.socket.emit(TodoEvents.ADDED, {todo, room: this.currentRoom});
  }

  /**
   * Sends the server a request to update others that a todo was updated
   * @param todo The updated todo
   */
  public fireUpdatedEvent(todo: TodoInterface) {
    this.socket.emit(TodoEvents.UPDATED, {todo, room: this.currentRoom});
  }

  /**
   * Sends the server a request to update others that a todo was deleted
   * @param todoId The id of the deleted todo
   */
  public fireDeletedEvent(todoId: number) {
    this.socket.emit(TodoEvents.DELETED, {todo_id: todoId, room: this.currentRoom});
  }
}
