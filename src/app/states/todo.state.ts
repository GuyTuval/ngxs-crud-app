import {Action, Selector, State, StateContext} from '@ngxs/store';
import {TodoInterface} from '../models/TodoInterface';
import {TodoService} from '../todo.service';
import {tap} from 'rxjs/operators';
import {Todo} from '../actions/todo.action';

export class TodoStateModel {
    todos: TodoInterface[];
    selectedTodo: TodoInterface;
}

@State<TodoStateModel>({
    name: 'todos',
    defaults: {
        todos: [],
        selectedTodo: null
    }
})
export class TodoState {

    constructor(private todoService: TodoService) {
    }

    @Selector()
    static getTodoList(state: TodoStateModel) {
        return state.todos;
    }

    @Selector()
    static getSelectedTodo(state: TodoStateModel) {
        return state.selectedTodo;
    }

    @Action(Todo.Get)
    getTodos({patchState}: StateContext<TodoStateModel>) {
        return this.todoService.fetchTodos().pipe(tap((result) => {
            patchState({
                todos: result,
            });
        }));
    }

    @Action(Todo.Add)
    addTodo({getState, patchState}: StateContext<TodoStateModel>, {payload}: Todo.Add) {
        return this.todoService.addTodo(payload).pipe(tap((result) => {
            const state = getState();
            result.id = state.todos[state.todos.length - 1].id + 1;
            patchState({
                todos: [...state.todos, result]
            });
        }));
    }

    @Action(Todo.Update)
    updateTodo({getState, patchState}: StateContext<TodoStateModel>, {payload, id}: Todo.Update) {
        return this.todoService.updateTodo(payload, id).pipe(tap((result) => {
            const state = getState();
            const todoList = [...state.todos];
            const todoIndex = todoList.findIndex(item => item.id === id);
            todoList[todoIndex] = result;
            patchState({
                todos: todoList,
            });
        }));
    }


    @Action(Todo.Delete)
    deleteTodo({getState, patchState}: StateContext<TodoStateModel>, {id}: Todo.Delete) {
        return this.todoService.deleteTodo(id).pipe(tap(() => {
            const state = getState();
            const filteredArray = state.todos.filter(item => item.id !== id);
            patchState({
                todos: filteredArray,
            });
        }));
    }

    @Action(Todo.SetSelected)
    setSelectedTodoId({patchState}: StateContext<TodoStateModel>, {payload}: Todo.SetSelected) {
        patchState({
            selectedTodo: payload
        });
    }
}

