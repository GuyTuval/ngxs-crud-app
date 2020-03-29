import {TodoInterface} from '../interfaces/todo.interface';
import {Room} from '../interfaces/room.interface';

export namespace Todo {
  export class FetchAll {
    static readonly type = '[Todo] Fetch All';

    public constructor(public room: Room) {
    }
  }

  export class Add {
    static readonly type = '[Todo] Add Todo';

    public constructor(public room: Room, public todo: TodoInterface) {
    }
  }

  export class AddLiveUpdate {
    static readonly type = '[Todo] Live Update For Added Todo';

    public constructor(public todo: TodoInterface) {
    }
  }

  export class Delete {
    static readonly type = '[Todo] Deleted Todo';

    public constructor(public id: number) {
    }
  }

  export class DeleteLiveUpdate {
    static readonly type = '[Todo] Live Update For Deleted Todo';

    public constructor(public id: number) {
    }
  }

  export class Edit {
    static readonly type = '[Todo] Edit Todo';

    public constructor(public id: number, public todo: TodoInterface) {
    }
  }

  export class EditLiveUpdate {
    static readonly type = '[Todo]  Live Update For Edited Todo';

    public constructor(public todo: TodoInterface) {
    }
  }

  export class SetSelectedTodo {
    static readonly type = '[Todo] Set Selected Todo';

    public constructor(public todo: TodoInterface) {
    }
  }
}
