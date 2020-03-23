import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodoInterface} from '../interfaces/TodoInterface';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(private http: HttpClient) {
    }

    fetchTodoList(): Observable<TodoInterface[]> {
        return this.http.get<TodoInterface[]>('https://jsonplaceholder.typicode.com/todos');
    }

    deleteTodo(id: number): Observable<number> {
        return of(id);
    }

    addTodo(payload: TodoInterface): Observable<TodoInterface> {
        return this.http.post<TodoInterface>('https://jsonplaceholder.typicode.com/todos', payload);
    }

    updateTodo(payload: TodoInterface, id: number): Observable<TodoInterface> {
        return of(payload);
    }
}
