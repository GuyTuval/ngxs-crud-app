import {Component} from '@angular/core';
import {TodoListComponent} from '../../components/todo-list/todo-list.component';
import {TodoFormComponent} from '../../components/todo-form/todo-form.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  constructor() {
  }

  /**
   * Updates the list component and the form component that the room was replaced
   * @param room The new room
   * @param listComponent The list component
   * @param formComponent The form component
   */
  replaceRoom(room: string, listComponent: TodoListComponent, formComponent: TodoFormComponent) {
    listComponent.replaceRoomAndUpdateTodoList(room);
    formComponent.replaceRoom(room);
  }
}
