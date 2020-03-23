import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {TodoInterface} from '../core/interfaces/TodoInterface';
import {Observable} from 'rxjs';
import {TodoState} from '../core/states/todo.state';
import {Todo} from '../core/actions/todo.actions';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    @Select(TodoState.getTodoList) todoList$: Observable<TodoInterface[]>;

    constructor(private store: Store) {
    }

    ngOnInit() {
      this.store.dispatch(new Todo.FetchAll());
    }

    deleteTodo(id: number) {
      this.store.dispatch(new Todo.Delete(id));
    }

    editTodo(todo: TodoInterface) {
      this.store.dispatch(new Todo.SetSelectedTodo(todo));
    }

}
