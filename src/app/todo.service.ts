import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodoInterface} from './models/TodoInterface';
import {of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(private http: HttpClient) {
    }

    fetchTodos() {
        return this.http.get<TodoInterface[]>('https://jsonplaceholder.typicode.com/todos');
    }

    deleteTodo(id: number) {
        return of({});
    }

    addTodo(payload: TodoInterface) {
        return of(payload);
    }

    updateTodo(payload: TodoInterface, id: number) {
        return of(payload);
    }
}
