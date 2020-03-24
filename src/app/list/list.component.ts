import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {TodoInterface} from '../core/interfaces/TodoInterface';
import {Observable, Subscription} from 'rxjs';
import {TodoState} from '../core/states/todo.state';
import {Todo} from '../core/actions/todo.actions';
import {LiveUpdateService} from '../core/services/live-update.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  @Select(TodoState.getTodoList) todoList$: Observable<TodoInterface[]>;
  public subscription: Subscription;

  constructor(private store: Store, private liveUpdateService: LiveUpdateService) {
  }

  ngOnInit() {
    this.store.dispatch(new Todo.FetchAll());
    this.subscription = this.liveUpdateService.getDeleted().subscribe(
      () => this.store.dispatch(new Todo.FetchAll())
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteTodo(id: number) {
    this.store.dispatch(new Todo.Delete(id));
  }

  editTodo(todo: TodoInterface) {
    this.store.dispatch(new Todo.SetSelectedTodo(todo));
  }

}
