import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {TodoInterface} from '../../../../core/interfaces/todo.interface';
import {Observable, Subscription} from 'rxjs';
import {TodoState} from '../../../../core/states/todo.state';
import {Todo} from '../../../../core/actions/todo.actions';
import {TodoLiveUpdateService} from '../../../../core/services/todo-live-update.service';
import {Room} from '../../../../core/interfaces/room.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  @Select(TodoState.getTodoList) todoList$: Observable<TodoInterface[]>;
  @Input() public selectedRoom: string;
  public subscription: Subscription;

  constructor(private store: Store, private liveUpdateService: TodoLiveUpdateService) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.store.dispatch(new Todo.FetchAll({'room': this.selectedRoom} as Room));
    this.liveUpdateService.fireJoinedRoomEvent(this.selectedRoom);
  }

  ngOnDestroy(): void {
    this.liveUpdateService.fireLeftRoomEvent();
    this.subscription.unsubscribe();
  }

  public replaceRoomAndUpdateTodoList(room: string) {
    this.selectedRoom = room;
    this.liveUpdateService.fireLeftRoomEvent();
    this.liveUpdateService.fireJoinedRoomEvent(room);
    this.store.dispatch(new Todo.FetchAll({'room': this.selectedRoom} as Room));
  }

  deleteTodo(id: number) {
    this.store.dispatch(new Todo.Delete(id));
  }

  editTodo(todo: TodoInterface) {
    this.store.dispatch(new Todo.SetSelectedTodo(todo));
  }
}
