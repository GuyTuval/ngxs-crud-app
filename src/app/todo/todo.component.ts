import {Component} from '@angular/core';
import {ListComponent} from '../list/list.component';
import {FormComponent} from '../form/form.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  constructor() {
  }

  replaceRoom(room: string, listComponent: ListComponent, formComponent: FormComponent) {
    listComponent.replaceRoom(room);
    formComponent.replaceRoom(room);
  }
}
