import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TodoInterface} from '../interfaces/todo.interface';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Room} from '../interfaces/room.interface';
import {AddTodoResponse, FetchTodoListResponse, UpdateTodoResponse} from '../interfaces/backend-responses';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
  }

  fetchTodoList(room: Room): Observable<FetchTodoListResponse> {
    const params = new HttpParams().set('room', room.room);
    return this.http.get<FetchTodoListResponse>(`${environment.apiUrl}/todos`, {params});
  }

  deleteTodo(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.apiUrl}/todos/${id}`);
  }

  addTodo(room: Room, todo: TodoInterface): Observable<AddTodoResponse> {
    const payload = Object.assign(todo, room);
    return this.http.post<AddTodoResponse>(`${environment.apiUrl}/todos`, payload);
  }

  updateTodo(payload: TodoInterface, id: number): Observable<UpdateTodoResponse> {
    return this.http.put<UpdateTodoResponse>(`${environment.apiUrl}/todos/${id}`, payload);
  }
}
