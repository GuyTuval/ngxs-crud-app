import {TodoInterface} from './todo.interface';

export interface BasicResponse {
  message: string;
  status: string;
}

export interface AddTodoResponse extends BasicResponse {
  todo?: TodoInterface;
}

export interface UpdateTodoResponse extends BasicResponse {
  todo?: TodoInterface;
}

export interface FetchTodoListResponse extends BasicResponse {
  todoList: TodoInterface[];
}
