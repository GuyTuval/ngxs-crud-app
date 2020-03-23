import {TodoInterface} from '../interfaces/TodoInterface';

export namespace Todo {
  export class FetchAll {
    static readonly type = '[Todo] Fetch All';
  }

  export class Add {
    static readonly type = '[Todo] Add Todo';

    public constructor(public todo: TodoInterface) {
    }
  }

  export class Delete {
    static readonly type = '[Todo] Get Todo';

    public constructor(public id: number) {
    }
  }

  export class Edit {
    static readonly type = '[Todo] Edit Todo';

    public constructor(public id: number, public todo: TodoInterface) {
    }
  }

  export class SetSelectedTodo {
    static readonly type = '[Todo] Set Selected Todo';

    public constructor(public todo: TodoInterface) {
    }
  }
}
