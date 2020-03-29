import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {TodoInterface} from '../core/interfaces/todo.interface';
import {Select, Store} from '@ngxs/store';
import {TodoState} from '../core/states/todo.state';
import {Todo} from '../core/actions/todo.actions';
import {Room} from '../core/interfaces/room.interface';

const prefix = 'd';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  public prefix = prefix;
  @Input() public selectedRoom: string;
  @Select(TodoState.getSelectedTodo) selectedTodo$: Observable<TodoInterface>;
  @Select(TodoState.getTodoList) todoList$: Observable<TodoInterface[]>;
  @Select(TodoState.getTodoListSize(prefix)) prefixTodoListSize$: Observable<number>;
  todoForm: FormGroup;
  editTodo = false;
  private formSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private store: Store) {
    this.createForm();
  }

  ngOnInit() {
    this.formSubscription.add(
      this.selectedTodo$.subscribe(todo => {
        if (todo !== null) {
          this.todoForm.patchValue(todo);
          this.editTodo = true;
        } else {
          this.editTodo = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  public replaceRoom(room: string) {
    this.selectedRoom = room;
  }

  createForm() {
    this.todoForm = this.fb.group({
      id: [''],
      userId: ['', Validators.required],
      title: ['', Validators.required]
    });
  }

  onSubmit() {
    let action: Todo.Edit | Todo.Add;
    if (this.editTodo) {
      action = new Todo.Edit(+this.todoForm.value.id, this.todoForm.value);
    } else {
      action = new Todo.Add({'room': this.selectedRoom} as Room, this.todoForm.value);
    }
    this.store.dispatch(action);
    this.clearForm();
  }

  clearForm() {
    this.todoForm.reset();
    this.store.dispatch(new Todo.SetSelectedTodo(null));
  }
}
