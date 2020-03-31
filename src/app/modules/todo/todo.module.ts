import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodoRoutingModule} from './todo-routing.module';
import {TodoComponent} from './page/todo/todo.component';
import {TodoFormComponent} from './components/todo-form/todo-form.component';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [TodoComponent, TodoFormComponent, TodoListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TodoRoutingModule,
  ],
})
export class TodoModule {
}
