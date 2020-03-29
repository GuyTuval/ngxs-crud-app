import {TodoInterface} from '../interfaces/todo.interface';

export class TodoStateModel {
  todoList: TodoInterface[];
  selectedTodo: TodoInterface;
}
