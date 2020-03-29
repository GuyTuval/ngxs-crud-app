import {TodoInterface} from '../interfaces/todo.interface';

/**
 * A model representing the TodoState used in the ngxs
 */
export class TodoStateModel {
  todoList: TodoInterface[];
  selectedTodo: TodoInterface;
}
