import {Action, createSelector, Selector, State, StateContext} from '@ngxs/store';
import {TodoService} from '../services/todo.service';
import {TodoStateModel} from '../models/todo-state.model';
import {Todo} from '../actions/todo.actions';
import {tap} from 'rxjs/operators';
import {TodoInterface} from '../interfaces/todo.interface';
import {Observable} from 'rxjs';
import {LiveUpdateService} from '../services/live-update.service';

const STATE_NAME = 'todos';

@State<TodoStateModel>({
  name: STATE_NAME,
  defaults: {
    todoList: [],
    selectedTodo: null
  }
})
export class TodoState {
  constructor(private todoService: TodoService, private liveUpdateService: LiveUpdateService) {
  }

  @Selector()
  static getTodoListSize(prefix: string) {
    return createSelector([TodoState], (state: { string: TodoStateModel }[]) => {
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
  fetchTodoList(ctx: StateContext<TodoStateModel>, action: Todo.FetchAll): Observable<TodoInterface[]> {
    return this.todoService.fetchTodoList(action.room).pipe(
      tap((todoList: TodoInterface[]) => {
        ctx.patchState({todoList});
      })
    );
  }

  @Action(Todo.Add)
  addTodo(ctx: StateContext<TodoStateModel>, action: Todo.Add): Observable<TodoInterface> {
    return this.todoService.addTodo(action.room, action.todo).pipe(
      tap((todo: TodoInterface) => {
        this.addTodoToState(ctx, todo);
        this.liveUpdateService.fireAddedEvent(todo);
      })
    );
  }

  @Action(Todo.AddLiveUpdate)
  addTodoAfterLiveUpdate(ctx: StateContext<TodoStateModel>, action: Todo.AddLiveUpdate) {
    this.addTodoToState(ctx, action.todo);
  }

  private addTodoToState(ctx: StateContext<TodoStateModel>, todo: TodoInterface) {
    const state = ctx.getState();
    const todoList = [...state.todoList, todo];
    ctx.patchState({todoList});
  }

  @Action(Todo.Edit)
  editTodo(ctx: StateContext<TodoStateModel>, action: Todo.Edit): Observable<TodoInterface> {
    return this.todoService.updateTodo(action.todo, action.id).pipe(
      tap((updatedTodo: TodoInterface) => {
        this.editTodoInState(ctx, updatedTodo);
        this.liveUpdateService.fireUpdatedEvent(updatedTodo);
      })
    );
  }

  @Action(Todo.EditLiveUpdate)
  editTodoAfterLiveUpdate(ctx: StateContext<TodoStateModel>, action: Todo.EditLiveUpdate) {
    this.editTodoInState(ctx, action.todo);
  }

  private editTodoInState(ctx: StateContext<TodoStateModel>, updatedTodo: TodoInterface) {
    const state = ctx.getState();
    const todoList = [...state.todoList];
    const todoIndex = todoList.findIndex((todo: TodoInterface) => todo.id === updatedTodo.id);
    todoList[todoIndex] = updatedTodo;
    ctx.patchState({todoList});
  }

  @Action(Todo.Delete)
  deleteTodo(ctx: StateContext<TodoStateModel>, action: Todo.Delete): Observable<number> {
    return this.todoService.deleteTodo(action.id).pipe(
      tap(() => {
        this.deleteTodoFromState(ctx, action.id);
        this.liveUpdateService.fireDeletedEvent(action.id);
      })
    );
  }

  @Action(Todo.DeleteLiveUpdate)
  deleteTodoAfterLiveUpdate(ctx: StateContext<TodoStateModel>, action: Todo.DeleteLiveUpdate) {
    this.deleteTodoFromState(ctx, action.id);
  }

  private deleteTodoFromState(ctx: StateContext<TodoStateModel>, todoId: number) {
    const state = ctx.getState();
    const todoList = state.todoList;
    const filteredTodoList = todoList.filter((todo: TodoInterface) => todo.id !== todoId);
    ctx.patchState({todoList: filteredTodoList});
  }

  @Action(Todo.SetSelectedTodo)
  setSelectedTodo(ctx: StateContext<TodoStateModel>, action: Todo.SetSelectedTodo) {
    ctx.patchState({selectedTodo: action.todo});
  }
}
