import {Component} from '@angular/core';
import {ListComponent} from '../list/list.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  constructor() { }

  updateList(listComponent: ListComponent, room: string) {
    listComponent.leaveRoom();
    listComponent.joinRoom(room);
  }
}
