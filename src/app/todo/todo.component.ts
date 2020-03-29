import {Component} from '@angular/core';
import {TodoListComponent} from '../todo-list/todo-list.component';
import {TodoFormComponent} from '../todo-form/todo-form.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  constructor() {
  }

  replaceRoom(room: string, listComponent: TodoListComponent, formComponent: TodoFormComponent) {
    listComponent.replaceRoom(room);
    formComponent.replaceRoom(room);
  }
}
