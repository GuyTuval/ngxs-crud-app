import {Component, OnInit} from '@angular/core';
import {TodoState} from '../states/todo.state';
import {Select, Store} from '@ngxs/store';
import {TodoInterface} from '../models/TodoInterface';
import {Observable} from 'rxjs';
import {Todo} from '../actions/todo.action';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    @Select(TodoState.getTodoList) todos$: Observable<TodoInterface[]>;

    constructor(private store: Store) {
    }

    ngOnInit() {
        this.store.dispatch(new Todo.Get());
    }

    deleteTodo(id: number) {
        this.store.dispatch(new Todo.Delete(id));
    }

    editTodo(payload: TodoInterface) {
        this.store.dispatch(new Todo.SetSelected(payload));
    }

}
