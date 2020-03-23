import {Action, createSelector, Selector, State, StateContext} from '@ngxs/store';
import {TodoService} from '../services/todo.service';
import {TodoStateModel} from '../models/todo-state.model';
import {Todo} from '../actions/todo.actions';
import {tap} from 'rxjs/operators';
import {TodoInterface} from '../interfaces/TodoInterface';
import {Observable} from 'rxjs';

const STATE_NAME = 'todos';

@State<TodoStateModel>({
  name: STATE_NAME,
  defaults: {
    todoList: [],
    selectedTodo: null
  }
})
export class TodoState {
  constructor(private todoService: TodoService) {
  }

  @Selector()
  static getTodoListSize(prefix: string) {
    return createSelector([TodoState], (state: {string: TodoStateModel}[]) => {
      return state[STATE_NAME].todoList.filter(s => s.title.startsWith(prefix)).length;
    });
  }

  @Selector()
  static getTodoList(state: TodoStateModel) {
    return state.todoList;
  }

  @Selector()
  static getSelectedTodo(state: TodoStateModel): TodoInterface {
    return state.selectedTodo;
  }

  @Action(Todo.FetchAll)
  fetchTodoList(ctx: StateContext<TodoStateModel>): Observable<TodoInterface[]> {
    return this.todoService.fetchTodoList().pipe(
      tap((todoList: TodoInterface[]) => {
        ctx.patchState({todoList});
      })
    );
  }

  @Action(Todo.Add)
  addTodo(ctx: StateContext<TodoStateModel>, action: Todo.Add): Observable<TodoInterface> {
    return this.todoService.addTodo(action.todo).pipe(
      tap((todo: TodoInterface) => {
        const state = ctx.getState();
        const todoList = [...state.todoList, todo];
        ctx.patchState({todoList});
      })
    );
  }

  @Action(Todo.Edit)
  editTodo(ctx: StateContext<TodoStateModel>, action: Todo.Edit): Observable<TodoInterface> {
    return this.todoService.updateTodo(action.todo, action.id).pipe(
      tap((updatedTodo: TodoInterface) => {
        const state = ctx.getState();
        const todoList = [...state.todoList];
        const todoIndex = todoList.findIndex((todo: TodoInterface) => todo.id === action.id);
        todoList[todoIndex] = updatedTodo;
        ctx.patchState({todoList});
      })
    );
  }

  @Action(Todo.Delete)
  deleteTodo(ctx: StateContext<TodoStateModel>, action: Todo.Delete): Observable<number> {
    return this.todoService.deleteTodo(action.id).pipe(
      tap(() => {
        const state = ctx.getState();
        const todoList = state.todoList;
        const filteredTodoList = todoList.filter((todo: TodoInterface) => todo.id !== action.id);
        ctx.patchState({todoList: filteredTodoList});
      })
    );
  }

  @Action(Todo.SetSelectedTodo)
  setSelectedTodo(ctx: StateContext<TodoStateModel>, action: Todo.SetSelectedTodo) {
    ctx.patchState({selectedTodo: action.todo});
  }
}
