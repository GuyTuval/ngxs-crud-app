import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {TodoInterface} from '../core/interfaces/todo.interface';
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

  public replaceRoom(room: string) {
    this.liveUpdateService.fireLeftRoomEvent();
    this.liveUpdateService.fireJoinedRoomEvent(room);
    this.selectedRoom = room;
  }

  deleteTodo(id: number) {
    this.store.dispatch(new Todo.Delete(id));
  }

  editTodo(todo: TodoInterface) {
    this.store.dispatch(new Todo.SetSelectedTodo(todo));
  }
}
