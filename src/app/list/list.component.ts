import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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
  @Input() public selectedRoom: string;
  public subscription: Subscription;

  constructor(private store: Store, private liveUpdateService: LiveUpdateService) {
    this.subscription = new Subscription();
  }

  public leaveRoom() {
    this.liveUpdateService.fireLeftRoomEvent();
  }

  public joinRoom(room: string) {
    this.liveUpdateService.fireJoinedRoomEvent(room);
    this.selectedRoom = room;
  }

  ngOnInit() {
    this.store.dispatch(new Todo.FetchAll());
    this.liveUpdateService.fireJoinedRoomEvent(this.selectedRoom);
    this.subscription.add(this.liveUpdateService.getJoinedRoomEvent().subscribe((responseMessage: string) =>
      console.log(responseMessage)
    ));
    this.subscription.add(this.liveUpdateService.getAddedEvent().subscribe(
      (todo: TodoInterface) => this.store.dispatch(new Todo.AddLiveUpdate(todo))
      )
    );
    this.subscription.add(this.liveUpdateService.getUpdatedEvent().subscribe(
      (todo: TodoInterface) => this.store.dispatch(new Todo.EditLiveUpdate(todo))
      )
    );
    this.subscription.add(this.liveUpdateService.getDeletedEvent().subscribe(
      (todoId: number) => this.store.dispatch(new Todo.DeleteLiveUpdate(todoId))
      )
    );
    this.subscription.add(this.liveUpdateService.getLeftRoom().subscribe((responseMessage: string) =>
      console.log(responseMessage)));
  }

  ngOnDestroy(): void {
    this.liveUpdateService.fireLeftRoomEvent();
    this.subscription.unsubscribe();
  }

  deleteTodo(id: number) {
    this.store.dispatch(new Todo.Delete(id));
  }

  editTodo(todo: TodoInterface) {
    this.store.dispatch(new Todo.SetSelectedTodo(todo));
  }
}
