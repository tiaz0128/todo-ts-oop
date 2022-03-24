declare interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
}

declare type SetState = (nextState: Todo[]) => void;

declare type Todo = {
  id: string;
  task: string;
  complete: boolean;
};
