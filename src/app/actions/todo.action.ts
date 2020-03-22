import {TodoInterface} from '../models/TodoInterface';

export namespace Todo {
  export class Add {
    static readonly type = '[TodoInterface] Add';

    constructor(public payload: TodoInterface) {
    }
  }

  export class Get {
    static readonly type = '[TodoInterface] Get';
  }

  export class Update {
    static readonly type = '[TodoInterface] Update';

    constructor(public payload: TodoInterface, public id: number) {
    }
  }

  export class Delete {
    static readonly type = '[TodoInterface] Delete';

    constructor(public id: number) {
    }
  }

  export class SetSelected {
    static readonly type = '[TodoInterface] Set';

    constructor(public payload: TodoInterface) {
    }
  }
}
