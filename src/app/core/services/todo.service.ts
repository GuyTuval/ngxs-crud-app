import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TodoInterface} from '../interfaces/todo.interface';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Room} from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
  }

  fetchTodoList(room: Room): Observable<TodoInterface[]> {
    const params = new HttpParams().set('room', room.room);
    return this.http.get<TodoInterface[]>(`${environment.apiUrl}/todos`, {params});
  }

  deleteTodo(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.apiUrl}/todos/${id}`);
  }

  addTodo(room: Room, todo: TodoInterface): Observable<TodoInterface> {
    const payload = Object.assign(todo, room);
    return this.http.post<TodoInterface>(`${environment.apiUrl}/todos`, payload);
  }

  updateTodo(payload: TodoInterface, id: number): Observable<TodoInterface> {
    return this.http.put<TodoInterface>(`${environment.apiUrl}/todos/${id}`, payload);
  }
}
