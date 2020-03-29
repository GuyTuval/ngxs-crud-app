import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TodoInterface} from '../interfaces/todo.interface';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(private http: HttpClient) {
    }

    fetchTodoList(): Observable<TodoInterface[]> {
        return this.http.get<TodoInterface[]>(`${environment.apiUrl}/todos`);
    }

    deleteTodo(id: number): Observable<number> {
        return this.http.delete<number>(`${environment.apiUrl}/todos/${id}`);
    }

    addTodo(payload: TodoInterface): Observable<TodoInterface> {
        return this.http.post<TodoInterface>(`${environment.apiUrl}/todos`, payload);
    }

    updateTodo(payload: TodoInterface, id: number): Observable<TodoInterface> {
         return this.http.put<TodoInterface>(`${environment.apiUrl}/todos/${id}`, payload);
    }
}
