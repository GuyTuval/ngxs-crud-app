import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {TodoState} from '../states/todo.state';
import {Observable, Subscription} from 'rxjs';
import {TodoInterface} from '../models/TodoInterface';
import {Todo} from '../actions/todo.action';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  @Select(TodoState.getSelectedTodo) selectedTodo$: Observable<TodoInterface>;
  todoForm: FormGroup;
  editTodo = false;
  private formSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private store: Store) {
    this.createForm();
  }

  ngOnInit() {
    this.formSubscription.add(
      this.selectedTodo$.subscribe(todo => {
        if (todo) {
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

  createForm() {
    this.todoForm = this.fb.group({
      id: [''],
      userId: ['', Validators.required],
      title: ['', Validators.required]
    });
  }

  onSubmit() {
    let action: Todo.Update | Todo.Add;
    if (this.editTodo) {
      action = new Todo.Update(this.todoForm.value, this.todoForm.value.id);
    } else {
      action = new Todo.Add(this.todoForm.value);
    }
    this.formSubscription.add(
      this.store.dispatch(action).subscribe(() => {
        this.clearForm();
      })
    );
  }

  clearForm() {
    this.todoForm.reset();
    this.store.dispatch(new Todo.SetSelected(null));
  }
}
